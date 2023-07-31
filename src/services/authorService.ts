import { ObjectId } from "mongodb";
import {
  AuthorServiceParamsType,
  AuthorData,
  AuthorDataReturn,
  UpdateAuthorParams,
} from "../types/authorTypes";
module.exports = ({ authorCollection }: AuthorServiceParamsType) => {
  return {
    async createAuthor(params: AuthorData) {
      const { name, country, birthday } = params;
      const checkAuthor = await authorCollection.findOne({ name: name });
      if (checkAuthor) {
        return {
          message: "This author already exists.",
          success: false,
        };
      } else {
        const newAuthor = await authorCollection.insertOne({
          name,
          country,
          birthday,
          createdAt: new Date(),
          isDeleted: false,
        });
        return {
          message: "Author creation successful.",
          success: true,
          author: newAuthor,
        };
      }
    },
    async getAuthorList() {
      return await authorCollection
        .aggregate([
          {
            $match: {
              isDeleted: false,
            },
          },
        ])
        .toArray();
    },
    async getOneAuthorById(author_id: ObjectId) {
      return await authorCollection.findOne({ _id: author_id });
    },
    async deleteAuthor(author_id: ObjectId) {
      const author = await authorCollection.findOne({ _id: author_id });
      if (author) {
        const deletedAuthor = await authorCollection.findOneAndUpdate(
          { _id: author_id },
          { $set: { isDeleted: true } },
          {
            returnDocument: "after",
          }
        );
        return {
          deletedAuthor: deletedAuthor.value,
          success: true,
          message: "Author deletion successful.",
        };
      } else {
        return {
          success: false,
          message: "Author not found",
        };
      }
    },
    async updateAuthor(params: UpdateAuthorParams) {
      const { _id, ...rest } = params;

      const author = await authorCollection.findOne({ _id });
      if (author) {
        const updatedAuthor = await authorCollection.findOneAndUpdate(
          { _id },
          {
            $set: {
              name: rest.name,
              country: rest.country,
              birthday: new Date(rest.birthday),
            },
          },
          { returnDocument: "after" }
        );
        return {
          updatedAuthor: updatedAuthor.value,
          message: "Author update successful.",
          success: true,
        };
      } else {
        return {
          message: "Author not found.",
          success: false,
        };
      }
    },
  };
};
