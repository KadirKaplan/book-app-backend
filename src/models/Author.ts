const authorValidator = {
  $jsonSchema: {
    bsonType: "object",
    properties: {
      name: {
        bsonType: "string",
      },
      country: {
        bsonType: "string",
      },
      birthday: {
        bsonType: "date",
      },
    },
  },
};

export default authorValidator;
