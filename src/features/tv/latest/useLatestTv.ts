import { useQuery } from "react-query";
import { latestApi } from "../../../apis/tvApi";
import { AxiosError, AxiosResponse } from "axios";
import { TVDetail } from "../../../types";

const useLatestTv = () => {
  return useQuery<AxiosResponse<TVDetail>, AxiosError>("latestTv", latestApi, {
    refetchOnWindowFocus: false,
  });
};

export default useLatestTv;
