export const checkHasOwnProperty = (obj: any, property: string) => {
  return Object.prototype.hasOwnProperty.call(obj, property);
}