import { Collection, ObjectId, WithId } from "mongodb";

export interface BookData {
  title: string;
  author: string;
  price: number;
  ISBN: string;
  language: string;
  numberOfPages: number;
  publisher: string;
  success: boolean;
  message: string;
}
export interface DeletedBookData {
  message: "string";
  success: boolean;
}
export interface UpdateBookParams {
  _id: ObjectId;
  title: string;
  author: string;
  price: number;
  ISBN: string;
  language: string;
  numberOfPages: number;
  publisher: string;
}

export type BookIdType = ObjectId;

export interface BookService {
  createBook: (params: BookData) => Promise<WithId<BookData>>;
  getBookList: () => Promise<BookData[]>;
  getOneBookById: (book_id: ObjectId) => Promise<BookData>;
  deleteBook: (book_id: ObjectId) => Promise<DeletedBookData>;
  updateBook: (params: UpdateBookParams) => Promise<WithId<BookData>>;
}
export interface BookServiceParamsType {
  bookCollection: Collection;
}
