const { prisma } = require('./hello-world/generated/prisma-client');
const Mock = require('mockjs');

const Random = Mock.Random;
const name = Random.name();

async function main() {
    const newLink = await prisma.createLink({
        url: 'www.prisma.test',
        description: 'Prisma Testing'
    });
    console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`);

    const allLinks = await prisma.links();
    console.log(allLinks);
    console.log("======================");
}

console.log("+++++++++++++++++++++++++");
main().catch(e => console.error(e));
main().catch(e => console.error(e));
main().catch(e => console.error(e));