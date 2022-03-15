import { createContext, useContext, useReducer } from "react";
import productsArray from "./productsArray.js";

const FilterContext = createContext();

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "Low to High":
//       return {
//         ...state,
//         items: state.items.sort((a, b) => a.bookPrice - b.bookPrice),
//       };
//     case "High to Low":
//       return {
//         ...state,
//         items: state.items.sort((a, b) => b.bookPrice - a.bookPrice),
//       };
//     case "Price filter":
//       state.items.map((item) => {
//         item.bookPrice > action.payload
//           ? (item.show = false)
//           : (item.show = true);

//         return true;
//       });
//       return {
//         ...state,
//         items: state.items,
//       };
//     case "Rating filter":
//       state.items.map((item) => {
//         item.bookRating < action.payload
//           ? (item.show = false)
//           : (item.show = true);
//         return true;
//       });
//       return {
//         ...state,
//         items: state.items,
//       };
//     case "Category filter":
//       // NOTE THAT 'show' is a property in every book object that I am using to maintain show/hide of books on
//       // applying filters. I am not filtering the array, instead just showing or hiding.

//       // categoryFiltersFlag is a flag that I am maintaining in the state to check whether this is the first time
//       // the filter is being applied or not. The reason why I am maintaining this flag is, if it is the
//       // first time that the filter is being applied, then I just want to show the categories that are selected and
//       // hide the rest. If it's not the first time, I am just showing whatever category is selected and not hiding anything.
//       // This is to prevent the hiding of the previously selected category if I select a second category.
//       if (state.categoryFiltersFlag === false) {
//         // handling the scenario of the user applying the filter for the first time.
//         state.items.map((item) => {
//           item.bookCategory === action.payload.id
//             ? (item.show = true)
//             : (item.show = false);
//           return true;
//         });
//         // notice that the flag is set to true as soon as a user checks any category checkbox.
//         return { items: state.items, categoryFiltersFlag: true };
//       } else {
//         // handling the subsequent checks and unchecks here.
//         if (action.payload.checked) {
//           // handling a subsequent check with the help of the checked property.
//           state.items.map((item) => {
//             if (item.bookCategory === action.payload.id) {
//               item.show = true;
//             }
//             return true;
//           });
//           return {
//             items: state.items,
//             categoryFiltersFlag: true,
//           };
//         } else {
//           // handling a subsequent uncheck.

//           // this reducer is to check the no of items shown after every uncheck.

//           const itemShowCount = state.items.reduce(
//             (accumulator, currentValue) => {
//               if (currentValue.show === true) accumulator += 1;
//               return accumulator;
//             },
//             0
//           );

//           // if the no of items shown is 0 after an uncheck, it means that the user has
//           // not selected any category. I am mapping through the array and assigning the show
//           // attribute to true for every item since we don't want to see a blank page.

//           if (itemShowCount === 0) {
//             state.items.map((item) => (item.show = true));
//             // notice that the flag is set to false as soon as a user has unchecked all category checkboxes.
//             return {
//               items: state.items,
//               categoryFiltersFlag: false,
//             };

//             // if the no of items shown is not 0 after an uncheck, I am just hiding whatever category is unchecked.
//           } else {
//             state.items.map((item) => {
//               if (item.bookCategory === action.payload.id) item.show = false;
//               return true;
//             });
//             return {
//               items: state.items,
//               categoryFiltersFlag: true,
//             };
//           }
//         }
//       }
//     default:
//       return state;
//   }
// };

const reducer = (state, action) => {
  switch (action.type) {
    case "Low to High":
      return {
        ...state,
        items: state.items.sort((a, b) => a.bookPrice - b.bookPrice),
      };
    case "High to Low":
      return {
        ...state,
        items: state.items.sort((a, b) => b.bookPrice - a.bookPrice),
      };
    case "Price filter":
      state.items.map((item) => {
        item.bookPrice > action.payload
          ? (item.show = false)
          : (item.show = true);

        return true;
      });
      return {
        ...state,
        items: state.items,
      };
    case "Rating filter":
      state.items.map((item) => {
        item.bookRating < action.payload
          ? (item.show = false)
          : (item.show = true);
        return true;
      });
      return {
        ...state,
        items: state.items,
      };
    case "Category filter":
      // NOTE THAT 'show' is a property in every book object that I am using to maintain show/hide of books on
      // applying filters. I am not filtering the array, instead just showing or hiding.

      // categoryFiltersFlag is a flag that I am maintaining in the state to check whether this is the first time
      // the filter is being applied or not. The reason why I am maintaining this flag is, if it is the
      // first time that the filter is being applied, then I just want to show the categories that are selected and
      // hide the rest. If it's not the first time, I am just showing whatever category is selected and not hiding anything.
      // This is to prevent the hiding of the previously selected category if I select a second category.
      if (state.categoryFiltersFlag === false) {
        // handling the scenario of the user applying the filter for the first time.
        state.items.map((item) => {
          item.bookCategory === action.payload.id
            ? (item.show = true)
            : (item.show = false);
          return true;
        });
        // notice that the flag is set to true as soon as a user checks any category checkbox.
        return {
          items: state.items,
          categoryFiltersFlag: true,
          checkedCount: state.checkedCount + 1,
        };
      } else {
        // handling the subsequent checks and unchecks here.
        if (action.payload.checked) {
          // handling a subsequent check with the help of the checked property.
          state.items.map((item) => {
            if (item.bookCategory === action.payload.id) {
              item.show = true;
            }
            return true;
          });
          return {
            items: state.items,
            categoryFiltersFlag: true,
            checkedCount: state.checkedCount + 1,
          };
        } else {
          // handling a subsequent uncheck.

          // this reducer is to check the no of items shown after every uncheck.

          // const itemShowCount = state.items.reduce(
          //   (accumulator, currentValue) => {
          //     if (currentValue.show === true) accumulator += 1;
          //     return accumulator;
          //   },
          //   0
          // );

          // if the no of items shown is 0 after an uncheck, it means that the user has
          // not selected any category. I am mapping through the array and assigning the show
          // attribute to true for every item since we don't want to see a blank page.

          if (state.checkedCount === 1) {
            state.items.map((item) => (item.show = true));
            // notice that the flag is set to false as soon as a user has unchecked all category checkboxes.
            return {
              items: state.items,
              categoryFiltersFlag: false,
              checkedCount: state.checkedCount - 1,
            };

            // if the no of items shown is not 0 after an uncheck, I am just hiding whatever category is unchecked.
          } else {
            state.items.map((item) => {
              if (item.bookCategory === action.payload.id) item.show = false;
              return true;
            });
            return {
              items: state.items,
              categoryFiltersFlag: true,
              checkedCount: state.checkedCount - 1,
            };
          }
        }
      }
    default:
      return state;
  }
};

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    items: productsArray,
    categoryFiltersFlag: false,
    checkedCount: 0,
  });
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
