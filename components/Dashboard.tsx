"use client";

import { useState } from "react";
import CountryPicker from "./CountryPicker";
import CaseCharts from "./CasesChart";
import SIRChart from "./SIRChart";

type View = "cases" | "outcomes";

export default function Dashboard() {
  const [selected, setSelected] = useState("USA");
  const [view, setView] = useState<View>("cases");

  return (
    <div>
      <CountryPicker selected={selected} onChange={setSelected} />

      <div>
        <button
          onClick={() => setView("cases")}
          style={{
            fontWeight: view === "cases" ? "bold" : "normal",
            border: "2px solid #ffffff",
            margin: "5px",
            padding: "2px",
          }}
        >
          Confirmed cases
        </button>
        <button
          onClick={() => setView("outcomes")}
          style={{
            fontWeight: view === "outcomes" ? "bold" : "normal",
            border: "2px solid #ffffff",
            margin: "5px",
            padding: "2px",
          }}
        >
          Recoveries/Deaths
        </button>
      </div>

      {view === "cases" ? (
        <CaseCharts selected={selected} />
      ) : (
        <SIRChart selected={selected} />
      )}
    </div>
  );
}
