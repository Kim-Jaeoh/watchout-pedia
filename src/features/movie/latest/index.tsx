import React from "react";
import styled from "@emotion/styled";
import useLatestMovie from "./useLatestMovie";
import Card from "../../../components/Card";

const Base = styled.div``;

const Title = styled.h4``;

const LatestMovieSection: React.FC = () => {
  const { data, isLoading } = useLatestMovie();
  const getYear = (date: string) => date.split("-")[0];
  return (
    <Base>
      <Title>최근 개봉작</Title>
      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <Card
          linkUrl={`/movie/${data.data.id}`}
          title={data.data.title}
          posterPath={`${process.env.REACT_APP_IMAGE_PREFIX}/${data.data.poster_path}`}
          voteAverage={data.data.vote_average}
          year={getYear(data.data.release_date)}
        />
      )}
    </Base>
  );
};

export default LatestMovieSection;
