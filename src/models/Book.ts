const bookValidator = {
  $jsonSchema: {
    bsonType: "object",
    properties: {
      title: {
        bsonType: "string",
      },
      author: {
        bsonType: "objectId",
      },
      price: {
        bsonType: "number",
      },
      ISBN: {
        bsonType: "string",
      },
      language: {
        bsonType: "string",
      },
      numberOfPages: {
        bsonType: "number",
        minimum: 1,
      },
      publisher: {
        bsonType: "string",
      },
    },
  },
};

export default bookValidator;
