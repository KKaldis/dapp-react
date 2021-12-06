import { SEARCH_CHANGED } from "../actions/actions";

// ? Redux & Redux thunk async
export const lookup = (
  state = [
    {
      type: "boolean",
      name: "bool",
      title: "Please answer the question",
      label: "Are you 21 or older?",
      isRequired: true,
    },
  ],

  action
) => {
  switch (action.type) {
    case SEARCH_CHANGED:
      return { ...state, [action.input]: action.value };

    default:
      return state;
  }
};

// ? Redux promise async
// export const lookup = (state = "", action) => {
//   switch (action.type) {
//     case SEARCH_CHANGED:
//       return action.lookup;
//     case SEARCH_CHANGED_FULFILED:
//       return action.lookup;

//     default:
//       return state;
//   }
// };

const reducer = (state = {}, action) => ({
  lookup: lookup(state.lookup, action),
});

export default reducer;
