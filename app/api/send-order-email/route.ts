import { NextResponse } from "next/server"
import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
const resendFromEmail = process.env.RESEND_FROM_EMAIL
const resendToEmail = process.env.RESEND_TO_EMAIL

export async function POST(request: Request) {
  try {
    if (!resendApiKey || !resendFromEmail || !resendToEmail) {
      return NextResponse.json({ error: "Missing Resend configuration" }, { status: 500 })
    }

    const body = await request.json()
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_whatsapp,
      customer_address,
      num_units,
      total_price,
    } = body

    if (!customer_name || !customer_email || !customer_phone || !customer_whatsapp || !customer_address || !num_units) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const resend = new Resend(resendApiKey)

    const emailText = [
      "New Order Submitted",
      "",
      `Name: ${customer_name}`,
      `Email: ${customer_email}`,
      `Phone: ${customer_phone}`,
      `WhatsApp: ${customer_whatsapp}`,
      `Address: ${customer_address}`,
      `Units: ${num_units}`,
      `Total Price: GH₵${total_price}`,
    ].join("\n")

    const { error } = await resend.emails.send({
      from: resendFromEmail,
      to: resendToEmail,
      subject: `New Order - ${customer_name}`,
      text: emailText,
    })

    if (error) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Order email error:", error)
    return NextResponse.json({ error: "An error occurred while sending the email" }, { status: 500 })
  }
}
