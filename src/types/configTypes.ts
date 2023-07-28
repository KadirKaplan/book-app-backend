import { Collection, Db, MongoClient } from "mongodb";
import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Handler,
} from "express";

import { BookService } from "./bookTypes";

export type EnvironmentType = "development" | "production";
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
  mongoDb: Db;
  mongoDbConnection: MongoClient;
  closeConnections: () => Promise<void>;
}
