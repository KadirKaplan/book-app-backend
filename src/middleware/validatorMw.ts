import { NextFunction, Request, Response, Handler } from "express";
import Ajv, { AnySchemaObject } from "ajv";
import addFormats from "ajv-formats";

export function bodyValidatorMw(validation: AnySchemaObject): Handler {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(validation);

  return (req: Request, res: Response, next: NextFunction) => {
    if (validate(req.body)) {
      next();
    } else {
      const error = validate.errors && validate.errors[0];
      next({
        success: false,
        message: `${error!.instancePath} ${error!.message}`,
      });
    }
  };
}

export function queryValidatorMw(validation: AnySchemaObject): Handler {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(validation);

  return (req: Request, res: Response, next: NextFunction) => {
    if (validate(req.query)) {
      next();
    } else {
      next({ success: false, message: validate.errors });
    }
  };
}

export function headerValidatorMw(validation: AnySchemaObject): Handler {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(validation);

  return (req: Request, res: Response, next: NextFunction) => {
    if (validate(req.headers)) {
      next();
    } else {
      next({ success: false, message: validate.errors });
    }
  };
}

export function paramsValidatorMw(validation: AnySchemaObject): Handler {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(validation);

  return (req: Request, res: Response, next: NextFunction) => {
    if (validate(req.params)) {
      next();
    } else {
      next({ success: false, message: validate.errors });
    }
  };
}
