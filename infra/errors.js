export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Unexpected Internal Server Error.", {
      cause
    });

    this.name = "InternalServerError";
    this.action = "Please contact our support team for assistance.";
    this.status = 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.status,
    };
  }
}