import UserProfile, {
  UserProfileSkeleton,
} from "@/app/ui/dashboard/userProfile";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-9">
      <div className="self-start sticky top-0 col-span-2">
        <Suspense fallback={<UserProfileSkeleton />}>
          <UserProfile />
        </Suspense>
      </div>
      <main className="col-span-7">{children}</main>
    </div>
  );
}
