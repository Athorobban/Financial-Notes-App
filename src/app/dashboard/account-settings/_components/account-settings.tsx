"use client";

import { useState, useTransition } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle, Camera, Loader2, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";

export default function AccountSettingsForm() {
  const profile = useAuthStore((state) => state.profile);
  const [isPendingProfile, startTransitionProfile] = useTransition();
  const [isPendingPassword, startTransitionPassword] = useTransition();

  // State lokal untuk form
  const [name, setName] = useState(profile?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    startTransitionProfile(async () => {
      // TODO: Panggil Server Action untuk update tabel profiles di sini
      // await updateProfileAction({ id: profile.id, name });

      // Simulasi delay jaringan
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profil berhasil diperbarui!");
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password baru minimal 6 karakter.");
      return;
    }

    startTransitionPassword(async () => {
      // TODO: Panggil Server Action untuk update password via Supabase Auth
      // await updatePasswordAction({ currentPassword, newPassword });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password berhasil diubah!");
      setCurrentPassword("");
      setNewPassword("");
    });
  };

  return (
    <div className="grid gap-8">
      {/* SECTION 1: PROFIL UMUM */}
      <Card className="shadow-sm border-slate-200">
        <form onSubmit={handleUpdateProfile}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="size-5 text-primary" />
              <CardTitle>Profil Umum</CardTitle>
            </div>
            <CardDescription>Perbarui foto profil dan detail identitas Anda di sini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Upload Area */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group cursor-pointer">
                <div className="flex size-24 items-center justify-center rounded-full bg-slate-100 border-2 border-dashed border-slate-300 group-hover:border-primary transition-colors overflow-hidden">
                  {/* Placeholder Avatar */}
                  <UserCircle className="size-16 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <div className="absolute bottom-0 right-0 p-1.5 bg-primary rounded-full text-white shadow-sm ring-2 ring-white">
                  <Camera className="size-4" />
                </div>
                {/* Input file disembunyikan, dipicu oleh label/klik kontainer */}
                <input type="file" className="hidden" accept="image/png, image/jpeg" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-sm font-semibold text-slate-900">Foto Profil</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">Format yang didukung: JPG, PNG. Ukuran maksimal 2MB. Resolusi 1:1 direkomendasikan.</p>
                <Button type="button" variant="outline" size="sm" className="mt-3">
                  Pilih Gambar
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama Anda" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Peran (Role)</Label>
                <Input id="role" value={profile?.role || "User"} disabled className="bg-slate-50 cursor-not-allowed capitalize" />
                <p className="text-[11px] text-muted-foreground">Peran tidak dapat diubah oleh pengguna.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-slate-50/50 px-6 py-4">
            <Button type="submit" disabled={isPendingProfile} className="ml-auto">
              {isPendingProfile && <Loader2 className="mr-2 size-4 animate-spin" />}
              Simpan Profil
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* SECTION 2: KEAMANAN & PASSWORD */}
      <Card className="shadow-sm border-slate-200 border-l-4 border-l-amber-500">
        <form onSubmit={handleUpdatePassword}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-amber-500" />
              <CardTitle>Keamanan Akun</CardTitle>
            </div>
            <CardDescription>Pastikan akun Anda menggunakan password yang kuat dan unik.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current_password">Password Saat Ini</Label>
              <Input id="current_password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new_password">Password Baru</Label>
              <Input id="new_password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Minimal 6 karakter" required />
            </div>
          </CardContent>
          <CardFooter className="border-t bg-slate-50/50 px-6 py-4">
            <Button type="submit" variant="secondary" disabled={isPendingPassword} className="ml-auto">
              {isPendingPassword && <Loader2 className="mr-2 size-4 animate-spin" />}
              Perbarui Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
