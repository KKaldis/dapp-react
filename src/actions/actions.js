export const SEARCH_CHANGED = "SEARCH_CHANGED";

// ? Redux action
// export const searchChanged = (lookup) => ({
//   type: SEARCH_CHANGED,
//   lookup,
// });

// ? Redux thunk async
export const searchChanged = (lookup) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: SEARCH_CHANGED,
        lookup,
      });
    }, 2000);
  };
};

// ? Redux promise async
// export const searchChanged = (lookup) => ({
//   type: SEARCH_CHANGED,
//   lookup: new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(lookup);
//     }, 2000);
//   }),
// });
