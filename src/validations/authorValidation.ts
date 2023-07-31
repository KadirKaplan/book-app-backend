export const createAuthorValidation = {
  type: "object",
  required: ["name", "country", "birthday"],
  properties: {
    name: {
      type: "string",
    },
    country: {
      type: "string",
    },
    birthday: {
      type: "string",
      format: "date",
    },
  },
};
export const getOneAuthorValidation = {
  type: "object",
  properties: {
    author_id: {
      type: "string",
    },
  },
};
export const deleteOneAuthorValidation = {
  type: "object",
  properties: {
    author_id: {
      type: "string",
    },
  },
};
export const updateAuthorByIdValidation = {
  type: "object",
  properties: {
    author_id: {
      type: "string",
    },
  },
};
export const updateAuthor = {
  type: "object",

  properties: {
    name: {
      type: "string",
    },
    country: {
      type: "string",
    },
    birthday: {
      type: "string",
    },
  },
};
