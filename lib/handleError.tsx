import axios, { AxiosError } from "axios";
import { toast } from "sonner";
interface ApiResponse {
  success: boolean;
  message?: string;
  // You can include additional properties based on your API response structure
}
export const ErrorHadler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API Error Response Data:", axiosError.response.data);
      console.error("API Error Response Status:", axiosError.response.status);
      console.error("API Error Response Headers:", axiosError.response.headers);
      //   alert(
      //     axiosError.response.data.message ||
      //       "An error occurred during registration"
      //     );
      toast.error(`message: ${axiosError.response.data.message}`);
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error("API Request Error:", axiosError.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Request Setup Error:", axiosError.message);
    }
  } else {
    const unknownError = error as unknown;
    console.error("Unknown Error:", unknownError);
    alert("An unknown error occurred during registration");
  }
};
