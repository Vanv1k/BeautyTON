import { Address, toNano } from "@ton/core";
import { BeautyEscrowV1 } from "../build/BeautyEscrowV1/BeautyEscrowV1_BeautyEscrowV1";
import { NetworkProvider } from "@ton/blueprint";
import dotenv from "dotenv";

dotenv.config();

const COMMISSION_PERCENTAGE = 5n;

export async function run(provider: NetworkProvider) {
  if (!process.env.PLATFORM_ADDRESS) {
    throw new Error("PLATFORM_ADDRESS environment variable is not set");
  }
  const platformAddress = Address.parse(process.env.PLATFORM_ADDRESS);

  const beautyEscrowV1 = provider.open(
    await BeautyEscrowV1.fromInit(platformAddress, COMMISSION_PERCENTAGE)
  );

  const timestamp = Date.now();

  await beautyEscrowV1.send(
    provider.sender(),
    {
      value: toNano("0.05"),
    },
    {
      $$type: "Deploy",
      queryId: BigInt(timestamp),
    }
  );

  await provider.waitForDeploy(beautyEscrowV1.address);

  // run methods on `beautyEscrowV1`
}
