import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";
import path from "path";

export type Columns = {
  iso_alpha_3: string;
  date: string;
  confirmed: string;
  deaths: string;
  recovered: string;
  administrative_area_level_1: string;
};
export function toNumberOrNull(value: string): number | null {
  if (value === "") return null;
  return Number(value);
}

let cache: Columns[] | null = null;

export function loadRows(): Columns[] {
  if (!cache) {
    const file = readFileSync(
      path.join(process.cwd(), "data", "1.csv"),
      "utf-8",
    );
    cache = parse(file, { columns: true, skip_empty_lines: true }) as Columns[];
  }
  return cache;
}
