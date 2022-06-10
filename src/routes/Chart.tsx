import ApexChart from "react-apexcharts";
import React from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";
import { fetchCoinHistory } from "./api";

interface ChartProps {
  coinId: string;
}

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  console.log(data);
  return (
    <>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "price",
              data:
                data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [price.open, price.high, price.low, price.close],
                  };
                }) ?? [],
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            xaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
          }}
          width={700}
          height={350}
        />
      )}
    </>
  );
}

export default Chart;
