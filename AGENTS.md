# AGENT.md — Frontend Engineering Blueprint (AMS)

## 🎯 Tujuan Dokumen

Dokumen ini berfungsi sebagai **panduan utama (single source of truth)** dalam pengembangan Frontend untuk sistem:

> **Asset Management System (AMS)**

Fokus utama tahap ini:

* Menetapkan **Tech Stack**
* Menetapkan **Frontend Architecture**
* Menentukan **Engineering Rules**

⚠️ **Batasan Penting:**

* DILARANG mulai coding fitur bisnis
* DILARANG membuat UI halaman production
* HANYA fokus pada fondasi (foundation setup)

---

# 🧠 1. Karakter Sistem

AMS adalah sistem dengan kompleksitas tinggi:

* Multi-relational data (ERD besar)
* Workflow approval engine
* Transaction-heavy system
* Role-based access control (RBAC)
* Form & table intensive

👉 Maka pendekatan FE harus:

* Modular
* Scalable
* Maintainable

---

# 🧱 2. Tech Stack (FINAL & LOCKED)

## Core Stack

| Layer          | Technology              |
| -------------- | ----------------------- |
| Framework      | Next.js (App Router)    |
| Language       | TypeScript              |
| Styling        | Tailwind CSS            |
| UI Library     | ShadCN UI               |
| State (Client) | Zustand                 |
| Data Fetching  | Apollo Client (GraphQL) |
| Forms          | React Hook Form + Zod   |
| Table          | TanStack Table          |
| Charts         | Recharts                |

---

## Supporting Libraries

| Utility     | Library               |
| ----------- | --------------------- |
| Class merge | clsx / tailwind-merge |
| Date        | dayjs                 |
| Helper      | lodash                |

---

## ⚠️ Rules

* Tidak boleh ganti stack tanpa diskusi tim
* Semua module wajib TypeScript strict mode
* GraphQL wajib via Apollo Client

---

# 🏗️ 3. Frontend Architecture

## 3.1 Architecture Pattern

Menggunakan:

> ✅ **Feature-Based Architecture (Domain Driven)**

---

## 3.2 Struktur Folder

```
src/
│
├── app/
│   ├── (dashboard)/
│   ├── layout.tsx
│   └── page.tsx
│
├── modules/
│   ├── asset/
│   ├── loan/
│   ├── transfer/
│   ├── maintenance/
│   ├── disposal/
│   ├── inventory/
│   ├── loss/
│   ├── procurement/
│   ├── workflow/
│   ├── user/
│   └── master/
│
├── components/
│   ├── ui/
│   ├── tables/
│   ├── forms/
│   ├── layout/
│   └── workflow/
│
├── lib/
│   ├── apollo/
│   ├── utils/
│   ├── constants/
│   └── permissions/
│
├── store/
├── hooks/
├── types/
└── config/
```

---

# 🔄 4. Data Flow Standard

```
Component
   ↓
Custom Hook
   ↓
Service Layer
   ↓
Apollo Client
   ↓
Backend (GraphQL)
```

---

## ❌ Dilarang:

* Query langsung di component
* Business logic di UI
* Fetch tanpa abstraction

---

# 🧩 5. Layer Definition

## 5.1 Component Layer

* Pure UI
* Tidak boleh tahu API

---

## 5.2 Hooks Layer

* Mengelola state & logic UI
* Consume service

---

## 5.3 Service Layer

* Semua komunikasi API
* GraphQL query & mutation

---

## 5.4 Schema Layer

* Validasi form (Zod)
* Harus reusable

---

## 5.5 Types Layer

* TypeScript typing
* Sinkron dengan GraphQL schema

---

# 🔐 6. State Management Rules

## Gunakan Zustand untuk:

* Auth user
* UI state (modal, sidebar)
* Global filter

## DILARANG:

* Simpan data server (assets, loans)

👉 Data server = Apollo

---

# 🔐 7. Permission System (WAJIB)

Lokasi:

```
lib/permissions/
```

Contoh fungsi:

```
canViewAsset()
canEditAsset()
canApproveWorkflow()
```

---

## Tujuan:

* RBAC di level UI
* Hindari hardcode role di component

---

# 📊 8. Table System

Semua table harus reusable.

```
components/tables/
 ├── DataTable.tsx
 ├── columns/
```

---

## Fitur wajib:

* pagination
* sorting
* filtering
* column visibility

---

# 🧾 9. Form System

```
components/forms/
schemas/
```

---

## Wajib:

* pakai React Hook Form
* validasi pakai Zod
* schema terpisah

---

# 🔁 10. Workflow UI Engine

Reusable component:

```
components/workflow/
 ├── ApprovalTimeline
 ├── ApprovalAction
```

---

## Digunakan oleh:

* loan
* transfer
* disposal
* loss

---

# 🧭 11. Routing Strategy

Pattern:

```
/assets
/assets/[id]
/assets/create
/assets/edit
```

---

## Gunakan:

* Next.js App Router
* nested layout

---

# 📛 12. Naming Convention

| Item      | Format           |
| --------- | ---------------- |
| Hook      | useAssetList     |
| Service   | asset.service.ts |
| Schema    | asset.schema.ts  |
| Component | AssetTable.tsx   |
| Store     | auth.store.ts    |

---

# 🚫 13. Batasan Tahap Ini

### DILARANG:

* Build halaman UI lengkap
* Integrasi penuh backend
* Styling detail
* Implementasi fitur bisnis

---

### WAJIB:

* Setup struktur project
* Setup Apollo Client
* Setup Zustand store
* Setup folder modules
* Setup base components (table, form)
* Setup permission system (basic)

---

# 🚀 14. Definition of Done (Phase 1)

Tahap ini selesai jika:

* ✅ Project structure sudah terbentuk
* ✅ Semua layer sudah dibuat (service, hooks, dll)
* ✅ Apollo client terpasang
* ✅ Zustand store siap
* ✅ Base components tersedia
* ✅ Tidak ada feature business logic

---

# 🧠 15. Filosofi Engineering

> "Bangun fondasi dulu, baru bangun fitur."

Kesalahan umum:

* langsung coding UI
* tidak ada struktur
* tidak scalable

---

# 🧩 16. Next Phase

Setelah ini:

👉 Masuk ke:

* Sidebar Navigation
* UX Structure
* Design System

---

# 📌 Penutup

Dokumen ini adalah:

> **Blueprint engineering — bukan tutorial coding**

Semua development HARUS mengikuti dokumen ini untuk menjaga:

* konsistensi
* scalability
* maintainability

---
