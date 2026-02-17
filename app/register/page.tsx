"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpInput } from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Loader2, UserPlus } from "lucide-react";
import { useRegister } from "@/hooks/use-register";

export default function RegisterPage() {
  const { handleRegister, isLoading } = useRegister();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    try {
      await handleRegister(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message);
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
            <CardTitle className="text-2xl font-black tracking-tight">Crea tu cuenta</CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Empieza a publicar tus historias hoy mismo.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase text-slate-500 ml-1">Nombre Completo</Label>
                <Input 
                  id="name"
                  {...register("name")} 
                  placeholder="Juan Perez"
                  className="rounded-xl border-slate-200 h-11 focus-visible:ring-primary" 
                />
                {errors.name && <p className="text-destructive text-[10px] font-bold uppercase px-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase text-slate-500 ml-1">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  {...register("email")} 
                  placeholder="tu@email.com"
                  className="rounded-xl border-slate-200 h-11" 
                />
                {errors.email && <p className="text-destructive text-[10px] font-bold uppercase px-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase text-slate-500 ml-1">Contraseña</Label>
                <Input 
                  id="password"
                  type="password"
                  {...register("password")} 
                  placeholder="••••••••"
                  className="rounded-xl border-slate-200 h-11" 
                />
                {errors.password && <p className="text-destructive text-[10px] font-bold uppercase px-1">{errors.password.message}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 mt-2 transition-all hover:scale-[1.01]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Unirme ahora
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 font-medium">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-primary font-bold hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-slate-400 font-medium px-8 leading-relaxed">
          Al registrarte, aceptas nuestros términos de servicio y la política de privacidad.
        </p>
      </div>
    </div>
  );
}