import { useQuery } from "react-query";
import { airingTodayApi } from "../../../apis/tvApi";
import { AxiosError, AxiosResponse } from "axios";
import { ListResponse, TVDetail } from "../../../types";

const useAiringToday = () => {
  return useQuery<AxiosResponse<ListResponse<TVDetail>, AxiosError>>(
    "airingTodayTv",
    airingTodayApi,
    { refetchOnWindowFocus: false }
  );
};

export default useAiringToday;
