export const FAVORITES_STORAGE_KEY = "cookie-catalog:favorites:v1";

export function readFavoriteIds(storage = window.localStorage) {
  const serializedFavorites = storage.getItem(FAVORITES_STORAGE_KEY);
  if (serializedFavorites === null) {
    return [];
  }

  const favoriteIds = JSON.parse(serializedFavorites);
  if (
    !Array.isArray(favoriteIds) ||
    favoriteIds.some((id) => typeof id !== "string" || id.length === 0)
  ) {
    throw new Error("Saved favorites must be an array of cookie IDs.");
  }

  return [...new Set(favoriteIds)];
}

export function writeFavoriteIds(favoriteIds, storage = window.localStorage) {
  if (
    !Array.isArray(favoriteIds) ||
    favoriteIds.some((id) => typeof id !== "string" || id.length === 0)
  ) {
    throw new Error("Favorites must be an array of cookie IDs.");
  }

  storage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify([...new Set(favoriteIds)])
  );
}

export function toggleFavoriteId(favoriteIds, cookieId) {
  if (favoriteIds.includes(cookieId)) {
    return favoriteIds.filter((id) => id !== cookieId);
  }

  return [...favoriteIds, cookieId];
}

export function filterFavoriteCookies(cookies, favoriteIds, favoritesOnly) {
  if (!favoritesOnly) {
    return cookies;
  }

  const favorites = new Set(favoriteIds);
  return cookies.filter((cookie) => favorites.has(cookie.id));
}
