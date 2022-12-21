import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { detailApi } from "../../apis/tvApi";
import { TVDetail } from "../../types";

const useTvDetail = (query: string) => {
  return useQuery<AxiosResponse<TVDetail>, AxiosError>(
    ["tvDetail", query],
    () => detailApi(query)
  );
};

export default useTvDetail;
