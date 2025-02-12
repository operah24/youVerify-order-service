import "reflect-metadata";
import { RequestHandler } from "express";
import { MetaDataKeys } from "./MetaDataKeys";

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, _desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata(MetaDataKeys.middleware, target, key) || [];
    Reflect.defineMetadata(MetaDataKeys.middleware, [middleware, ...middlewares], target, key);
  }
}