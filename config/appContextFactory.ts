import { MongoClient, CreateCollectionOptions, Db, MongoError } from "mongodb";
import { AppContextType, ConfigType } from "../src/types/configTypes";
import bookValidator from "../src/models/Book";
import authorValidator from "../src/models/Author";
const options = {
  keepAlive: true,
  useNewUrlParser: true,
};

export default async (config: ConfigType): Promise<AppContextType> => {
  const mongoDbConnection = await MongoClient.connect(config.db, options);

  const mongoDb = mongoDbConnection.db();

  const bookCollection = await ensureCollection(mongoDb, "books", {
    validator: bookValidator,
  });
  const bookService = await require("../src/services/bookService")({
    bookCollection,
  });

  const authorCollection = await ensureCollection(mongoDb, "authors", {
    validator: authorValidator,
  });
  const authorService = await require("../src/services/authorService")({
    authorCollection,
  });

  return {
    config,
    bookCollection,
    bookService,
    authorCollection,
    authorService,
    mongoDb,
    mongoDbConnection,

    closeConnections: async () => {
      await Promise.all([mongoDbConnection.close()]);
      return;
    },
  };
};
async function ensureCollection(
  db: Db,
  collectionName: string,
  collectionOptions: CreateCollectionOptions
) {
  try {
    return await db.createCollection(collectionName, collectionOptions);
  } catch (err) {
    const typedError = err as MongoError;
    if (typedError.code !== 48) throw err;
    return db.collection(collectionName);
  }
}
