import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { AiOutlineSearch } from "react-icons/ai";
import useMovieSearch from "../features/movie/useMovieSearch";
import useTvSearch from "../features/tv/useTvSearch";
import { Movie, MovieDetail } from "../types";
import { debounce } from "lodash";

const Base = styled.header`
  width: 100%;
  height: 62px;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  text-align: center;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 0px 0px;
  z-index: 10;
`;

const Navigation = styled.nav`
  margin: 0 auto;
  max-width: 1200px;
`;

const MenuListWrapper = styled.div``;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const Menu = styled.li`
  display: flex;
  align-items: center;
  height: 62px;
  flex-shrink: 0;
  &:not(:first-of-type) {
    margin-left: 24px;
  }
`;

const MenuButton = styled.button<{ active?: boolean }>`
  font-size: 15px;
  font-weight: ${({ active }) => (active ? "700" : "200")};
  color: ${({ active }) => (active ? "rgb(27, 27, 27)" : "rgb(155, 155, 155)")};
  cursor: pointer;
  border: none;
  background: none;
`;

const SearchMenu = styled.li`
  width: 300px;
  display: flex;
  align-items: center;
  height: 62px;
  flex-shrink: 1;
  margin: 0 0 0 auto;
  position: relative;
`;

const Link = styled.a`
  text-decoration: none;
`;

