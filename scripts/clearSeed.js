// Don't try this unless you want to clear this tables!

const { Client } = require('../config/db.js');

async function main() {
    const tableTitles = [
        'paragraphs',
        'paragraphsinportfolio',
        'portfolios',
        'users'
    ];

    const dropQuery = (title) => `DROP TABLE IF EXISTS ${title} CASCADE;`;

    const client = Client();
    await client.connect();

    try {
        await client.query('BEGIN');

        tableTitles.forEach(async (title) => {
            // console.log(title);
            const result = await client.query(dropQuery(title));
            // console.log(result);
        });

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        await client.end();
    }
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to clear the database:',
        err,
    );
});