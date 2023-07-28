import { Collection, ObjectId, WithId } from "mongodb";

export interface BookData {
  name: string;
  author: string;
}

export type BookIdType = ObjectId;

export interface BookService {
  createBook: (params: BookData) => Promise<WithId<BookData>>;
}
export interface BookServiceParamsType {
  bookCollection: Collection;
}
