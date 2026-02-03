import Navbar from "~/components/Nav";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col px-10 lg:px-24 gap-20">{children}</main>
    </div>
  );
}
