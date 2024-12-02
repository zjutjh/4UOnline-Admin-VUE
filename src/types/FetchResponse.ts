export interface ResultType {
  status: boolean;
  data: {
    code: number,
    data: any,
    msg: string
  };
  errorMessage: string
}
