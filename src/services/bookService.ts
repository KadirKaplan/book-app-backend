import { ObjectId } from "mongodb";
import { BookServiceParamsType } from "../types/bookTypes";

module.exports = ({ bookCollection }: BookServiceParamsType) => {
  return {
    async createBook(params: any) {
      const { rater, rated, timeZone } = params;
    },
  };
};
