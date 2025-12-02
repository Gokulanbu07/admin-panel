// src/services/mockData.js

// --- MOCK PROPERTIES (used by admin + user side) ---
// src/services/mockData.js

export const mockProperties = [
  {
    id: 1,
    title: "Luxury 2BHK Apartment",
    location: "Chennai - Velachery",
    price: "22000/month",
    category: "Family + Rent",
    bedrooms: 2,
    bathrooms: 2,
    size: "1050 sqft",
    images: [
      "https://placehold.co/1200x500/151515/F5F5F5?text=Living+Room",
      "https://placehold.co/1200x500/151515/F5F5F5?text=Bedroom",
      "https://placehold.co/1200x500/151515/F5F5F5?text=Kitchen",
    ],
    highlights: [
      "Fully furnished",
      "Lift + Parking",
      "Metro 650m",
      "24/7 Security",
    ],
    amenities: ["Wi-Fi", "Parking", "Water Heater", "Fridge", "AC", "Power Backup"],
    // 👇 Admin-configured time slots
    timeSlots: [
      "10:00 AM - 11:00 AM",
      "01:00 PM - 02:00 PM",
      "06:00 PM - 07:00 PM",
    ],
  },
  {
    id: 2,
    title: "Modern Studio Apartment",
    location: "Bangalore - Whitefield",
    price: "15000/month",
    category: "Bachelor + Rent",
    bedrooms: 1,
    bathrooms: 1,
    size: "550 sqft",
    images: [
      "https://placehold.co/1200x500/151515/F5F5F5?text=Studio+Room+1",
      "https://placehold.co/1200x500/151515/F5F5F5?text=Studio+Room+2",
      "https://placehold.co/1200x500/151515/F5F5F5?text=Studio+Kitchen",
    ],
    highlights: ["Fully furnished", "Gym Access", "Balcony", "Metro Nearby"],
    amenities: ["AC", "Wi-Fi", "Kitchen Setup", "Geyser"],
    timeSlots: [
      "09:00 AM - 10:00 AM",
      "12:00 PM - 01:00 PM",
      "05:30 PM - 06:30 PM",
    ],
  },
];



// --- MOCK BOOKINGS (for admin / MyVisits later) ---
export const mockBookings = [
  // example:
  // { id: 1, propertyId: 1, userName: "Test User", date: "2025-03-10", time: "16:30", status: "Pending" },
];

// --- MOCK USERS (for admin manage users) ---
export const mockUsers = [
  // example user:
  // { id: 1, name: "Gokul", email: "gokul@example.com", role: "user" },
];

// --- MOCK DASHBOARD STATS ---
export const mockStats = {
  totalUsers: mockUsers.length,
  totalProperties: mockProperties.length,
  totalBookings: mockBookings.length,
};
