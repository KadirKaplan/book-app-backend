import { ObjectId } from "mongodb";
import {
  BookServiceParamsType,
  BookData,
  UpdateBookParams,
} from "../types/bookTypes";
module.exports = ({ bookCollection }: BookServiceParamsType) => {
  return {
    async createBook(params: BookData) {
      const { title, author, price, ISBN, language, numberOfPages, publisher } =
        params;
      const checkBook = await bookCollection.findOne({ ISBN });
      if (checkBook) {
        return {
          message: "This book already exists.",
          success: false,
        };
      } else {
        const newBook = await bookCollection.insertOne({
          title,
          author: new ObjectId(author),
          price,
          ISBN,
          language,
          numberOfPages,
          publisher,
          createdAt: new Date(),
          isDeleted: false,
        });
        return {
          message: "Book creation successful.",
          success: true,
          book: newBook,
        };
      }
    },
    async getBookList() {
      return await bookCollection
        .aggregate([
          {
            $match: {
              isDeleted: false,
            },
          },
        ])
        .toArray();
    },
    async getOneBookById(book_id: ObjectId) {
      return await bookCollection.findOne({ _id: book_id });
    },
    async deleteBook(book_id: ObjectId) {
      const book = await bookCollection.findOne({ _id: book_id });
      if (book) {
        const deletedBook = await bookCollection.findOneAndUpdate(
          { _id: book_id },
          { $set: { isDeleted: true } },
          {
            returnDocument: "after",
          }
        );
        return {
          deletedBook: deletedBook.value,
          success: true,
          message: "Book deletion successful.",
        };
      } else {
        return {
          success: false,
          message: "Book not found",
        };
      }
    },
    async updateBook(params: UpdateBookParams) {
      const { _id, ...rest } = params;

      const book = await bookCollection.findOne({ _id });
      if (book) {
        const updatedBook = await bookCollection.findOneAndUpdate(
          { _id },
          {
            $set: {
              title: rest.title,
              author: new ObjectId(rest.author),
              price: rest.price,
              ISBN: rest.ISBN,
              language: rest.language,
              numberOfPages: rest.numberOfPages,
              publisher: rest.publisher,
            },
          },
          { returnDocument: "after" }
        );
        return {
          updatedBook: updatedBook.value,
          message: "Book update successful.",
          success: true,
        };
      } else {
        return {
          message: "Book not found.",
          success: false,
        };
      }
    },
  };
};
