'use client'

import * as React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { 
  ME_QUERY, 
  UPDATE_USER_MUTATION, 
  CHANGE_PASSWORD_MUTATION 
} from '@/modules/auth/services/user.graphql'
import { toast } from 'sonner'
import { getGraphQLErrorMessage } from '@/lib/core/apollo'
import { ProfileForm } from '@/modules/auth/components/profile/ProfileForm'
import { PasswordForm } from '@/modules/auth/components/profile/PasswordForm'
import { AppBadge } from '@/components/primitives'
import { AlertCircle } from 'lucide-react'

/**
 * ProfilePage
 * Halaman pengaturan akun pribadi user.
 */

export default function ProfilePage() {
  // Query data user saat ini
  const { data, loading: queryLoading, refetch } = useQuery(ME_QUERY)

  // Mutation: Update Profil
  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      refetch()
      toast.success('Profil diperbarui', {
        description: 'Informasi akun Anda telah berhasil disimpan.'
      })
    },
    onError: (error) => {
      toast.error('Gagal memperbarui profil', {
        description: getGraphQLErrorMessage(error)
      })
    }
  })

  // Mutation: Ganti Password
  const [changePassword, { loading: passwordLoading }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted: () => {
      toast.success('Password diperbarui', {
        description: 'Kata sandi akun Anda telah berhasil diganti.'
      })
    },
    onError: (error) => {
      toast.error('Gagal mengganti password', {
        description: getGraphQLErrorMessage(error)
      })
    }
  })

  const user = data?.me

  if (queryLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] ">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in duration-500 ">
      {/* Container dengan max-w-4xl agar form tidak melebar penuh (stretched).
        Ini standar enterprise UI/UX untuk halaman Settings.
      */}
      <div className="max-w-4xl space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Pengaturan Akun</h1>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Kelola informasi profil dan keamanan akun Anda di sini.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AppBadge variant={user?.is_active ? 'success' : 'neutral'} badgeStyle="dot">
              {user?.is_active ? 'Akun Aktif' : 'Akun Non-aktif'}
            </AppBadge>
            <AppBadge variant="info" badgeStyle="solid">
              {user?.roles?.[0]?.nama_role || 'User'}
            </AppBadge>
          </div>
        </div>

        {/* Vertical Stack Content */}
        <div className="space-y-10">
          
          {/* SECTION 1: Profile Info */}
          <section className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-foreground">Informasi Profil</h2>
              <p className="text-sm text-muted-foreground">Perbarui data diri dan informasi kontak Anda.</p>
            </div>
            
            <ProfileForm 
              isLoading={updateLoading}
              initialData={{
                nama_lengkap: user?.nama_lengkap,
                email: user?.email,
                nrp: user?.nrp,
                jabatan: user?.jabatan,
                unit_kerja: user?.unit?.nama_unit,
              }}
              onSave={(formData) => {
                updateUser({
                  variables: {
                    id: user?.id,
                    input: {
                      nama_lengkap: formData.nama_lengkap,
                      email: formData.email
                    }
                  }
                })
              }}
            />
          </section>

          {/* Divider pemisah yang elegan */}
          <hr className="border-border" />

          {/* SECTION 2: Security & Password */}
          <section className="space-y-4 pb-10">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-foreground">Keamanan & Password</h2>
              <p className="text-sm text-muted-foreground">Pastikan akun Anda menggunakan kata sandi yang kuat dan aman.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Form Ganti Password (Kiri/Atas) */}
              <div className="w-full md:w-2/3">
                <PasswordForm 
                  isLoading={passwordLoading}
                  onUpdate={(formData) => {
                    changePassword({
                      variables: {
                        oldPassword: formData.oldPassword,
                        newPassword: formData.newPassword
                      }
                    })
                  }}
                />
              </div>

              {/* Quick Security Tips (Kanan/Bawah form password) */}
              <div className="w-full md:w-1/3 p-5 rounded-xl border border-warning/20 bg-warning/5 space-y-3">
                <div className="flex items-center gap-2 text-warning font-semibold">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">Tips Keamanan</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-2.5 list-disc pl-4 leading-relaxed">
                  <li>Gunakan minimal 8 karakter dengan kombinasi huruf, angka, dan simbol khusus.</li>
                  <li>Jangan gunakan informasi pribadi (tanggal lahir, nama) sebagai sandi.</li>
                  <li>Ganti password secara berkala setiap 3-6 bulan sekali.</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}