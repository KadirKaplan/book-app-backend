export const createBookValidation = {
  type: "object",
  required: [
    "title",
    "author",
    "price",
    "ISBN",
    "language",
    "numberOfPages",
    "publisher",
  ],
  properties: {
    title: {
      type: "string",
    },
    author: {
      type: "string",
    },
    price: {
      type: "number",
      minimum: 0,
    },
    ISBN: {
      type: "string",
      pattern: "^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\\d-]+$",
    },
    language: {
      type: "string",
    },
    numberOfPages: {
      type: "integer",
      minimum: 1,
    },
    publisher: {
      type: "string",
    },
  },
};
export const getOneBookValidation = {
  type: "object",
  properties: {
    book_id: {
      type: "string",
    },
  },
};
export const deleteOneBookValidation = {
  type: "object",
  properties: {
    book_id: {
      type: "string",
    },
  },
};
export const updateBookByIdValidation = {
  type: "object",
  properties: {
    book_id: {
      type: "string",
    },
  },
};
export const updateBook = {
  type: "object",
  required: [
    "title",
    "author",
    "price",
    "ISBN",
    "language",
    "numberOfPages",
    "publisher",
  ],
  properties: {
    title: {
      type: "string",
    },
    author: {
      type: "string",
    },
    price: {
      type: "number",
      minimum: 0,
    },
    ISBN: {
      type: "string",
      pattern: "^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\\d-]+$",
    },
    language: {
      type: "string",
    },
    numberOfPages: {
      type: "integer",
      minimum: 1,
    },
    publisher: {
      type: "string",
    },
  },
};
