const { Client } = require('../config/db.js');
const {
    users,
    normalContents,
    portfolioContents
} = require('../app/lib/placeholder-data.js');

const { v4: uuidv4 } = require('uuid'); 

async function seedUsers() {
    const client = Client();
    await client.connect();
    try {
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        const createTable = await client.query(`
            CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            address TEXT NOT NULL,
            phone TEXT NOT NULL
            );
        `);

        console.log(`Created "users" table`);

        const queryText = `
          INSERT INTO users (id, name, email, address, phone)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (id) DO NOTHING;
        `

        const insertedUsers = await Promise.all(
            users.map(
                async (user) => {
                    params = [uuidv4(), user.name, user.email, user.address, user.phone];
                    await client.query(queryText, params);
                }
            )
        );

        return {
            createTable,
            users: insertedUsers,
        }
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
      } finally {
        await client.end();
      }
}

async function seedNormalContents() {
    const client = Client();
    await client.connect();
    try {
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        const createTable = await client.query(`
            CREATE TABLE IF NOT EXISTS normalContents (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL
            );
        `);

        console.log(`Created "normalContents" table`);

        const queryText = `
          INSERT INTO normalContents (id, title, content)
          VALUES ($1, $2, $3)
          ON CONFLICT (id) DO NOTHING;
        `

        const insertedNormalContents = await Promise.all(
            normalContents.map(
                async (nC) => {
                    params = [uuidv4(), nC.title, nC.content];
                    await client.query(queryText, params);
                }
            )
        );

        return {
            createTable,
            normalContents: insertedNormalContents,
        }
    } catch (error) {
        console.error('Error seeding normalContents:', error);
        throw error;
      } finally {
        await client.end();
      }
}

async function seedPortfolioContents() {
    const client = Client();
    await client.connect();

    try {
        await client.query('BEGIN');
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        const createPortfolioTable = await client.query(`
            CREATE TABLE IF NOT EXISTS portfolios (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title TEXT NOT NULL
            );
        `);

        const createParagraphsTable = await client.query(`
            CREATE TABLE IF NOT EXISTS paragraphs (
            id SERIAL PRIMARY KEY,
            intro TEXT NOT NULL,
            content TEXT NOT NULL,
            portfolio_id UUID references portfolios(id)
            );
        `);

        console.log(`Created "portfolioContents" table`);

        const portfolioQueryText = `
            INSERT INTO portfolios (id, title)
            VALUES ($1, $2)
            ON CONFLICT (id) DO NOTHING;
        `;

        const paragraphQueryText = `
            INSERT INTO paragraphs (intro, content, portfolio_id)
            VALUES ($1, $2, $3);
        `

        const insertedPortfolios = await Promise.all(
            portfolioContents.map(
                async (pfC) => {
                    const portfolioId = uuidv4();
                    const params = [portfolioId, pfC.title];

                    await client.query(portfolioQueryText, params);

                    pfC.paragraphs.map(
                        async (parags) => {
                            const params = [parags.intro, parags.content, portfolioId];

                            await client.query(paragraphQueryText, params);
                        }
                    )
                }
            )
        );
        
        await client.query('COMMIT');

        return {
            createPortfolioTable,
            createParagraphsTable,
            portfolio: insertedPortfolios 
        }

    } catch (error) {
        console.error('Error seeding PortfolioContents:', error);
        await client.query('ROLLBACK');
        throw error;
    } finally {
        await client.end();
    }
}

async function main() {
    await seedUsers();
    await seedNormalContents();
    await seedPortfolioContents();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
