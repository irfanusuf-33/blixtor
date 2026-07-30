import { NextRequest, NextResponse } from "next/server";
import { handleContactForm } from "@/controllers/contactController";
import { ContactFormData } from "@/types/contact";

export async function POST(request: NextRequest) {
  try {
    // Get the data sent from the frontend
    const body: ContactFormData = await request.json();

    // Pass the data to the controller
    const result = await handleContactForm(body);

    // Return the controller's response
    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      {
        status: 500,
      }
    );
  }
}