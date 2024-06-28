import { query } from '@/config/db';

export async function fetchUser() {
    const queryText = `SELECT * FROM users`;
    try {
        const user = await query(queryText);
        return user.rows[0];
    } catch (error) {
        console.error('fetch User Error :', Error);
    }
}