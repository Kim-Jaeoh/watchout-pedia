import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { similarApi } from "../../apis/movieApi";
import { ListResponse, MovieDetail } from "../../types";

const useSimilarMovie = (id: string) => {
  return useQuery<AxiosResponse<ListResponse<MovieDetail>>, AxiosError>(
    ["similarMovie", id],
    () => similarApi(id)
  );
};

export default useSimilarMovie;
