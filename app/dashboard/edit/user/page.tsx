import { fetchUser } from "@/app/lib/data";
import EditForm from "@/app/ui/dashboard/edit/editUser";
import { notFound } from "next/navigation";

export default async function Page() {
  const user = await fetchUser();
  if (!user) notFound();

  return <EditForm user={user} />;
}
