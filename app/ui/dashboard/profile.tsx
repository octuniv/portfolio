import { fetchUser } from "@/app/lib/data";
import { userKeys } from "@/app/lib/definition";
import { EditUser } from "./buttons";

export function ProfileSkeleton() {
  return (
    <>
      {userKeys.map((key) => (
        <p key={key}>{key} : loading...</p>
      ))}
    </>
  );
}

export default async function Profile() {
  const user = await fetchUser();

  return (
    <>
      <div className="my-6">
        {userKeys.map((key) => {
          return (
            <p key={key}>
              {key} : {user[key]}
            </p>
          );
        })}
      </div>
      <EditUser />
    </>
  );
}