const TextLogo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  > span[class="primary"] {
    color: #ff2f6e;
  }
  > span:not(.primary) {
    color: #222;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchFormWrapper = styled.div``;

const SearchForm = styled.div``;

const SearchLabel = styled.label`
  background: rgb(245, 245, 247);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  border-radius: 2px;
  padding: 7px 8px;
`;

const SearchInput = styled.input`
  font-size: 14px;
  font-weight: 400;
  background: transparent;
  width: 100%;
  padding: 0 0 0 8px;
  border: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  caret-color: rgb(53, 53, 53);
  line-height: 23px;
`;

const SignIn = styled.button`
  background: transparent;
  color: rgb(116, 116, 123);
  font-size: 14px;
  padding: 0;
  border: 0;
  cursor: pointer;
  margin: 15px 0;
`;

const SignUp = styled.button`
  border-radius: 6px;
  font-weight: 500;
  box-sizing: border-box;
  min-width: 72px;
  height: 32px;
  background: transparent;
  color: rgb(53, 53, 53);
  font-size: 14px;
  border: 1px solid rgba(116, 116, 123, 0.5);
  cursor: pointer;
  margin: 15px 0;
`;

const SearchResultWrapper = styled.div`
  position: absolute;
  top: 55px;
  left: 0;
  z-index: 9999999;
  background-color: #fff;
  width: 100%;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  max-height: 480px;
  /* overflow-y: scroll; */
`;

const SearchResultList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SearchResultListItem = styled.li<{ isFocus?: boolean }>`
  padding: 4px 15px;
  box-sizing: border-box;
  font-size: 14px;
  width: 100%;
  height: 26px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${(props) => (props.isFocus ? "#ff5185" : "#fff")};
  color: ${(props) => (props.isFocus ? "#fff" : "#222")};
  &:hover {
    background-color: #eeeeee;
  }
`;

const Header: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [index, setIndex] = useState<number>(-1);
  const autoRef = useRef<HTMLUListElement>(null);

  const pathName = window.location.pathname;

  const { data: movieSearchResult } = useMovieSearch(searchKeyword);
  const { data: tvSearchResult } = useTvSearch(searchKeyword);

  // const handleKeyword = debounce(
  //   (e: React.ChangeEvent<HTMLInputElement>) =>
  //     setSearchKeyword(e.target.value),
  //   200
  // );

  // useEffect(() => {
  //   const debounce = setTimeout(() => {
  //     setSearchKeyword(searchKeyword);
  //   }, 200);
  //   return () => {
  //     clearTimeout(debounce);
  //   };
  // }, [searchKeyword]); // 키워드가 변경되면 api를 호출

  const debounces = debounce((k: string): void => setSearchKeyword(k), 200);
  const keyPress = useCallback(debounces, [debounces]);

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    keyPress(e.target.value);
  };

  const ArrowDown = "ArrowDown";
  const ArrowUp = "ArrowUp";
  const Escape = "Escape";
  const Enter = "Enter";

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    /* 검색창이 비었을 때 검색리스트 index가 input창으로 이동하라는 의미
       (ex. 검색 후 2번째 칸에 focus 되어있는 상태에서 검색어 지웠다가
       다른 검색어 입력 시 그대로 2번째 칸에 focus 되어 있는 것을 방지) */
    if (searchKeyword === "") {
      setIndex(-1);
    }
    switch (e.key) {
      case ArrowDown: // 키보드 아래 키
        setIndex(index + 1);
        /* childElementCount는 li tag의 개수를 의미하고, 검색 내역 인덱스 키워드에서
           또 아래 키를 누르면 맨처음 인덱스 키워드로 돌아가라는 의미이다. */
        if (autoRef.current?.childElementCount === index + 1) {
          setIndex(0);
        }
        break;
      case ArrowUp: // 키보드 위에 키
        setIndex(index - 1);
        if (index <= 0) {
          setIndex(-1);
        }
        break;
      case Escape: // esc key를 눌렀을 때,
        setIndex(-1);
        break;
      case Enter:
        // 해결 방법 찾는 중..
        break;
    }
  };

  return (
    <Base>
      <Navigation>
        <MenuListWrapper>
          <MenuList>
            <Menu>
              <Link href="/">
                <TextLogo>
                  <span className="primary">WATCHOUT</span>
                  <span>PEDIA</span>
                </TextLogo>
              </Link>
            </Menu>
            <Menu>
              <Link href="/">
                <MenuButton active={pathName === "/"}>영화</MenuButton>
              </Link>
            </Menu>
            <Menu>
              <Link href="/tv">
                <MenuButton active={pathName === "/tv"}>TV 프로그램</MenuButton>
              </Link>
            </Menu>
            <SearchMenu>
              <SearchContainer>
                <SearchFormWrapper>
                  <SearchForm>
                    <SearchLabel>
                      <AiOutlineSearch />
                      <SearchInput
                        placeholder="콘텐츠, 인물, 컬렉션, 유저를 검색해주세요"
                        // value={searchKeyword}
                        onChange={handleKeyword}
                        onKeyDown={handleKeyArrow}
                      />
                    </SearchLabel>
                  </SearchForm>
                </SearchFormWrapper>
              </SearchContainer>
              <SearchResultWrapper>
                <SearchResultList ref={autoRef}>
                  {
                    pathName === "/" && "/movie" && "/movie:id"
                      ? movieSearchResult?.data.results
                          .map((item, idx) => (
                            <Link href={`/movie/${item.id}`} key={item.id}>
                              <SearchResultListItem
                                // 클릭 시 searchKeyword에 해당 제목 기입 -> 제목 input의 value값으로 보여짐
                                onClick={() => {
                                  setSearchKeyword(item.title);
                                }}
                                isFocus={index === idx ? true : false} // 같은 index면 텍스트 hover 추가
                              >
                                {item.title}
                              </SearchResultListItem>
                            </Link>
                          ))
                          .slice(0, 12) // 검색 내용 12개까지 노출
                      : tvSearchResult?.data.results
                          .map((item, idx) => (
                            <Link href={`/tv/${item.id}`} key={item.id}>
                              <SearchResultListItem
                                // 클릭 시 searchKeyword에 해당 제목 기입 -> 제목 input의 value값으로 보여짐
                                onClick={() => {
                                  setSearchKeyword(item.name);
                                }}
                                isFocus={index === idx ? true : false} // 같은 index면 텍스트 hover 추가
                              >
                                {item.name}
                              </SearchResultListItem>
                            </Link>
                          ))
                          .slice(0, 12) // 검색 내용 12개까지 노출
                  }
                </SearchResultList>
              </SearchResultWrapper>
            </SearchMenu>
            <Menu>
              <SignIn>로그인</SignIn>
            </Menu>
            <Menu>
              <SignUp>회원가입</SignUp>
            </Menu>
          </MenuList>
        </MenuListWrapper>
      </Navigation>
    </Base>
  );
};

export default Header;
