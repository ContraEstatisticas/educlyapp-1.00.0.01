export const PRODUCT_ACCESS_REFRESH_EVENT = "educly:product-access-refresh";

export const dispatchProductAccessRefresh = () => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent(PRODUCT_ACCESS_REFRESH_EVENT));
};
