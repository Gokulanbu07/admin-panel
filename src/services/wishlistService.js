// src/services/wishlistService.js

const WISHLIST_KEY = 'gohome_wishlist';

const readWishlist = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const writeWishlist = (ids) => {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
};

export const getWishlistIds = () => readWishlist();

export const isInWishlist = (propertyId) => {
  const ids = readWishlist();
  return ids.includes(propertyId);
};

export const addToWishlist = (propertyId) => {
  const ids = readWishlist();
  if (!ids.includes(propertyId)) {
    ids.push(propertyId);
    writeWishlist(ids);
  }
};

export const removeFromWishlist = (propertyId) => {
  const ids = readWishlist().filter((id) => id !== propertyId);
  writeWishlist(ids);
};

export const toggleWishlist = (propertyId) => {
  if (isInWishlist(propertyId)) {
    removeFromWishlist(propertyId);
    return false;
  } else {
    addToWishlist(propertyId);
    return true;
  }
};
