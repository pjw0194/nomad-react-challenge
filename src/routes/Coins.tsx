import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 500px;
`;

const Header = styled.header`
  margin: 20px 0px;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.titleColor};
`;

const Loader = styled.div`
  font-size: 30px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  padding: 10px;
  background-color: ${(props) => props.theme.listColor};
  width: 300px;
  margin: 10px 0px;
  border-radius: 10px;
  font-size: 18px;
  transition: all 0.1s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.titleColor};
    font-weight: bold;
  }
  a {
    display: flex;
    align-items: center;
  }
`;

const Img = styled.img`
  margin-right: 20px;
  width: 40px;
  height: 40px;
`;

const ThemeSwitch = styled.button`
  position: absolute;
  right: 50px;
  top: 50px;
  width: 40px;
  height: 23px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.switchColor};
`;

const Slider = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 16px;
  height: 16px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 50%;
`;

interface ICoin {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("coinsData", fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Container>
      <ThemeSwitch onClick={toggleDarkAtom}>
        <Slider></Slider>
      </ThemeSwitch>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinsList>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={`/${coin.id}`}
                state={{ name: coin.name, symbol: coin.symbol }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))
        )}
      </CoinsList>
    </Container>
  );
}

export default Coins;
