import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateArticleForm from "@/components/CreateArticleForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ArticleList from "@/components/ArticleList";

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
                  Comparte tus ideas con el resto del mundo.
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
            </div>

            <ArticleList />
            
          </section>
        </div>
      </div>
    </div>
  );
}