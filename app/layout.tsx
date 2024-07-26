import { Inter } from "next/font/google";
import "@/app/ui/globals.css";
import { ButtonVisibleProvider } from "@/app/context/ButtonVisibleContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ButtonVisibleProvider>{children}</ButtonVisibleProvider>
      </body>
    </html>
  );
}
