import { HttpStatusCode } from "axios";

export interface HttpResponseError {
  message: string;
  status: HttpStatusCode;
}
