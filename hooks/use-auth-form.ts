import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LoginInput } from "@/schemas/auth";

export function useAuthForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: LoginInput) => {
    setLoading(true);
    
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      });

      if (error) {
        throw new Error(error.message || "Error al iniciar sesión");
      }

      router.push("/dashboard");
      router.refresh();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      throw err; 
    }
  };

  return {
    handleLogin,
    loading,
  };
}