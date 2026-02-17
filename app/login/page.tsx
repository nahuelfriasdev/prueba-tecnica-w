"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/schemas/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, LogIn } from "lucide-react";
import { useAuthForm } from "@/hooks/use-auth-form";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { handleLogin, loading } = useAuthForm();

  const onSubmit = async (data: LoginInput) => {
    try {
      await handleLogin(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-100 space-y-8">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">
            Wortise <span className="text-slate-400">CMS</span>
          </h2>
        </div>

        <Card className="border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
          <CardHeader className="space-y-1 pt-8 text-center">
            <CardTitle className="text-2xl font-black tracking-tight">Bienvenido</CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Ingresa tus credenciales para administrar tu contenido.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase text-slate-500 ml-1">
                  Correo Electrónico
                </Label>
                <Input 
                  id="email" 
                  type="email"
                  {...register("email")} 
                  placeholder="nombre@ejemplo.com" 
                  className="rounded-xl border-slate-200 h-11 focus-visible:ring-primary"
                />
                {errors.email && (
                  <p className="text-destructive text-[10px] font-bold uppercase px-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <Label htmlFor="password" className="text-xs font-bold uppercase text-slate-500">
                    Contraseña
                  </Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  {...register("password")} 
                  placeholder="••••••••"
                  className="rounded-xl border-slate-200 h-11"
                />
                {errors.password && (
                  <p className="text-destructive text-[10px] font-bold uppercase px-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button 
                disabled={loading} 
                type="submit" 
                className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 mt-2 transition-all hover:scale-[1.01]"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar al Escritorio
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 font-medium">
                ¿Aún no tienes cuenta?{" "}
                <Link href="/register" className="text-primary font-bold hover:underline">
                  Regístrate gratis
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-slate-400 font-medium px-8">
          Protegido por Wortise Auth Security v2.0
        </p>
      </div>
    </div>
  );
}