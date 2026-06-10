export async function GET(
  req: Request,
  { params }: { params: { websiteId: string } }
) {
  const { websiteId } = params;

  const seo = [
    { day: "Mon", score: 40 },
    { day: "Tue", score: 55 },
    { day: "Wed", score: 52 },
    { day: "Thu", score: 70 },
    { day: "Fri", score: 65 },
    { day: "Sat", score: 80 },
    { day: "Sun", score: 74 },
  ];

  return Response.json({ seo });
}
