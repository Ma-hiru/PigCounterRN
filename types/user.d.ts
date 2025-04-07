import { LoginResponseData } from "@/types/api";

type UserProfile = LoginResponseData & { admin: boolean; }
type Feedback = {}
