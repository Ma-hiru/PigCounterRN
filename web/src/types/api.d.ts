type ReqResponse<T> = {
  code: number;
  ok: boolean;
  message: string;
  data: T;
}
/** login */
type LoginParams = {
  username: string;
  password: string;
};
type LoginResponseData = UserProfile;

type PageResponse<T> = {
  code: number;
  ok: boolean;
  message: string;
  data: {
    total: number;
    list: T[]
  }
}
