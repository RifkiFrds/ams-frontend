# AMS Frontend - Foundation Phase

## Overview

This is the **foundation setup** for the Asset Management System (AMS) frontend. This phase focuses on establishing a scalable, maintainable architecture following feature-based (domain-driven) design patterns.

**Current Phase Goal:** ✅ COMPLETE

- ✅ Project structure initialized
- ✅ Core dependencies configured
- ✅ Architecture layers established
- ✅ Base components created
- ✅ Data flow patterns documented

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Apollo Provider
│   ├── page.tsx           # Foundation status page
│   └── globals.css        # Global styles
│
├── modules/               # Feature modules (domain-driven)
│   ├── asset/            # Asset management module
│   ├── loan/             # Loan management module
│   ├── transfer/         # Asset transfer module
│   ├── maintenance/      # Maintenance tracking
│   ├── disposal/         # Asset disposal
│   ├── inventory/        # Inventory management
│   ├── loss/             # Asset loss reporting
│   ├── procurement/      # Procurement management
│   ├── workflow/         # Workflow orchestration
│   ├── user/             # User management
│   └── master/           # Master data
│
├── components/           # Reusable components
│   ├── ui/              # Basic UI components
│   ├── tables/          # Table components (DataTable)
│   ├── forms/           # Form components (FormWrapper)
│   ├── layout/          # Layout components
│   └── workflow/        # Workflow-specific components
│
├── lib/                 # Core libraries
│   ├── apollo/          # Apollo Client configuration
│   ├── utils/           # Utility functions (cn, etc.)
│   ├── constants/       # App constants
│   └── permissions/     # RBAC permission system
│
├── store/              # Zustand stores
│   ├── auth.store.ts    # Authentication state
│   └── ui.store.ts      # UI state (sidebar, modals, etc.)
│
├── hooks/              # Custom React hooks
│   ├── useAssets        # Asset data fetching hook
│   └── useLoans         # Loan data fetching hook
│
├── types/              # TypeScript type definitions
│
└── config/             # Application configuration
```

## Architecture Principles

### 1. Data Flow Pattern (MANDATORY)

```
Component
   ↓
Custom Hook (useAssets, useLoans)
   ↓
Service Layer (*.service.ts)
   ↓
Apollo Client
   ↓
GraphQL Backend
```

**Rules:**
- ✗ NO direct GraphQL queries in components
- ✗ NO business logic in components
- ✓ ALWAYS use custom hooks
- ✓ ALWAYS use service layer

### 2. Module Structure

Each module (asset, loan, transfer, etc.) must contain:

```
module-name/
├── components/     # Module-specific UI components
├── hooks/          # Module-specific custom hooks
├── services/       # API communication
├── schemas/        # Zod validation schemas
└── types/          # TypeScript types
```

### 3. State Management

**Zustand** - For UI state only:
- Auth state (user, permissions)
- UI state (sidebar open/close, modals)
- Global filters

**Apollo Client** - For server data:
- ALL business data (assets, loans, etc.)
- Server state caching
- GraphQL queries & mutations

## Tech Stack (LOCKED)

| Layer              | Technology            |
| ------------------ | --------------------- |
| Framework          | Next.js (App Router)  |
| Language           | TypeScript            |
| Styling            | Tailwind CSS          |
| UI Library         | ShadCN UI             |
| State (Client)     | Zustand               |
| Data Fetching      | Apollo Client         |
| Form Validation    | React Hook Form + Zod |
| Tables             | TanStack Table        |
| Charts             | Recharts              |
| Utilities          | clsx, tailwind-merge  |
| Date Formatting    | dayjs                 |
| Utilities Library  | lodash                |

## Getting Started

### 1. Setup Environment

```bash
# Copy environment template
cp .env.local.example .env.local

# Edit .env.local and set your GraphQL endpoint
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the foundation status page.

### 4. Build for Production

```bash
npm run build
npm start
```

## Key Components & Systems

### Apollo Client Configuration

Located: `src/lib/apollo/client.ts`

Configured with:
- HTTP link to GraphQL endpoint
- Auth link placeholder (ready for token injection)
- Intelligent cache management
- Network-only fetch policy by default

### Zustand Stores

#### Auth Store (`src/store/auth.store.ts`)

```typescript
import { useAuthStore } from '@/store';

const user = useAuthStore((state) => state.user);
const setUser = useAuthStore((state) => state.setUser);
```

#### UI Store (`src/store/ui.store.ts`)

```typescript
import { useUIStore } from '@/store';

const sidebarOpen = useUIStore((state) => state.sidebarOpen);
const toggleSidebar = useUIStore((state) => state.toggleSidebar);
```

