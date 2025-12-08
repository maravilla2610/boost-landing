import { getUser } from "@/app/actions/user";
import { AppSidebar } from "@/components/app-sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AppSidebar user={user}>
      {children}
    </AppSidebar>
  );
}
