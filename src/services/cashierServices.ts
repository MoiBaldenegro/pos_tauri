import axios from "@/configs/axios";
import {
  CASHIER_SESSION_PATH,
  PAUSE_RESUME_PATH,
} from "@/lib/routes.paths.lib";

export const pauseResumeSessionService = async (sessionId: string) => {
  const response = await axios.put(
    `${CASHIER_SESSION_PATH}${PAUSE_RESUME_PATH}/${sessionId}`
  );
  return response;
};
