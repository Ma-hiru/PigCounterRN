import { userReducer } from "@/stores/slice/userSlice";
import { uploadReducer } from "@/stores/slice/uploadSlice";
import { newsReducer } from "@/stores/slice/newSlice";

export default {
  userStore: userReducer,
  uploadStore: uploadReducer,
  newsStore:newsReducer
};
