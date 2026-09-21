"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);

export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string; // Antara 'Admin' atau 'User'

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      name,
      role,
    },
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/users");
  return { status: "success", data };
}

export async function updateUser(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;

  const { data, error } = await supabase.from("profiles").update({ name, role, updated_at: new Date().toISOString() }).eq("id", id);

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/users");
  return { status: "success", data };
}

export async function deleteUser(id: string) {
  const { data, error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/users");
  return { status: "success", data };
}
