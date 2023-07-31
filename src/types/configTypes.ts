import { Auth, Collection, Db, MongoClient } from "mongodb";

import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Handler,
} from "express";

import { BookService } from "./bookTypes";
import { AuthorService } from "./authorTypes";

export type EnvironmentType = "development";
export interface ConfigType {
  config: EnvironmentType;
  root: string;
  port: 3000;
  db: string;
  accessControlAllowOrigin: string;
}

export interface AppContextType {
  config: ConfigType;
  bookService: BookService;
  bookCollection: Collection;
  authorService: AuthorService;
  authorCollection: Collection;
  mongoDb: Db;
  mongoDbConnection: MongoClient;
  closeConnections: () => Promise<void>;
}
