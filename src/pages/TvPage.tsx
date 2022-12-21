import styled from "@emotion/styled";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AiringTodayTvSection from "../features/tv/airingToday";
import LatestTvSection from "../features/tv/latest";
import OnTheAirTvSection from "../features/tv/onTheAir";
import PopularTvSection from "../features/tv/popular";
import TopRateTvSection from "../features/tv/topRate";

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

const Container = styled.div`
  margin-top: 62px;
  padding: 24px 0;
`;

const TvPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Main>
        <Container>
          <LatestTvSection />
          <AiringTodayTvSection />
          <OnTheAirTvSection />
          <PopularTvSection />
          <TopRateTvSection />
        </Container>
      </Main>
      <Footer />
    </div>
  );
};

export default TvPage;
