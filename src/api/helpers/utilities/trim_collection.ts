import { checkHasOwnProperty }  from "./check_if_object_has_own_property";

export interface CollectionData {
  [key: string]: any
}

export const trimCollection = (data: CollectionData) => {
  for(let key in data){
    if(checkHasOwnProperty(data, key)){
      if(typeof data[key] == "string"){
        data[key] = data[key].trim();
      }
    }
  }
  return data;
};
