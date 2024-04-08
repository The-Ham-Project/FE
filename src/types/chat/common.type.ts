export interface ServerResponse<T> {
  status: boolean;
  message: string;
  data: T;
}
