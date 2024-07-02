import { fetchUser } from "../lib/data";

export function ProfileSkeleton() {
    const keys = ['name', 'email', 'address', 'phone'];
    return (
        <>
            {
                keys.map((key) => (
                    <p key={key}>{key} : loading...</p>
                ))
            }
        </>
    )
}

export default async function Profile() {
    const user = await fetchUser();
    const keys = ['name', 'email', 'address', 'phone'];

    return (
        <div className="my-6">
            {
                keys.map(
                    (key) => {
                        return (
                            <p key={user.id+key}>{key} : {user[key]}</p>
                        );
                    }
                )
            }
        </div>
    );
}