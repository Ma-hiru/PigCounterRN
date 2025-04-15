type UserProfile = {
  id: number;
  username: string;
  name: string;
  profilePicture: string;
  token: string;
  organization: string;
  admin: boolean;
}
type UserInfo = UserProfile & {
  sex: string;
  phone: string;
  createTime: string
  password: string;
}
