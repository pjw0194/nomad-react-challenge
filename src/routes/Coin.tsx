import { useQuery } from "react-query";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 100px auto;
  max-width: 1000px;
  height: 800px;
  background-color: ${(props) => props.theme.listColor};
  border-radius: 20px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 30px;
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.headerColor};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const BackBtn = styled.div`
  width: 20px;
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;
`;

const Title = styled.div`
  font-size: 30px;
  color: ${(props) => props.theme.titleColor};
`;

const Loader = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 30px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 20px;
`;

const Description = styled.p`
  padding: 30px;
  font-size: 18px;
  line-height: 25px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.headerColor};
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.theme.itemBgColor};
  padding-top: 5px;
  width: 150px;
  height: 45px;
  border-radius: 10px;
  text-transform: uppercase;
  span:first-child {
    font-size: 14px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(props) => props.theme.headerColor};
  width: 100%;
  height: 50px;
  border-radius: 10px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: 200px;
  height: 100%;
  &:hover {
    font-weight: bold;
    color: whitesmoke;
  }
`;

interface ICoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  hardware_wallet: boolean;
  started_at: string;
  development_status: string;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  contract: string;
  platform: string;
  first_data_at: string;
  last_data_at: string;
}

export interface ITickersInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

interface RouteState {
  name: string;
  symbol: string;
}

function Coin() {
  const { coinId } = useParams();
  const location = useLocation();
  const state = location.state as RouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<ICoinInfo>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );

  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<ITickersInfo>(["tickers", coinId], () =>
      fetchCoinTickers(coinId!)
    );

  const loading = infoLoading || tickersLoading;

  return (
    <>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Container>
          <div>
            <Header>
              <BackBtn>
                <Link to="/">&larr;</Link>
              </BackBtn>
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${
                  state?.symbol
                    ? state?.symbol.toLowerCase()
                    : infoData?.symbol.toLowerCase()
                }`}
              />
              <Title>
                {state?.name
                  ? state.name
                  : loading
                  ? "Loading..."
                  : infoData?.name}
              </Title>
            </Header>
            <Description>
              {infoData?.description
                ? infoData?.description.slice(0, 500)
                : ". . ."}
            </Description>
            <Overview>
              <OverviewItem>
                <span>rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>price:</span>
                <span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
              </OverviewItem>
              <OverviewItem>
                <span>opensource:</span>
                <span>{infoData?.open_source ? "Yes" : "No"}</span>
              </OverviewItem>
              <OverviewItem>
                <span>total supply:</span>
                <span>${tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>max supply:</span>
                <span>${tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>

            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to="chart">Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to="price">Price</Link>
              </Tab>
            </Tabs>
          </div>

          <Routes>
            <Route path="chart" element={<Chart coinId={coinId!} />} />
            <Route path="price" element={<Price price={tickersData!} />} />
          </Routes>
        </Container>
      )}
    </>
  );
}

export default Coin;