### Permission System

Located: `src/lib/permissions/index.ts`

Usage in components:

```typescript
import { canViewAsset, canEditAsset } from '@/lib/permissions';

if (canViewAsset()) {
  // Show asset
}

if (canEditAsset()) {
  // Show edit button
}
```

### DataTable Component

Located: `src/components/tables/DataTable.tsx`

Features:
- Pagination
- Sorting
- Filtering
- Column visibility

Usage:

```typescript
import { DataTable } from '@/components/tables/DataTable';
import { assetColumns } from '@/components/tables/columns';

<DataTable
  columns={assetColumns}
  data={assets}
  pageSize={10}
  onRowClick={(row) => console.log(row)}
/>
```

### Form Components

Located: `src/components/forms/FormWrapper.tsx`

Available components:
- `FormWrapper` - Form container
- `FormField` - Text input with validation
- `FormTextarea` - Textarea with validation
- `FormSelect` - Select dropdown
- `FormButton` - Submit button

Usage:

```typescript
import { FormWrapper, FormField, FormButton } from '@/components/forms/FormWrapper';

<FormWrapper onSubmit={handleSubmit}>
  <FormField
    label="Name"
    {...register('name')}
    error={errors.name?.message}
  />
  <FormButton>Submit</FormButton>
</FormWrapper>
```

### Workflow Components

#### ApprovalTimeline

```typescript
import { ApprovalTimeline } from '@/components/workflow/ApprovalTimeline';

<ApprovalTimeline records={approvalHistory} />
```

#### ApprovalAction

```typescript
import { ApprovalAction } from '@/components/workflow/ApprovalAction';

<ApprovalAction
  workflowId="123"
  currentStatus="pending"
  canApprove={true}
  onApprove={handleApprove}
  onReject={handleReject}
/>
```

## Custom Hooks

All data fetching should use custom hooks following this pattern:

```typescript
// src/hooks/useAssets.ts
export function useAssets(options = {}) {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch from service
    // setAssets(result)
  }, []);

  return { assets, isLoading, error };
}
```

Usage in components:

```typescript
function AssetList() {
  const { assets, isLoading } = useAssets();

  return (
    <DataTable columns={assetColumns} data={assets} isLoading={isLoading} />
  );
}
```

## Services Layer

Services handle all API communication. Located in `src/modules/*/services/`

Example: `src/modules/asset/services/asset.service.ts`

```typescript
export async function getAssets(params) {
  // Call Apollo Client
  // Pass GraphQL query
  // Return data
}
```

Services should NOT be imported directly in components. Always use hooks as the abstraction layer.

## Validation Schemas

Using Zod for form validation. Located in `src/modules/*/schemas/`

Example: `src/modules/asset/schemas/asset.schema.ts`

```typescript
export const createAssetSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  // ... more fields
});
```

Usage with React Hook Form:

```typescript
const form = useForm({
  resolver: zodResolver(createAssetSchema),
});
```

## Naming Conventions

| Item      | Format           | Example          |
| --------- | ---------------- | ---------------- |
| Hook      | usePascalCase    | useAssets        |
| Service   | camelCase        | asset.service.ts |
| Schema    | camelCase        | asset.schema.ts  |
| Component | PascalCase       | AssetTable       |
| Store     | camelCase        | auth.store.ts    |
| Type      | PascalCaseDTO    | AssetDTO         |
| Enum      | SCREAMING_SNAKE  | ASSET_STATUS     |

## Next Phase: Feature Development

After this foundation is complete, proceed with:

1. **Navigation System** - Sidebar, routing, layout structure
2. **Authentication** - Login/logout, token management
3. **Dashboard** - Overview and statistics
4. **Feature Modules** - Asset management, loans, transfers, etc.
5. **Advanced UI** - Charts, analytics, reporting

## Troubleshooting

### Apollo Client Not Working

Check:
1. `NEXT_PUBLIC_GRAPHQL_ENDPOINT` is set in `.env.local`
2. Backend GraphQL endpoint is accessible
3. Apollo Provider is in root layout

### Zustand Store Not Updating

Check:
1. Import from `@/store`, not the individual file
2. Use the hook to access state properly
3. Check that store functions are called correctly

### TypeScript Errors

Check:
1. Paths in `tsconfig.json` are correct
2. Import paths use `@/` alias
3. All types are exported from `src/types/`

## Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TanStack Table Documentation](https://tanstack.com/table/v8/docs)
- [Zod Documentation](https://zod.dev)

## License

This project is part of the Asset Management System (AMS) suite.
