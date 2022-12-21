import { useQuery } from "react-query";
import { topRatedApi } from "../../../apis/tvApi";
import { AxiosError, AxiosResponse } from "axios";
import { ListResponse, TVDetail } from "../../../types";

const useTopRateTv = () => {
  return useQuery<AxiosResponse<ListResponse<TVDetail>, AxiosError>>(
    "topRateTv",
    topRatedApi,
    { refetchOnWindowFocus: false }
  );
};

export default useTopRateTv;
