"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpInput } from "@/schemas/auth";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    const { error } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    if (error) {
      alert("Error al registrar: " + error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md text-black bg-white p-8 rounded-lg shadow-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Crear cuenta</h1>
        
        <div>
          <label className="block text-sm font-medium">Nombre Completo</label>
          <input {...register("name")} className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register("email")} type="email" className="w-full border p-2 rounded" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input {...register("password")} type="password" className="w-full border p-2 rounded" />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
          Registrarse
        </button>
      </form>
    </div>
  );
}