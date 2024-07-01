import { Inter } from "next/font/google";
import "@/app/ui/globals.css";
import Profile from "./ui/profile";
import { Suspense } from "react";
import { ProfileSkeleton } from "./ui/profile";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="grid grid-cols-7">
          <div className="self-start sticky top-0 col-span-2">
            <Suspense fallback={<ProfileSkeleton />}>
              <Profile />
            </Suspense>
          </div>
          <main className="col-span-5">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
