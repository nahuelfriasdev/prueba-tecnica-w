import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateArticleForm from "@/components/CreateArticleForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/register");
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Hola, {session.user.name} 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Gestiona tus publicaciones y revisa el rendimiento de tus artículos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle>Nueva Publicación</CardTitle>
                <CardDescription>Completa los campos para subir un nuevo artículo.</CardDescription>
              </CardHeader>
              <CardContent>
                <CreateArticleForm />
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Tus Publicaciones</h2>
            
            <Card className="bg-white/50 border-dashed border-2 flex items-center justify-center p-12">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">Aún no has publicado nada.</p>
                <p className="text-sm text-slate-400">Tus artículos aparecerán listados aquí.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}