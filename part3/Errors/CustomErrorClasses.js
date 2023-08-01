export class Error500 extends Error {
  constructor(message) {
    super(message);
    this.name = "Error500";
    this.status = 500;
    Error.captureStackTrace(this, Error500);
  }
}
