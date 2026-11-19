import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return (
    <div className="lg:pl-64">
      <AdminSidebar user={user} />
      <div className="mx-auto max-w-[1000px] px-5 py-8 sm:px-8 lg:py-10">{children}</div>
    </div>
  );
}
