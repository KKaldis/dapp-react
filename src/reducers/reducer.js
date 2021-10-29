import { SEARCH_CHANGED } from "../actions/actions";

export const lookup = (state = "", action) => {
  switch (action.type) {
    case SEARCH_CHANGED:
      return action.lookup;
   
    default:
      return state;
  }
};

const reducer = (state = {}, action) => ({
  lookup: lookup(state.lookup, action),
});

export default reducer;
