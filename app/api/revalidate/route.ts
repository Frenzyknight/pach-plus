import { NextRequest } from "next/server";
import { revalidate } from "@/lib/shopify";

export async function POST(req: NextRequest) {
  return revalidate(req);
}
