import { LogoutButton } from "@/components/LogoutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                 <span className="text-white font-black text-xs">W</span>
               </div>
               <span className="font-black text-xl tracking-tighter uppercase italic">CMS</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-xs font-bold text-slate-900">{session.user.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">{session.user.email}</span>
              </div>
              <LogoutButton />
            </div>
          </div>
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}