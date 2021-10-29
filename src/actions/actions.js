export const SEARCH_CHANGED = "SEARCH_CHANGED";


export const searchChanged = (lookup) => ({
  type: SEARCH_CHANGED,
  lookup,
});
