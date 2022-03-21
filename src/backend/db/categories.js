import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Thriller",
    description: "",
  },
  {
    _id: uuid(),
    categoryName: "Drama",
    description: "",
  },
  {
    _id: uuid(),
    categoryName: "Scifi",
    description: "",
  },
  {
    _id: uuid(),
    categoryName: "Romance",
    description: "",
  },
];
