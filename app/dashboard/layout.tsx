import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tighter">Wortise CMS</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              {session.user.email}
            </span>
            <Button variant="outline" size="sm" className="cursor-pointer">Cerrar Sesión</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-slate-50/50">
        {children}
      </main>
    </div>
  );
}