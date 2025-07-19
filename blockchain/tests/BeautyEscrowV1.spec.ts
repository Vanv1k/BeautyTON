import { Blockchain, SandboxContract, TreasuryContract } from "@ton/sandbox";
import { toNano } from "@ton/core";
import { BeautyEscrowV1 } from "../build/BeautyEscrowV1/BeautyEscrowV1_BeautyEscrowV1";
import "@ton/test-utils";

describe("BeautyEscrowV1", () => {
  let blockchain: Blockchain;
  let deployer: SandboxContract<TreasuryContract>;
  let platformWallet: SandboxContract<TreasuryContract>;
  let clientWallet: SandboxContract<TreasuryContract>;
  let masterWallet: SandboxContract<TreasuryContract>;
  let escrow: SandboxContract<BeautyEscrowV1>;

  beforeEach(async () => {
    blockchain = await Blockchain.create();

    deployer = await blockchain.treasury("deployer");
    platformWallet = await blockchain.treasury("platform");
    clientWallet = await blockchain.treasury("client");
    masterWallet = await blockchain.treasury("master");

    escrow = blockchain.openContract(
      await BeautyEscrowV1.fromInit(platformWallet.address, 5n)
    );

    const timestamp = new Date().getTime();

    const deployResult = await escrow.send(
      deployer.getSender(),
      {
        value: toNano("0.05"),
      },
      { $$type: "Deploy", queryId: BigInt(timestamp) }
    );

    expect(deployResult.transactions).toHaveTransaction({
      from: deployer.address,
      to: escrow.address,
      deploy: true,
      success: true,
    });
  });

  it("should deploy", async () => {
    // the check is done inside beforeEach
    // blockchain and servicePayment are ready to use
  });

  it("amount is less than price of service — error", async () => {
    const orderId = 0n; // Предположим, что это ID заказа

    const createRes = await escrow.send(
      clientWallet.getSender(),
      { value: toNano("0.04") }, // 0.04 < 0.05
      {
        $$type: "CreateOrder",
        orderId,
        master: masterWallet.address,
        amount: toNano("0.05"),
      }
    );
    expect(createRes.transactions).toHaveTransaction({
      aborted: true,
      from: clientWallet.address,
      to: escrow.address,
    });
  });

  it("this order already exists — error", async () => {
    const orderId = 0n;

    // Клиент создает заказ на 1 TON
    const createRes = await escrow.send(
      clientWallet.getSender(),
      { value: toNano("1.01") },
      {
        $$type: "CreateOrder",
        orderId,
        master: masterWallet.address,
        amount: toNano("1"),
      }
    );

    expect(createRes.transactions).toHaveTransaction({ success: true });
    // Повторная попытка создания заказа с тем же ID
    const createRes2 = await escrow.send(
      clientWallet.getSender(),
      { value: toNano("1.01") },
      {
        $$type: "CreateOrder",
        orderId,
        master: masterWallet.address,
        amount: toNano("1"),
      }
    );
    expect(createRes2.transactions).toHaveTransaction({
      aborted: true,
      from: clientWallet.address,
      to: escrow.address,
    });
  });

  // созданный заказ можно получить через getOrder
  it("getOrder returns created order", async () => {
    const orderId = 0n;

    // Клиент создает заказ на 1 TON
    const createRes = await escrow.send(
      clientWallet.getSender(),
      { value: toNano("1.01") },
      {
        $$type: "CreateOrder",
        orderId,
        master: masterWallet.address,
        amount: toNano("1"),
      }
    );

    expect(createRes.transactions).toHaveTransaction({ success: true });

    const getOrderRes = await escrow.getOrder(orderId);
    expect(getOrderRes).not.toBeNull();
  });

  it("client creates order and both confirm visit — master receives 95%, platform 5%", async () => {
    const masterBalanceBefore = await masterWallet.getBalance();
    const platformBalanceBefore = await platformWallet.getBalance();

    const orderId = 0n;

    // Клиент создает заказ на 1 TON
    const createRes = await escrow.send(
      clientWallet.getSender(),
      { value: toNano("1.01") },
      {
        $$type: "CreateOrder",
        orderId,
        master: masterWallet.address,
        amount: toNano("1"),
      }
    );

    createRes.result;

    expect(createRes.transactions).toHaveTransaction({ success: true });

    // Клиент подтверждает посещение
    const confirmClientRes = await escrow.send(
      clientWallet.getSender(),
      { value: toNano("0.05") },
      { $$type: "Confirm", orderId, wasPresent: true }
    );
    expect(confirmClientRes.transactions).toHaveTransaction({ success: true });
    expect(await escrow.getOrder(orderId)).toMatchObject({
      clientConfirmed: true,
      masterConfirmed: false,
      clientSaidAbsent: false,
      masterSaidAbsent: false,
      finalized: false,
    });

    // Мастер подтверждает посещение
    const confirmMasterRes = await escrow.send(
      masterWallet.getSender(),
      { value: toNano("1") },
      { $$type: "Confirm", orderId, wasPresent: true }
    );

    expect(confirmMasterRes.transactions).toHaveTransaction({
      from: escrow.address,
      to: masterWallet.address,
      success: true,
    });
    expect(confirmMasterRes.transactions).toHaveTransaction({
      from: escrow.address,
      to: platformWallet.address,
      success: true,
    });
    expect(await escrow.getOrder(orderId)).toMatchObject({
      clientConfirmed: true,
      masterConfirmed: true,
      clientSaidAbsent: false,
      masterSaidAbsent: false,
      finalized: true,
    });

    // Проверяем, что мастер получил 95% от суммы заказа, а платформа 5%
    const masterChangingBalance =
      (await masterWallet.getBalance()) - masterBalanceBefore;
    const platformChangingBalance =
      (await platformWallet.getBalance()) - platformBalanceBefore;

    expect(masterChangingBalance).toBeLessThanOrEqual(toNano("0.95"));
    expect(masterChangingBalance).toBeGreaterThanOrEqual(toNano("0.94"));

    expect(platformChangingBalance).toBeLessThanOrEqual(toNano("0.05"));
    expect(platformChangingBalance).toBeGreaterThanOrEqual(toNano("0.04"));
  });

  it("both confirm absence — full refund to client", async () => {
    const masterBalanceBefore = await masterWallet.getBalance();
    const clientBalanceBefore = await clientWallet.getBalance();

    const orderId = 0n;

    // Клиент создает заказ на 1 TON
    const createRes = await escrow.send(
      clientWallet.getSender(),
      { value: toNano("1.01") },
      {
        $$type: "CreateOrder",
        orderId,
        master: masterWallet.address,
        amount: toNano("1"),
      }
    );

    createRes.result;

    expect(createRes.transactions).toHaveTransaction({ success: true });

    // Клиент подтверждает отсутствие
    const confirmClientRes = await escrow.send(
      clientWallet.getSender(),
      { value: toNano("0.05") },
      { $$type: "Confirm", orderId, wasPresent: false }
    );
    expect(confirmClientRes.transactions).toHaveTransaction({ success: true });
    expect(await escrow.getOrder(orderId)).toMatchObject({
      clientConfirmed: true,
      masterConfirmed: false,
      clientSaidAbsent: true,
      masterSaidAbsent: false,
      finalized: false,
    });

    // Мастер подтверждает отсутствие
    const confirmMasterRes = await escrow.send(
      masterWallet.getSender(),
      { value: toNano("1") },
      { $$type: "Confirm", orderId, wasPresent: false }
    );

    expect(confirmMasterRes.transactions).toHaveTransaction({
      from: escrow.address,
      to: clientWallet.address,
      success: true,
    });
    expect(await escrow.getOrder(orderId)).toMatchObject({
      clientConfirmed: true,
      masterConfirmed: true,
      clientSaidAbsent: true,
      masterSaidAbsent: true,
      finalized: true,
    });

    // Проверяем, что мастер получил 0% от суммы заказа, а клиент получил полный возврат
    const masterChangingBalance =
      (await masterWallet.getBalance()) - masterBalanceBefore;
    const clientChangingBalance =
      (await clientWallet.getBalance()) - clientBalanceBefore;

    expect(masterChangingBalance).toBeLessThanOrEqual(toNano("0"));
    expect(masterChangingBalance).toBeGreaterThanOrEqual(toNano("-0.01"));

    expect(clientChangingBalance).toBeLessThanOrEqual(toNano("0"));
    expect(clientChangingBalance).toBeGreaterThanOrEqual(toNano("-0.03"));
  });

  it("dispute — one confirms presence, другой отсутствие — split payment after commission", async () => {
    const masterBalanceBefore = await masterWallet.getBalance();
    const clientBalanceBefore = await clientWallet.getBalance();
    const platformBalanceBefore = await platformWallet.getBalance();

    const orderId = 0n;

    // Клиент создает заказ на 1 TON
    const createRes = await escrow.send(
      clientWallet.getSender(),
      { value: toNano("1.01") },
      {
        $$type: "CreateOrder",
        orderId,
        master: masterWallet.address,
        amount: toNano("1"),
      }
    );

    createRes.result;

    expect(createRes.transactions).toHaveTransaction({ success: true });

    // Клиент подтверждает отсутствие
    const confirmClientRes = await escrow.send(
      clientWallet.getSender(),
      { value: toNano("0.05") },
      { $$type: "Confirm", orderId, wasPresent: false }
    );
    expect(confirmClientRes.transactions).toHaveTransaction({ success: true });
    expect(await escrow.getOrder(orderId)).toMatchObject({
      clientConfirmed: true,
      masterConfirmed: false,
      clientSaidAbsent: true,
      masterSaidAbsent: false,
      finalized: false,
    });

    // Мастер подтверждает посещение (спор)
    const confirmMasterRes = await escrow.send(
      masterWallet.getSender(),
      { value: toNano("1") },
      { $$type: "Confirm", orderId, wasPresent: true }
    );

    expect(confirmMasterRes.transactions).toHaveTransaction({
      from: escrow.address,
      to: masterWallet.address,
      success: true,
    });
    expect(confirmMasterRes.transactions).toHaveTransaction({
      from: escrow.address,
      to: platformWallet.address,
      success: true,
    });
    expect(await escrow.getOrder(orderId)).toMatchObject({
      clientConfirmed: true,
      masterConfirmed: true,
      clientSaidAbsent: true,
      masterSaidAbsent: false,
      finalized: true,
    });

    // Проверяем, что платформа получила комиссию, а клиент и мастер получили свои доли
    // 47.5% клиент, 47.5% мастер, 5% комиссия платформы
    const masterChangingBalance =
      (await masterWallet.getBalance()) - masterBalanceBefore;
    const clientChangingBalance =
      (await clientWallet.getBalance()) - clientBalanceBefore;
    const platformChangingBalance =
      (await platformWallet.getBalance()) - platformBalanceBefore;

    expect(masterChangingBalance).toBeLessThanOrEqual(toNano("0.475"));
    expect(masterChangingBalance).toBeGreaterThanOrEqual(toNano("0.45"));

    expect(clientChangingBalance).toBeLessThanOrEqual(toNano("-0.525"));
    expect(clientChangingBalance).toBeGreaterThanOrEqual(toNano("-0.55"));

    expect(platformChangingBalance).toBeLessThanOrEqual(toNano("0.05"));
    expect(platformChangingBalance).toBeGreaterThanOrEqual(toNano("0.04"));
  });
});
