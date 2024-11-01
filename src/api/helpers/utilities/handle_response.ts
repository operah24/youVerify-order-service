import express from "express"

export type TResponse = {
  success: boolean,
  message: string,
  data: { [key: string]: string }
}

export const sendResponse = async (res: express.Response, message: string, statusCode = 400, content: any = {}) => {

  const successCodeArray = [200, 201];

  const data: TResponse = {
    success: !successCodeArray.includes(statusCode) ? false : true,
    message: message,
    data: content
  }

  res.status(statusCode).json(data);
}