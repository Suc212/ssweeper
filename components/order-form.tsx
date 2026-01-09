"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Check } from "lucide-react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase-client"

const orderSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 characters"),
  customerWhatsapp: z.string().min(10, "WhatsApp number must be at least 10 characters"),
  customerAddress: z.string().min(10, "Address must be at least 10 characters"),
  numUnits: z.string(),
})

type OrderFormData = z.infer<typeof orderSchema>

const pricing = {
  "1": { price: 1500, save: 0 },
  "2": { price: 2800, save: 200 },
  "3": { price: 4000, save: 500 },
}

export function OrderForm() {
  const [selectedUnits, setSelectedUnits] = useState("2")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      numUnits: "2",
    },
  })

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const numUnits = Number.parseInt(selectedUnits)
      const totalPrice = pricing[selectedUnits as keyof typeof pricing]?.price || 1500

      await addDoc(collection(db, "orders"), {
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone,
        customer_whatsapp: data.customerWhatsapp,
        customer_address: data.customerAddress,
        num_units: numUnits,
        total_price: totalPrice,
        created_at: serverTimestamp(),
      })

      const emailResponse = await fetch("/api/send-order-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          customer_phone: data.customerPhone,
          customer_whatsapp: data.customerWhatsapp,
          customer_address: data.customerAddress,
          num_units: numUnits,
          total_price: totalPrice,
        }),
      })

      if (!emailResponse.ok) {
        const emailResult = await emailResponse.json().catch(() => null)
        throw new Error(emailResult?.error || "Failed to send order email")
      }

      setSubmitSuccess(true)
      reset()
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An error occurred")
      console.error("Order submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Order Submitted Successfully!</h3>
        <p className="text-muted-foreground mb-4">
          Thank you for your order. We will contact you within 24 hours to confirm and arrange delivery.
        </p>
        <p className="text-sm text-muted-foreground">A confirmation email has been sent to your inbox.</p>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-semibold text-foreground">Select Number of Units</Label>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(pricing).map(([units, { price, save }]) => (
            <button
              key={units}
              type="button"
              onClick={() => setSelectedUnits(units)}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                selectedUnits === units
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background hover:border-primary/50"
              }`}
            >
              <div className="font-bold text-foreground">
                {units} Unit{units !== "1" ? "s" : ""}
              </div>
              <div className="text-sm text-primary font-semibold">GH₵{price.toLocaleString()}</div>
              {save > 0 && <div className="text-xs text-accent">Save GH₵{save}</div>}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Full Name
        </Label>
        <Input id="name" placeholder="John Doe" {...register("customerName")} className="bg-background border-border" />
        {errors.customerName && <p className="text-destructive text-sm">{errors.customerName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("customerEmail")}
          className="bg-background border-border"
        />
        {errors.customerEmail && <p className="text-destructive text-sm">{errors.customerEmail.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </Label>
        <Input
          id="phone"
          placeholder="+233 XX XXX XXXX"
          {...register("customerPhone")}
          className="bg-background border-border"
        />
        {errors.customerPhone && <p className="text-destructive text-sm">{errors.customerPhone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp" className="text-sm font-medium">
          WhatsApp Number
        </Label>
        <Input
          id="whatsapp"
          placeholder="+233 XX XXX XXXX"
          {...register("customerWhatsapp")}
          className="bg-background border-border"
        />
        {errors.customerWhatsapp && <p className="text-destructive text-sm">{errors.customerWhatsapp.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium">
          Delivery Address
        </Label>
        <Input
          id="address"
          placeholder="123 Main Street, Accra"
          {...register("customerAddress")}
          className="bg-background border-border"
        />
        {errors.customerAddress && <p className="text-destructive text-sm">{errors.customerAddress.message}</p>}
      </div>

      {submitError && <p className="text-destructive text-sm bg-destructive/10 p-3 rounded-lg">{submitError}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
      >
        {isSubmitting ? (
          <>
            <Spinner className="w-4 h-4 mr-2" />
            Processing...
          </>
        ) : (
          `Complete Order - GH₵${pricing[selectedUnits as keyof typeof pricing]?.price.toLocaleString()}`
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to our terms and privacy policy.
      </p>
    </form>
  )
}
