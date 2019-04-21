const { prisma } = require('./hello-world/generated/prisma-client');
const Mock = require('mockjs');
const Random = Mock.Random;

async function main() {
    // Note admin only need to be created once
    const admin = await prisma.createUser({
        name: "admin",
        email: "admin@fake",
        password: "fake"
    });
    console.log(`<Log>[${new Date().toUTCString()}]: admin user created: ${JSON.stringify(admin)}`);

    for (let i = 0; i < 2; i++) {
        const newBlog = await prisma.createBlog({
            url: Random.url('http', 'website.fake'),
            description: Random.word(2,8),
            postedBy: {
                connect: {
                    email: "admin@fake"
                }
            }
        });
        console.log(`<Log>[${new Date().toUTCString()}]: Created new blog: ${JSON.stringify(newBlog)}`);
    }

    const allBlogs = await prisma.blogs();
    console.log(`<Log>[${new Date().toUTCString()}]: ${JSON.stringify(allBlogs)}`);
}

main().catch(e => console.error(e));