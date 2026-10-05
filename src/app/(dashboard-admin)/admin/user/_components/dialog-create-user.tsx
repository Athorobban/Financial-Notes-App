import { INITIAL_CREATE_USER_FORM, INITIAL_STATE_CREATE_USER } from "@/constants/auth-constant";
import { CreateUserForm, createUserSchema } from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../actions";
import { toast } from "sonner";
import FormUser from "./form-user";

export default function DialogCreateUser({ refetch }: { refetch: () => void }) {
  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: INITIAL_CREATE_USER_FORM,
  });

  const [createUserState, createUserAction, isPendingCreateUser] = useActionState(createUser, INITIAL_STATE_CREATE_USER);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    startTransition(() => {
      createUserAction(formData);
    });
  });

  useEffect(() => {
    if (createUserState?.status === "error") {
      toast.error("Gagal Menambahkan Pengguna", {
        description: createUserState.errors?._form?.[0] || "Terjadi kesalahan pada server.",
      });
    }

    if (createUserState?.status === "success") {
      toast.success("Pengguna Berhasil Ditambahkan");
      form.reset();

      // Menutup dialog secara otomatis
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createUserState, form, refetch]);

  return <FormUser form={form} onSubmit={onSubmit} isLoading={isPendingCreateUser} type="Create" />;
}
