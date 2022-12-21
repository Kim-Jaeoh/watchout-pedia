import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { detailApi } from "../../apis/movieApi";
import { MovieDetail } from "../../types";

const useMovieDetail = (query: string) => {
  return useQuery<AxiosResponse<MovieDetail>, AxiosError>(
    ["movieDetail", query],
    () => detailApi(query)
  );
};

export default useMovieDetail;
