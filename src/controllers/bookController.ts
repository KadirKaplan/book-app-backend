"use-strict";
import express, { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
//import { bodyValidatorMw, paramsValidatorMw } from "../middleware/validatorMw";
import { AppContextType } from "../types/configTypes";

// import {
// 	askCanScoreBodyValidation,
// 	sendScoreBodyValidation,
// 	sendScoreParamsValidation
// } from "./validations/scoreValidation";

module.exports = (appContext: AppContextType) => {
  const { bookService } = appContext;
  const router = express.Router();

  router.get("/book", async (req: any, res: Response, _next: NextFunction) => {
    try {
      res.status(200).send("kadirkaplan");
    } catch (err) {
      console.log("err", err);
      _next({ success: false, message: (err as Error).message });
    }
  });

  router.use(
    (err: any, req: Request, response: Response, next: NextFunction) => {
      if (err.success === false) {
        response.status(400).send(err);
      } else {
        response.status(400).send({ success: false, message: err });
      }
    }
  );
  return router;
};
