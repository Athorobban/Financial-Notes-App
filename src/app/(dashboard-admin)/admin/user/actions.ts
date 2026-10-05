"use server";

import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { createUserSchema, updateUserSchema } from "@/validations/auth-validation"; // Sesuaikan lokasi schema Anda

const getAdminSupabase = () => {
  return createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
};

export async function createUser(prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = createUserSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: ["Format data tidak valid. Periksa kembali input Anda."],
      },
    };
  }

  const { email, password, name, role } = validatedFields.data;
  const adminAuthClient = getAdminSupabase();

  try {
    const { data: authData, error: authError } = await adminAuthClient.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Auto-confirm karena dibuat oleh Admin
      user_metadata: { name, role },
    });

    if (authError) throw authError;

    revalidatePath("/admin/user");
    return { status: "success", errors: {} };
  } catch (error: any) {
    return {
      status: "error",
      errors: { _form: [error.message] },
    };
  }
}

export async function updateUser(prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const userId = formData.get("id") as string;

  if (!userId) {
    return { status: "error", errors: { _form: ["ID Pengguna tidak ditemukan."] } };
  }

  const validatedFields = updateUserSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: ["Format data tidak valid."],
      },
    };
  }

  const { name, role } = validatedFields.data;
  const adminAuthClient = getAdminSupabase();

  try {
    const { error: authError } = await adminAuthClient.auth.admin.updateUserById(userId, {
      user_metadata: { name, role },
    });

    if (authError) throw authError;

    const { error: profileError } = await adminAuthClient.from("profiles").update({ name, role, updated_at: new Date().toISOString() }).eq("id", userId);

    if (profileError) throw profileError;

    revalidatePath("/admin/user");
    return { status: "success", errors: {} };
  } catch (error: any) {
    return {
      status: "error",
      errors: { _form: [error.message] },
    };
  }
}

export async function deleteUser(prevState: any, formData: FormData) {
  const userId = formData.get("id") as string;

  if (!userId) {
    return { status: "error", errors: { _form: ["ID Pengguna tidak valid."] } };
  }

  const adminAuthClient = getAdminSupabase();

  try {
    const { error } = await adminAuthClient.auth.admin.deleteUser(userId);

    if (error) throw error;

    revalidatePath("/admin/user");
    return { status: "success", errors: {} };
  } catch (error: any) {
    return {
      status: "error",
      errors: { _form: [error.message] },
    };
  }
}
