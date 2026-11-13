"use client";

import { useEffect, useState } from "react";

type Country = { code: string; name: string };

type Props = {
  selected: string;
  onChange: (code: string) => void;
};

export default function CountryPicker({ selected, onChange }: Props) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch("/api/countries")
      .then((res) => res.json())
      .then((data: Country[]) => setCountries(data));
  }, []);

  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      style={{ color: "#ffffff", backgroundColor: "#111111" }}
    >
      {countries.map((c) => (
        <option key={c.code} value={c.code}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
