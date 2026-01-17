import Navbar from "~/components/Nav";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col lg:px-20 px-10">{children}</main>
    </div>
  );
}
