type UserProfile = {
  id: number;
  username: string;
  name: string;
  token: string;
  profilePicture: string;
  organization: string;
  admin: boolean;
}
type UserInfo = UserProfile & {
  sex: string;
  phone: string;
  createTime: string
}
type EmployeeInfo = Omit<UserInfo, "token" | "admin">

type NewEmployee = {
  id?: number;
  username: string;
  password: string;
  name: string;
  picture: Blob;
  organization: string;
  orgId: number;
  admin: boolean;
  sex: string;
  phone: string;
}
