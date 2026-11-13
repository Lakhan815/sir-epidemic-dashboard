"use client";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type CountryData = {
  country: string;
  rows: {
    date: string;
    confirmed: number | null;
    deaths: number | null;
    recovered: number | null;
  }[];
};

type Props = {
  selected: string;
};

export default function SIRChart({ selected }: Props) {
  const [data, setData] = useState<CountryData | null>(null);

  useEffect(() => {
    fetch(`/api/country/${selected}`)
      .then((res) => res.json())
      .then((result: CountryData) => setData(result));
  }, [selected]);

  if (data === null) {
    return <p>Loading...</p>;
  }

  const labels = data.rows.map((r) => r.date);

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Recovered",
            data: data.rows.map((r) => r.recovered),
            borderColor: "#60a5fa",
            borderWidth: 2,
            pointRadius: 0,
          },
          {
            label: "Deaths",
            data: data.rows.map((r) => r.deaths),
            borderColor: "#f87171",
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      }}
    />
  );
}
