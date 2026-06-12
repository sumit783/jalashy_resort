import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const response = await fetch(`${backendUrl}/api/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("content-type") || "";
    let responseData: any;

    if (contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      responseData = { message: text || `HTTP Error ${response.status}: ${response.statusText}` };
    }

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: responseData.message || "Failed to create enquiry on the backend." },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (error: any) {
    console.error("Enquiry submission proxy error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}
