import "@stdlib/deploy";

struct Order {
  client: Address;
  master: Address;
  amount: Int as coins;
  clientConfirmed: Bool;
  masterConfirmed: Bool;
  clientSaidAbsent: Bool;
  masterSaidAbsent: Bool;
  finalized: Bool;
}

message CreateOrder {
  orderId: Int as uint32; // generated on offchain (backend)
  master: Address;
  amount: Int as uint32;
}

message Confirm {
  orderId: Int as uint32;
  wasPresent: Bool;
}

contract BeautyEscrowV1 with Deployable {
  platform_address: Address;
  commission_percent: Int as uint8;

  orders: map<Int as uint32, Order>;

  init(platform: Address, commission: Int as uint8) {
    self.platform_address = platform;
    self.commission_percent = commission;
    self.orders = emptyMap();
  }

  // The client creates an order and sends the amount of TON
  receive(msg: CreateOrder) {
    require(msg.amount < context().value, "Payment is less than price of service");

    let orderId = msg.orderId;
    require(self.orders.get(orderId) == null, "Order with this ID already exists");

    self.orders.set(orderId, Order{
      client: sender(),
      master: msg.master,
      amount: msg.amount,
      clientConfirmed: false,
      masterConfirmed: false,
      clientSaidAbsent: false,
      masterSaidAbsent: false,
      finalized: false
    });
  }

  // Confirmation of the visit or absence
  receive(msg: Confirm) {
    let orderId = msg.orderId;
    require(self.orders.get(orderId) != null, "There is no order with this ID");

    let o = self.orders.get(orderId)!!;
    require(!o.finalized, "Already finalized");

    if sender() == o.client {
      o.clientConfirmed = true;
      o.clientSaidAbsent = !msg.wasPresent;
    } else if sender() == o.master {
      o.masterConfirmed = true;
      o.masterSaidAbsent = !msg.wasPresent;
    } else {
      return;
    }

    self.orders.set(orderId, o);

    // Verification of completion condition: master and client have given their answers
    if (!o.clientConfirmed || !o.masterConfirmed || o.finalized) {
      self.reply("The answer is accepted. We are waiting for another participant".asComment());
      return;
    }

    let updated = o;
    updated.finalized = true;
    self.orders.set(orderId, updated);

    let amt = updated.amount;
    let cp = self.commission_percent;
    let commission = amt * cp / 100;

    if (!updated.clientSaidAbsent && !updated.masterSaidAbsent) {
      // Successful completion — master + commission
      let payout = amt - commission;

      send(SendParameters{
          to: updated.master,
          value: payout,
          // mode: SendIgnoreErrors
      });
      send(SendParameters{
          to: self.platform_address,
          value: commission,
         // mode: SendIgnoreErrors
      });

    } else if (updated.clientSaidAbsent && updated.masterSaidAbsent) {
      // Both say — the customer did not arrive — full refund
      send(SendParameters{
          to: updated.client,
          value: amt,
          mode: SendIgnoreErrors
      });

    } else {
      // Dispute — we divide 50/50 after the commission
      let remainder = amt - commission;
      let half = remainder / 2;

      send(SendParameters{
          to: updated.master,
          value: half,
          mode: SendIgnoreErrors
      });
      send(SendParameters{
          to: updated.client,
          value: remainder - half,
          mode: SendIgnoreErrors
      });
      send(SendParameters{
          to: self.platform_address,
          value: commission,
          mode: SendIgnoreErrors
      });
    }

    self.reply("The answer is accepted. Funds have been distributed".asComment());
  }

  get fun order(orderId: Int): Order? {
    return self.orders.get(orderId);
  }
}
