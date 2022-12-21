import { useQuery } from "react-query";
import { onTheAirApi } from "../../../apis/tvApi";
import { AxiosError, AxiosResponse } from "axios";
import { ListResponse, TVDetail } from "../../../types";

const useOnTheAir = () => {
  return useQuery<AxiosResponse<ListResponse<TVDetail>, AxiosError>>(
    "onTheAirTv",
    onTheAirApi,
    { refetchOnWindowFocus: false }
  );
};

export default useOnTheAir;
