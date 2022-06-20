import axiosInstance from ".";

export const latestApi = () => axiosInstance.get("/tv/latest");

export const airingTodayApi = () => axiosInstance.get("/tv/airing_today");

export const onTheAirApi = () => axiosInstance.get("/tv/on_the_air");

export const popularApi = () => axiosInstance.get("/tv/popular");

export const topRatedApi = () => axiosInstance.get("/tv/top_rated");

export const detailApi = (TvId: string) => axiosInstance.get(` /tv/${TvId}`);

export const similarApi = (TvId: string) =>
  axiosInstance.get(`/tv/${TvId}/similar`);

export const searchApi = (query: string) =>
  axiosInstance.get(`/search/tv?query=${query}`);
