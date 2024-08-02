const { Client } = require('../config/db.js');
const {
    users,
    paragraphs,
    portfolios
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
            email VARCHAR(255) NOT NULL UNIQUE,
            phone TEXT NOT NULL,
            socialSites TEXT NOT NULL
            );
        `);

        console.log(`Created "users" table`);

        const queryText = `
          INSERT INTO users (name, email, phone, socialSites)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (id) DO NOTHING;
        `

        const insertedUsers = await Promise.all(
            users.map(
                async (user) => {
                    params = [user.name, user.email, user.phone, user.socialSites];
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

async function seedParagraphs() {
    const client = Client();
    await client.connect();
    try {
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        const createTable = await client.query(`
            CREATE TABLE IF NOT EXISTS paragraphs (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            sequence SERIAL,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL
            );
        `);

        console.log(`Created "paragraphs" table`);

        const queryText = `
          INSERT INTO paragraphs (title, content)
          VALUES ($1, $2)
          ON CONFLICT (id) DO NOTHING;
        `

        const insertedParagraphs = await Promise.all(
            paragraphs.map(
                async (nC) => {
                    params = [nC.title, nC.content];
                    await client.query(queryText, params);
                }
            )
        );

        return {
            createTable,
            paragraphs: insertedParagraphs,
        }
    } catch (error) {
        console.error('Error seeding paragraphs:', error);
        throw error;
      } finally {
        await client.end();
      }
}

async function seedPortfolios() {
    const client = Client();
    await client.connect();

    try {
        await client.query('BEGIN');
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        const createPortfolioTable = await client.query(`
            CREATE TABLE IF NOT EXISTS portfolios (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            sequence SERIAL,
            title VARCHAR(255) NOT NULL
            );
        `);

        const createParagraphsTable = await client.query(`
            CREATE TABLE IF NOT EXISTS paragraphsInPortfolio (
            id SERIAL PRIMARY KEY,
            subtitle VARCHAR(255) NOT NULL,
            intro TEXT NOT NULL,
            content TEXT NOT NULL,
            portfolio_id UUID references portfolios(id)
            );
        `);

        console.log(`Created "portfolios" table`);

        const portfolioQueryText = `
            INSERT INTO portfolios (id, title)
            VALUES ($1, $2)
            ON CONFLICT (id) DO NOTHING;
        `;

        const paragraphQueryText = `
            INSERT INTO paragraphsInPortfolio (subtitle, intro, content, portfolio_id)
            VALUES ($1, $2, $3, $4);
        `

        const insertedPortfolios = await Promise.all(
            portfolios.map(
                async (pfC) => {
                    const portfolioId = uuidv4();
                    const params = [portfolioId, pfC.title];

                    await client.query(portfolioQueryText, params);

                    pfC.paragraphs.map(
                        async (parags) => {
                            const params = [parags.subtitle, parags.intro, parags.content, portfolioId];

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
        console.error('Error seeding portfolios:', error);
        await client.query('ROLLBACK');
        throw error;
    } finally {
        await client.end();
    }
}

async function main() {
    await seedUsers();
    await seedParagraphs();
    await seedPortfolios();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
