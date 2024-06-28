import { fetchUser } from "../lib/data";

export default async function Profile() {
    const user = await fetchUser();
    const keys = ['name', 'email', 'address', 'phone'];

    return (
        <>
            {
                keys.map(
                    (key) => {
                        return (
                            <p key={user.id+key}>{key} : {user[key]}</p>
                        );
                    }
                )
            }
        </>
    );
}