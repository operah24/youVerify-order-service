import axios, { AxiosResponse } from "axios";
import ApiError from "../../../../ApiError";
import { IObjectProp } from "../interfaces";

const baseurl = 'http://inventory_service:3009/inventory';

export const put = async (data: IObjectProp, path: string) => {
  const url = `${baseurl}` + path;

  try {
    const response: AxiosResponse | null = await axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    if (response && response.status == 201) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(error.message)
    } else {
      throw new ApiError("Error occured making a request to " + path)
    }
  }
};

export const get = async (path: string) => {
  const url = `${baseurl}` + path;

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response && response.status == 200) {
      return response.data;
    }
  
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(error.message)
    } else {
      throw new ApiError("Error occured making a request to " + path)
    }
  }
};