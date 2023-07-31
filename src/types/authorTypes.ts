import { Collection, ObjectId, WithId } from "mongodb";

export interface AuthorData {
  name: string;
  country: string;
  birthday: Date;
}
export interface AuthorDataReturn {
  name: string;
  country: string;
  birthday: Date;
  message: string;
  success: boolean;
}
export interface DeletedAuthorData {
  message: "string";
  success: boolean;
}
export interface UpdateAuthorParams {
  _id: ObjectId;
  name: string;
  country: string;
  birthday: Date;
}

export type AuthorIdType = ObjectId;

export interface AuthorService {
  createAuthor: (params: AuthorData) => Promise<WithId<AuthorDataReturn>>;
  getAuthorList: () => Promise<AuthorData[]>;
  getOneAuthorById: (author_id: ObjectId) => Promise<AuthorData>;
  deleteAuthor: (author_id: ObjectId) => Promise<DeletedAuthorData>;
  updateAuthor: (
    params: UpdateAuthorParams
  ) => Promise<WithId<AuthorDataReturn>>;
}
export interface AuthorServiceParamsType {
  authorCollection: Collection;
}
