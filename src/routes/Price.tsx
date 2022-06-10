import styled from "styled-components";
import { ITickersInfo } from "./Coin";

const PriceInfo = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 440px;
  background-color: ${(props) => props.theme.headerColor};
  border-radius: 20px;
`;

const PriceDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  line-height: 40px;
`;

const ChangeRate = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ChangeRateInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  width: 200px;
  height: 350px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.itemBgColor};
`;

interface PriceProps {
  price: ITickersInfo;
}

function Price({ price }: PriceProps) {
  return (
    <PriceInfo>
      <ChangeRate>
        <span>Change Rate</span>
        <ChangeRateInfo>
          <span>15 Minutes: {price.quotes.USD.percent_change_15m}%</span>
          <span>30 Minutes: {price.quotes.USD.percent_change_30m}%</span>
          <span>1 Hour: {price.quotes.USD.percent_change_1h}%</span>
          <span>6 Hours: {price.quotes.USD.percent_change_6h}%</span>
          <span>12 Hours: {price.quotes.USD.percent_change_12h}%</span>
          <span>24 Minutes: {price.quotes.USD.percent_change_24h}%</span>
        </ChangeRateInfo>
      </ChangeRate>

      <PriceDetail>
        <span>Market cap: ${price.quotes.USD.market_cap}</span>
        <span>
          Market cap change: {price.quotes.USD.market_cap_change_24h}%
        </span>
        <span>Total volume in 24 Hours: ${price.quotes.USD.volume_24h}</span>
        <span>
          Volume Change in 24 Hours: {price.quotes.USD.volume_24h_change_24h}%
        </span>
      </PriceDetail>
    </PriceInfo>
  );
}

export default Price;
