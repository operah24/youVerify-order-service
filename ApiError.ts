export default class ApiError extends Error {
  constructor(message: string, public status: number = 400, public data: any = {}) {
    super(message);
    this.status = status;
    this.data = data;
    Error.captureStackTrace(this)
  }
}