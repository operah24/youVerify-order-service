import "reflect-metadata";
import { Methods } from "./Methods";
import AppRouter from "../config/AppRouter";
import { MetaDataKeys } from "./MetaDataKeys";

const router = AppRouter.getInstance();

export function controller(routePrefix: string) {
  
  return function (target: any) {
    const prototype = target.prototype;
    console.log({ prototype })
    for (let key in prototype) {
      const routeHandler = prototype[key];
      const path = Reflect.getMetadata(MetaDataKeys.path, prototype, key);
      const method: Methods = Reflect.getMetadata(MetaDataKeys.method, prototype, key);
      const middlewares = Reflect.getMetadata(MetaDataKeys.middleware, prototype, key) || [];
      
      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
      }
    }
  }
}