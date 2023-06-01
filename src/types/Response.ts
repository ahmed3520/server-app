// Response.ts
export interface Response {
  type: string;
  message: string;
  statusCode: number;
  response?: any;
}
