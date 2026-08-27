"use client";

import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { INITIAL_LOGIN_FORM, INITIAL_STATE_LOGIN_FORM } from "@/constants/auth-constant";
import { LoginForm, loginSchemaForm } from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
// UBAH IMPORT INI: Ambil action loginAdmin yang baru
import { loginAdmin } from "../actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Loginadmin() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchemaForm),
    defaultValues: INITIAL_LOGIN_FORM,
  });

  // UBAH ACTION DI SINI: Gunakan loginAdmin
  const [loginState, loginAction, isPendingLogin] = useActionState(loginAdmin, INITIAL_STATE_LOGIN_FORM);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      loginAction(formData);
    });
  });

  useEffect(() => {
    if (loginState?.status === "error") {
      toast.error("Login Failed", {
        description: loginState.errors?._form?.[0],
      });
      startTransition(() => {
        // Reset state jika error
        loginAction(null as any);
      });
    }
  }, [loginState]);

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="text-center">
        {/* Sesuaikan Judul untuk memperjelas ini portal Admin */}
        <CardTitle className="text-2xl text-primary font-bold">Admin Portal</CardTitle>
        <CardDescription>Masuk dengan akun administrator Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup className="space-y-4">
            <FormInput form={form} name="email" label="Email" placeholder="admin@domain.com" type="email" />
            <FormInput form={form} name="password" label="Password" placeholder="******" type="password" />
            <Button type="submit" className="w-full">
              {isPendingLogin ? <Loader2 className="animate-spin" /> : "Login as Admin"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
