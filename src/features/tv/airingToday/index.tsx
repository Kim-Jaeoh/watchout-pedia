import React from "react";
import styled from "@emotion/styled";
import Card from "../../../components/Card";
import useAiringToday from "./useAiringTodayTv";
import Slider from "../../../components/Slider";

const Base = styled.div`
  margin-bottom: 62px;
`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  padding: 12px 0 14px;
`;

const AiringTodayTvSection: React.FC = () => {
  const { data, isLoading } = useAiringToday();
  const getYear = (date: string) => date.split("-")[0];
  return (
    <Base>
      <Title>Airing Today</Title>
      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <Slider>
          {data.data.results.map((tv) => (
            <Card
              key={tv.id}
              linkUrl={`/tv/${tv.id}`}
              title={tv.name}
              posterPath={`${process.env.REACT_APP_IMAGE_PREFIX}/${tv.poster_path}`}
              voteAverage={tv.vote_average}
              year={getYear(tv.first_air_date)}
            />
          ))}
        </Slider>
      )}
    </Base>
  );
};

export default AiringTodayTvSection;
