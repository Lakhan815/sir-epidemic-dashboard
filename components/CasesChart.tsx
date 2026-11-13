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
  rows: { date: string; confirmed: number | null }[];
};

type Props = {
  selected: string;
};

export default function CaseCharts({ selected }: Props) {
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
  const values = data.rows.map((r) => r.confirmed);

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: `Confirmed cases: ${data.country}`,
            data: values,
            borderColor: "#4ade80",
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      }}
    />
  );
}
