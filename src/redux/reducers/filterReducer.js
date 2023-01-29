import { TOGGLE_BRAND, TOGGLE_STOCK } from "../actionTypes/actionTypes";

const initaialState = {
  filters: {
    brand: [],
    stock: false,
  },
  search: "",
};

export const filterReducer = (state = initaialState, action) => {
  switch (action.type) {
    case TOGGLE_BRAND:
      if (!state.filters.brand.includes(action.payload)) {
        return {
          ...state,
          filters: {
            ...state.filters,
            brand: [...state.filters.brand, action.payload],
          },
        };
      } else {
        return {
          ...state,
          filters: {
            ...state.filters,
            brand: state.filters.brand.filter(
              (brand) => brand !== action.payload
            ),
          },
        };
      }
    case TOGGLE_STOCK:
      return {
        ...state,
        filters: { ...state.filters, stock: !state.filters.stock },
      };

    default: {
      return state;
    }
  }
};
