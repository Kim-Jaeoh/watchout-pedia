import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { searchApi } from "../../apis/tvApi";
import { ListResponse, TVDetail } from "../../types";

const useTvSearch = (query: string) => {
  return useQuery<AxiosResponse<ListResponse<TVDetail>>, AxiosError>(
    ["searchTv", query],
    () => searchApi(query),
    { enabled: Boolean(query) }
  );
};

export default useTvSearch;
