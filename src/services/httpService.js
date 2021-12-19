import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {   //use(success,error)
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);    //in both type of errors, promise is rejected
});
//hide axios behind http and in future we can change axios by other http module
//CRUD:
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
