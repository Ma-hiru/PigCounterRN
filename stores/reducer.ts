import { userReducer } from "@/stores/slice/userSlice";
import { uploadReducer } from "@/stores/slice/uploadSlice";
import { newsReducer } from "@/stores/slice/newsSlice";
import { companyReducer } from "@/stores/slice/companySlice";

export default {
  userStore: userReducer,
  uploadStore: uploadReducer,
  newsStore: newsReducer,
  companyStore: companyReducer
};
