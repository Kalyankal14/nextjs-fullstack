import { PrismaClient } from 'prisma/prisma-client'

async function getUsersList() {
    const db = new PrismaClient();
    const list = await db.user.findMany({
        where: {
            name: 'Teja'
        }
    });
    return {
        users: list
    }
}

export default async function Page() {
    const users = await getUsersList();
    return <section>
        <h2>Users</h2>
        <pre>{JSON.stringify(users, null, 2)}</pre>
    </section>
}