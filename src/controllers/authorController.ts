"use-strict";
import express, { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { bodyValidatorMw, paramsValidatorMw } from "../middleware/validatorMw";
import { AppContextType } from "../types/configTypes";

import {
  createAuthorValidation,
  deleteOneAuthorValidation,
  getOneAuthorValidation,
  updateAuthor,
  updateAuthorByIdValidation,
} from "../validations/authorValidation";

export default (appContext: AppContextType) => {
  const { authorService } = appContext;
  const router = express.Router();

  router.post(
    "/",
    bodyValidatorMw(createAuthorValidation),
    async (req: any, res: Response, _next: NextFunction) => {
      try {
        const { name, country, birthday } = req.body;
        const response = await authorService.createAuthor({
          name,
          country,
          birthday: new Date(birthday),
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
  router.get("/list", async (req: any, res: Response, _next: NextFunction) => {
    try {
      const response = await authorService.getAuthorList();
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      _next({ success: false, message: (err as Error).message });
    }
  });
  router.get(
    "/:_id",
    paramsValidatorMw(getOneAuthorValidation),
    async (req: any, res: Response, _next: NextFunction) => {
      try {
        const response = await authorService.getOneAuthorById(
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
    paramsValidatorMw(deleteOneAuthorValidation),
    async (req: any, res: Response, _next: NextFunction) => {
      try {
        const response = await authorService.deleteAuthor(
          new ObjectId(req.params._id)
        );
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
  router.post(
    "/update/:_id",
    paramsValidatorMw(updateAuthorByIdValidation),
    bodyValidatorMw(updateAuthor),
    async (req: any, res: Response, _next: NextFunction) => {
      try {
        const response = await authorService.updateAuthor({
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
