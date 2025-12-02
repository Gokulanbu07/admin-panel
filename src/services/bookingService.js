// src/services/bookingService.js

const BOOKINGS_KEY = "gohome_bookings";

const readBookings = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const writeBookings = (items) => {
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};

export const getBookings = () => readBookings();

export const addBooking = (booking) => {
  const all = readBookings();
  const newBooking = {
    id: Date.now(),
    status: "Pending",
    createdAt: new Date().toISOString(),
    ...booking,
  };
  all.push(newBooking);
  writeBookings(all);
  return newBooking;
};

export const cancelBooking = (id) => {
  const all = readBookings().filter((b) => b.id !== id);
  writeBookings(all);
};
