# Admin Panel - Admin Dashboard

یک admin panel کامل با React, TypeScript, Zustand و Emotion.js

## ویژگی‌ها

### 🔐 Authentication
- **Login Page**: صفحه ورود با validation
- **Signup Page**: صفحه ثبت نام
- **Protected Routes**: محافظت از routes با authentication
- **Demo Credentials**: 
  - Email: `admin@example.com`
  - Password: `password`

### 📊 Dashboard
- **Overview**: آمار کلی سیستم
- **Activity Feed**: فعالیت‌های اخیر
- **Quick Actions**: دسترسی سریع به بخش‌های مختلف

### 👥 User Management
- **User List**: لیست کاربران با pagination
- **Search & Filter**: جستجو و فیلتر بر اساس نقش
- **Sorting**: مرتب‌سازی بر اساس نام، ایمیل، تاریخ
- **Bulk Actions**: انتخاب چندگانه کاربران

### ⚙️ Settings
- **General Settings**: تنظیمات عمومی
- **System Settings**: تنظیمات سیستم
- **Security Settings**: تنظیمات امنیتی

### 📈 Analytics
- **Statistics**: آمار و ارقام
- **Charts**: نمودارهای مختلف (placeholder)
- **Activity Log**: گزارش فعالیت‌ها

## تکنولوژی‌ها

### Frontend
- **React 18**: Framework اصلی
- **TypeScript**: Type safety
- **React Router**: Navigation
- **Zustand**: State management
- **Emotion.js**: CSS-in-JS styling
- **React Hook Form**: Form handling

### UI Components
- **Button**: دکمه‌های مختلف با variants
- **Input**: فیلدهای ورودی با validation
- **Card**: کارت‌های محتوا
- **ProtectedRoute**: محافظت از routes

### Styling
- **Design System**: سیستم طراحی منسجم
- **Theme**: رنگ‌ها، فونت‌ها، spacing
- **Responsive**: طراحی responsive (حذف شده طبق درخواست)

## ساختار پروژه

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   ├── layout/
│   │   ├── AdminLayout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       └── index.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   ├── Settings.tsx
│   ├── Analytics.tsx
│   ├── Login.tsx
│   └── Signup.tsx
├── stores/
│   ├── authStore.ts
│   └── userStore.ts
├── styles/
│   ├── theme.ts
│   └── GlobalStyles.tsx
├── features/
│   └── auth/
│       └── types/
│           └── auth.types.ts
├── services/
│   └── authService.ts
└── routes/
    └── Routes.tsx
```

## راه‌اندازی

### نصب dependencies
```bash
yarn install
```

### اجرای پروژه
```bash
yarn dev
```

### Build کردن
```bash
yarn build
```

## نحوه استفاده

### 1. ورود به سیستم
- به `/login` بروید
- از demo credentials استفاده کنید:
  - Email: `admin@example.com`
  - Password: `password`

### 2. Dashboard
- پس از ورود، به dashboard هدایت می‌شوید
- آمار کلی سیستم را مشاهده کنید
- از quick actions استفاده کنید

### 3. مدیریت کاربران
- از sidebar به "Users" بروید
- کاربران را جستجو و فیلتر کنید
- کاربران را انتخاب و عملیات bulk انجام دهید

### 4. تنظیمات
- از sidebar به "Settings" بروید
- تنظیمات مختلف را تغییر دهید

### 5. Analytics
- از sidebar به "Analytics" بروید
- آمار و گزارش‌ها را مشاهده کنید

## State Management

### Auth Store (Zustand)
```typescript
const { user, isAuthenticated, login, logout } = useAuthStore();
```

### User Store (Zustand)
```typescript
const { 
  users, 
  selectedUsers, 
  fetchUsers, 
  deleteUser,
  setSearchQuery,
  setFilterRole 
} = useUserStore();
```

## Styling System

### Theme
```typescript
import { theme } from '../styles/theme';

// استفاده از رنگ‌ها
color: theme.colors.primary[600]

// استفاده از spacing
padding: theme.spacing.lg

// استفاده از typography
fontSize: theme.typography.fontSize.xl
```

### Emotion.js
```typescript
import { css } from '@emotion/react';

const styles = css`
  color: ${theme.colors.primary[600]};
  padding: ${theme.spacing.md};
`;
```

## Customization

### تغییر رنگ‌ها
فایل `src/styles/theme.ts` را ویرایش کنید

### اضافه کردن صفحات جدید
1. صفحه جدید در `src/pages/` بسازید
2. Route جدید در `src/routes/Routes.tsx` اضافه کنید
3. Navigation item در `src/components/layout/Sidebar.tsx` اضافه کنید

### اضافه کردن UI Components
1. کامپوننت جدید در `src/components/ui/` بسازید
2. از `src/components/ui/index.ts` export کنید

## نکات مهم

- **No Responsive Design**: طبق درخواست، responsive design حذف شده
- **Mock Data**: تمام داده‌ها mock هستند و باید با API واقعی جایگزین شوند
- **Authentication**: سیستم authentication ساده است و باید با backend واقعی پیاده‌سازی شود
- **Error Handling**: error handling پایه پیاده‌سازی شده
- **Loading States**: loading states برای عملیات async پیاده‌سازی شده

## توسعه آینده

- [ ] اضافه کردن API integration
- [ ] پیاده‌سازی real authentication
- [ ] اضافه کردن charts واقعی
- [ ] اضافه کردن notifications
- [ ] اضافه کردن file upload
- [ ] اضافه کردن export/import functionality
