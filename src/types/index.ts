// Re-export all types from API for convenience
export * from "../api/types";

// Additional application-specific types can be added here
export interface AppConfig {
  apiUrl: string;
  appName: string;
  version: string;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon?: React.ComponentType;
  active?: boolean;
}

export interface TableColumn<T = unknown> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, item: T) => React.ReactNode;
}

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "multiselect"
    | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string | number }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    message?: string;
  };
}

