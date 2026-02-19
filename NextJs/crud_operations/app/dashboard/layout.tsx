import type { Metadata } from "next";
import Header from "../components/layout/Header";
import SideBar from "../components/layout/SideBar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Professional CRUD Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="flex flex-col min-h-screen">
          <Header />

          <div className="flex flex-1">
            <SideBar />

            <main className="flex-1 p-8">
              {children}
            </main>
          </div>
        </div>
  );
}
