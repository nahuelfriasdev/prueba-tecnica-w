import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateArticleForm from "@/components/CreateArticleForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/register");
  }

  const USER = session.user;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 text-slate-900">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <header className="flex flex-col gap-3">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Escritorio
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              Bienvenido de nuevo, <span className="text-slate-900">{USER.name}</span>.
            </p>
          </div>
          <Separator className="bg-slate-200" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <aside className="lg:col-span-4 sticky top-24">
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Crear Artículo</CardTitle>
                <CardDescription>
                  Comparte tus ideas con el resto del mundo. [cite: 30, 35]
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CreateArticleForm />
              </CardContent>
            </Card>
          </aside>
          
          <section className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                Tus Publicaciones
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                Requisito: CRUD Autor [cite: 51, 52]
              </span>
            </div>
            
            <Card className="bg-slate-100/50 border-dashed border-2 border-slate-200 flex flex-col items-center justify-center p-20 transition-all hover:bg-slate-100/80">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-slate-600 font-semibold">No hay artículos todavía</p>
                <p className="text-sm text-slate-400 max-w-62.5 mx-auto">
                  Usa el formulario de la izquierda para publicar tu primer contenido. [cite: 59, 60]
                </p>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}