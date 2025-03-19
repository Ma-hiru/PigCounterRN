import { userReducer } from "@/stores/slice/userSlice";
import { uploadReducer } from "@/stores/slice/uploadSlice";

export default {
  userStore: userReducer,
  uploadStore: uploadReducer
};
