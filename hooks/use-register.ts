import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { SignUpInput } from "@/schemas/auth";

export function useRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: SignUpInput) => {
    setIsLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: "/dashboard", 
      });

      if (error) {
        throw new Error(error.message || "No pudimos crear tu cuenta");
      }

      router.refresh();
      router.push("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setIsLoading(false);
      throw err; 
    }
  };

  return { handleRegister, isLoading };
}