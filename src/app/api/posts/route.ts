import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let localPosts: any[] = [];

export async function GET() {
  return NextResponse.json(localPosts);
}

export async function POST(request: Request) {
  const post = await request.json();
  localPosts = [post, ...localPosts];
  return NextResponse.json(post);
}
