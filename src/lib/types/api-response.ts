export type ValidationError = {
  field: string;
  message: string;
};

export type SuccessResponse<T> = {
  success: true;
  code: string;
  message: string;
  result: T;
};

export type ErrorResponse = {
  success: false;
  code: string;
  message: string;
  result: ValidationError[] | null;
};

export type MainRes<T> = SuccessResponse<T> | ErrorResponse;
