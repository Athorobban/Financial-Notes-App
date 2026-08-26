"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Wajib menggunakan SERVICE_ROLE_KEY untuk membuat, mengubah password, atau menghapus pengguna via admin API
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Pastikan .env menyimpan key ini
);

export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string; // Antara 'Admin' atau 'User'
  const avatar_url = formData.get("avatar_url") as string;

  // Supabase Auth Admin akan membuat user.
  // Trigger 'handle_new_user' otomatis menyalin 'user_metadata' ini masuk ke tabel public.profiles.
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      name,
      role,
      avatar_url,
    },
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/users"); // Sesuaikan path routing kamu jika berbeda
  return { status: "success", data };
}

export async function updateUser(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const avatar_url = formData.get("avatar_url") as string;

  // Karena tidak ada trigger khusus 'handle_update_user' di script SQL,
  // Kita cukup melakukan update langsung ke tabel profiles menggunakan Admin Client
  const { data, error } = await supabaseAdmin.from("profiles").update({ name, role, avatar_url, updated_at: new Date().toISOString() }).eq("id", id);

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/users");
  return { status: "success", data };
}

export async function deleteUser(id: string) {
  // Hanya dengan menghapus data dari auth.admin,
  // Trigger 'handle_delete_user' di database akan otomatis menghapus profilnya juga
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(id);

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/users");
  return { status: "success", data };
}
