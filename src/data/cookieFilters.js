export function getCookieFilterOptions(cookies) {
  return {
    years: [...new Set(cookies.flatMap((cookie) => cookie.year ?? []))].sort(
      (a, b) => b - a
    ),
    allergies: [
      ...new Set(cookies.flatMap((cookie) => cookie.allergies ?? [])),
    ].sort((a, b) => a.localeCompare(b)),
    flavors: [
      ...new Set(cookies.flatMap((cookie) => cookie.flavor ?? [])),
    ].sort((a, b) => a.localeCompare(b)),
  };
}
