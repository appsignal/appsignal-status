export const formatRegion = (region) => {
  return region
    .split(/-| /)
    .map((region) => region.charAt(0).toUpperCase() + region.slice(1))
    .join(" ");
};
