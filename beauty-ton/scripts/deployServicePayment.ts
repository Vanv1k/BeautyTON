import { toNano } from '@ton/core';
import { ServicePayment } from '../build/ServicePayment/ServicePayment_ServicePayment';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const servicePayment = provider.open(await ServicePayment.fromInit(BigInt(Math.floor(Math.random() * 10000)), 0n));

    await servicePayment.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        null,
    );

    await provider.waitForDeploy(servicePayment.address);

    console.log('ID', await servicePayment.getId());
}
