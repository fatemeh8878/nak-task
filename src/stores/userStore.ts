import { create } from "zustand";
import type { User } from "../features/auth/types/auth.types";

interface UserManagementState {
  users: User[];
  selectedUsers: string[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filterRole: "all" | "admin" | "user";
  sortBy: "name" | "email" | "createdAt" | "role";
  sortOrder: "asc" | "desc";
  currentPage: number;
  itemsPerPage: number;
}

interface UserManagementActions {
  // Data management
  fetchUsers: () => Promise<void>;
  addUser: (
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateUser: (id: string, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  deleteSelectedUsers: () => Promise<void>;

  // Selection management
  selectUser: (id: string) => void;
  selectAllUsers: () => void;
  clearSelection: () => void;
  toggleUserSelection: (id: string) => void;

  // Filtering and sorting
  setSearchQuery: (query: string) => void;
  setFilterRole: (role: "all" | "admin" | "user") => void;
  setSorting: (
    sortBy: "name" | "email" | "createdAt" | "role",
    sortOrder: "asc" | "desc"
  ) => void;

  // Pagination
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;

  // Utility
  clearError: () => void;

  // Computed values
  getFilteredUsers: () => User[];
  getPaginatedUsers: () => User[];
  getTotalPages: () => number;
}

type UserManagementStore = UserManagementState & UserManagementActions;

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    createdAt: "2024-01-20T14:45:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "4",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
    createdAt: "2024-02-01T09:15:00Z",
    updatedAt: "2024-02-01T09:15:00Z",
  },
  {
    id: "5",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "admin",
    createdAt: "2024-02-05T16:20:00Z",
    updatedAt: "2024-02-05T16:20:00Z",
  },
];

export const useUserStore = create<UserManagementStore>((set, get) => ({
  // Initial state
  users: [],
  selectedUsers: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  filterRole: "all",
  sortBy: "createdAt",
  sortOrder: "desc",
  currentPage: 1,
  itemsPerPage: 10,

  // Actions
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ users: mockUsers, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch users",
        isLoading: false,
      });
    }
  },

  addUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set((state) => ({
        users: [...state.users, newUser],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add user",
        isLoading: false,
      });
    }
  },

  updateUser: async (id, userData) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set((state) => ({
        users: state.users.map((user) =>
          user.id === id
            ? { ...user, ...userData, updatedAt: new Date().toISOString() }
            : user
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update user",
        isLoading: false,
      });
    }
  },

  deleteUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        selectedUsers: state.selectedUsers.filter((userId) => userId !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete user",
        isLoading: false,
      });
    }
  },

  deleteSelectedUsers: async () => {
    const { selectedUsers, deleteUser } = get();

    for (const userId of selectedUsers) {
      await deleteUser(userId);
    }
  },

  selectUser: (id) => {
    set((state) => ({
      selectedUsers: [...state.selectedUsers, id],
    }));
  },

  selectAllUsers: () => {
    const { getFilteredUsers } = get();
    const filteredUsers = getFilteredUsers();

    set({
      selectedUsers: filteredUsers.map((user) => user.id),
    });
  },

  clearSelection: () => {
    set({ selectedUsers: [] });
  },

  toggleUserSelection: (id) => {
    set((state) => ({
      selectedUsers: state.selectedUsers.includes(id)
        ? state.selectedUsers.filter((userId) => userId !== id)
        : [...state.selectedUsers, id],
    }));
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
  },

  setFilterRole: (role) => {
    set({ filterRole: role, currentPage: 1 });
  },

  setSorting: (sortBy, sortOrder) => {
    set({ sortBy, sortOrder });
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  setItemsPerPage: (items) => {
    set({ itemsPerPage: items, currentPage: 1 });
  },

  clearError: () => {
    set({ error: null });
  },

  // Computed values
  getFilteredUsers: () => {
    const { users, searchQuery, filterRole, sortBy, sortOrder } = get();

    let filtered = users;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    // Apply role filter
    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.role === filterRole);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "email":
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case "role":
          aValue = a.role;
          bValue = b.role;
          break;
        case "createdAt":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  },

  getPaginatedUsers: () => {
    const { currentPage, itemsPerPage, getFilteredUsers } = get();
    const filteredUsers = getFilteredUsers();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredUsers.slice(startIndex, endIndex);
  },

  getTotalPages: () => {
    const { itemsPerPage, getFilteredUsers } = get();
    const filteredUsers = getFilteredUsers();

    return Math.ceil(filteredUsers.length / itemsPerPage);
  },
}));
