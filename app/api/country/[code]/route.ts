import { loadRows, toNumberOrNull } from "@/lib/covid-data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const rows = loadRows().filter((r) => r.iso_alpha_3 === code.toUpperCase());

  if (rows.length === 0) {
    return Response.json({ error: "Country not found" }, { status: 404 });
  }

  return Response.json({
    country: rows[0].administrative_area_level_1,
    rows: rows.map((r) => ({
      date: r.date,
      confirmed: toNumberOrNull(r.confirmed),
      deaths: toNumberOrNull(r.deaths),
      recovered: toNumberOrNull(r.recovered),
    })),
  });
}
