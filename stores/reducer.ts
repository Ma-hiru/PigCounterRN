import { useUserStore } from "@/stores/moudule/useUserStore";
import { useUploadStore } from "@/stores/moudule/useUploadStore";

export default {
  userStore: useUserStore.reducer,
  uploadStore: useUploadStore.reducer
};
