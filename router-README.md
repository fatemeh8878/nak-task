# React Router Integration with i18n

This project now includes React Router DOM integration with full internationalization support.

## Features

- ✅ React Router DOM v6 with nested routing
- ✅ Multi-language support (English & Persian)
- ✅ RTL (Right-to-Left) support for Persian
- ✅ Language switcher component
- ✅ Navigation with active link highlighting
- ✅ Responsive layout with header, navigation, and footer
- ✅ Sample pages demonstrating i18n integration

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx              # Main layout component
│   ├── Navigation.tsx          # Navigation component with router links
│   └── LanguageSwitcher.tsx    # Language switching component
├── pages/
│   ├── Home.tsx               # Home page
│   ├── About.tsx              # About page
│   ├── Contact.tsx            # Contact page with form
│   └── Settings.tsx           # Settings page
├── hooks/
│   └── useTranslation.ts      # Custom translation hook
├── i18n/
│   ├── index.ts               # i18n configuration
│   └── locales/
│       ├── en.json            # English translations
│       └── fa.json            # Persian translations
└── App.tsx                    # Main app with routing
```

## Routing Structure

```
/ (Layout)
├── / (Home - index route)
├── /about (About)
├── /contact (Contact)
└── /settings (Settings)
```

## Usage Examples

### Navigation Component

The navigation automatically adapts to RTL/LTR based on the current language:

```tsx
import Navigation from "./components/Navigation";

// Automatically shows active links and adapts to RTL
<Navigation />;
```

### Page Components

Each page uses the translation hook for internationalization:

```tsx
import React from "react";
import { useTranslation } from "../hooks/useTranslation";

const MyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("pages.myPage.title")}</h1>
      <p>{t("pages.myPage.description")}</p>
    </div>
  );
};
```

### Layout Component

The layout provides consistent structure across all pages:

```tsx
import Layout from "./components/Layout";

// Layout includes:
// - Header with language switcher
// - Navigation menu
// - Main content area (Outlet)
// - Footer
```

## Available Routes

| Route       | Component | Description                          |
| ----------- | --------- | ------------------------------------ |
| `/`         | Home      | Main landing page                    |
| `/about`    | About     | Information about the application    |
| `/contact`  | Contact   | Contact form and information         |
| `/settings` | Settings  | Application settings and preferences |

## Translation Keys

### Page-specific translations

```json
{
  "pages": {
    "home": {
      "title": "Home Page",
      "description": "This is the home page of our application"
    },
    "about": {
      "title": "About Us",
      "description": "Learn more about our company and mission"
    },
    "contact": {
      "title": "Contact Us",
      "description": "Get in touch with our team",
      "formTitle": "Contact Form"
    },
    "settings": {
      "title": "Settings",
      "description": "Configure your application preferences",
      "languageSettings": "Language Settings",
      "currentLanguage": "Current language",
      "otherSettings": "Other Settings",
      "notifications": "Enable notifications",
      "darkMode": "Dark mode",
      "autoSave": "Auto-save"
    }
  }
}
```

## Adding New Routes

1. Create a new page component in `src/pages/`
2. Add the route to `App.tsx`
3. Add navigation link to `Navigation.tsx`
4. Add translations to both language files

Example:

```tsx
// src/pages/Products.tsx
import React from "react";
import { useTranslation } from "../hooks/useTranslation";

const Products: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("pages.products.title")}</h1>
      <p>{t("pages.products.description")}</p>
    </div>
  );
};

export default Products;
```

```tsx
// src/App.tsx - Add route
<Route path="products" element={<Products />} />
```

```tsx
// src/components/Navigation.tsx - Add nav item
{ path: "/products", key: "navigation.products" },
```

```json
// src/i18n/locales/en.json - Add translations
{
  "navigation": {
    "products": "Products"
  },
  "pages": {
    "products": {
      "title": "Our Products",
      "description": "Browse our product catalog"
    }
  }
}
```

## RTL Support

The layout automatically switches to RTL mode for Persian:

- Text direction changes to right-to-left
- Font family switches to Tahoma for better Persian support
- Navigation items reverse order
- Form layouts adapt to RTL

## Language Persistence

- Language preference is saved in localStorage
- Language persists across page refreshes and navigation
- Browser language detection on first visit

## Development

Run the development server to see the application:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` with:

- Full routing functionality
- Language switching
- RTL support
- Responsive design

## Browser Support

- Modern browsers with ES6+ support
- React Router DOM v6 features
- CSS Grid and Flexbox for layout
- Local Storage for language persistence
