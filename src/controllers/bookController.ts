"use-strict";
import express, { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { bodyValidatorMw, paramsValidatorMw } from "../middleware/validatorMw";
import { AppContextType } from "../types/configTypes";

import {
  createBookValidation,
  deleteOneBookValidation,
  getOneBookValidation,
  updateBook,
  updateBookByIdValidation,
} from "../validations/bookValidation";

module.exports = (appContext: AppContextType) => {
  const { bookService } = appContext;
  const router = express.Router();

  router.post(
    "/",
    bodyValidatorMw(createBookValidation),
    async (req: any, res: Response, _next: NextFunction) => {
      try {
        const {
          title,
          author,
          price,
          ISBN,
          language,
          numberOfPages,
          publisher,
        } = req.body;
        const response = await bookService.createBook(req.body);
        if (response.success) {
          res.status(200).send(response);
        } else {
          res.status(400).send(response);
        }
      } catch (err) {
        console.log(err);
        _next({ success: false, message: (err as Error).message });
      }
    }
  );
  router.get("/list", async (req: any, res: Response, _next: NextFunction) => {
    try {
      const response = await bookService.getBookList();
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      _next({ success: false, message: (err as Error).message });
    }
  });
  router.get(
    "/:_id",
    paramsValidatorMw(getOneBookValidation),
    async (req: any, res: Response, _next: NextFunction) => {
      try {
        const response = await bookService.getOneBookById(
          new ObjectId(req.params._id)
        );
        res.status(200).send(response);
      } catch (err) {
        console.log(err);
        _next({ success: false, message: (err as Error).message });
      }
    }
  );
  router.post(
    "/delete/:_id",
    paramsValidatorMw(deleteOneBookValidation),
    async (req: any, res: Response, _next: NextFunction) => {
      try {
        const response = await bookService.deleteBook(
          new ObjectId(req.params._id)
        );
        if (response.success) {
          res.status(200).send(response);
        } else {
          res.status(400).send(response);
        }
        res.status(200).send(response);
      } catch (err) {
        console.log(err);
        _next({ success: false, message: (err as Error).message });
      }
    }
  );
  router.post(
    "/update/:_id",
    paramsValidatorMw(updateBookByIdValidation),
    bodyValidatorMw(updateBook),
    async (req: any, res: Response, _next: NextFunction) => {
      try {
        const response = await bookService.updateBook({
          _id: new ObjectId(req.params._id),
          ...req.body,
        });
        if (response.success) {
          res.status(200).send(response);
        } else {
          res.status(400).send(response);
        }
      } catch (err) {
        console.log(err);
        _next({ success: false, message: (err as Error).message });
      }
    }
  );

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
