"use client";

import { useState } from "react";
import CountryPicker from "./CountryPicker";
import CaseCharts from "./CasesChart";

export default function Dashboard() {
  const [selected, setSelected] = useState("USA");

  return (
    <div>
      <CountryPicker selected={selected} onChange={setSelected} />
      <CaseCharts selected={selected} />
    </div>
  );
}
