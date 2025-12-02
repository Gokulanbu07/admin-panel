// src/services/api.js
import {
  mockUsers,
  mockProperties,
  mockBookings,
  mockStats,
} from "./mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // --- DASHBOARD ---
  fetchDashboardStats: async () => {
    await delay(500);
    return mockStats;
  },

  // --- USERS ---
  fetchUsers: async () => {
    await delay(600);
    return { success: true, users: mockUsers };
  },

  deleteUser: async (id) => {
    await delay(300);
    console.log("Deleted user:", id);
    return { success: true, message: "User deleted successfully" };
  },

  updateUserRole: async (id, newRole) => {
    await delay(300);
    console.log(`Updated user ${id} to ${newRole}`);
    return { success: true, message: "Role updated successfully" };
  },

  // --- PROPERTIES ---
  fetchProperties: async () => {
    await delay(700);
    return {
      success: true,
      properties: mockProperties,
      total: mockProperties.length,
    };
  },

  deleteProperty: async (id) => {
    await delay(400);
    return { success: true, message: "Property moved to archive." };
  },

  // --- BOOKINGS ---
  fetchBookings: async () => {
    await delay(500);
    return { success: true, bookings: mockBookings };
  },

  updateBookingStatus: async (bookingId, newStatus) => {
    await delay(300);
    console.log(`Updated booking ${bookingId} to status: ${newStatus}`);
    return {
      success: true,
      message: "Booking status updated successfully.",
    };
  },
};
