import React from "react";
import styled from "@emotion/styled";
import useLatestTv from "./useLatestTv";
import Card from "../../../components/Card";

const Base = styled.div`
  margin-bottom: 62px;
`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  padding: 12px 0 14px;
`;

const LatestTvSection: React.FC = () => {
  const { data, isLoading } = useLatestTv();
  const getYear = (date: string) => date.split("-")[0];
  return (
    <Base>
      <Title>최근 개봉작</Title>
      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <Card
          linkUrl={`/tv/${data.data.id}`}
          title={data.data.name}
          posterPath={`${process.env.REACT_APP_IMAGE_PREFIX}/${data.data.poster_path}`}
          voteAverage={data.data.vote_average}
          year={getYear(data.data.first_air_date)}
        />
      )}
    </Base>
  );
};

export default LatestTvSection;
