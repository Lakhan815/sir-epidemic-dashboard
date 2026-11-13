import { loadRows } from "@/lib/covid-data";

export async function GET() {
  const countries = new Map<string, string>();

  for (const row of loadRows()) {
    if (row.iso_alpha_3 && !countries.has(row.iso_alpha_3)) {
      countries.set(row.iso_alpha_3, row.administrative_area_level_1);
    }
  }

  const list = [...countries.entries()]
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return Response.json(list);
}
