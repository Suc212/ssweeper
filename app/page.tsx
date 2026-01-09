"use client"

import { useState, useRef } from "react"
import { Check, Zap, Wind, BatteryFull, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { OrderForm } from "@/components/order-form"

export default function HomePage() {
  const [selectedUnits, setSelectedUnits] = useState("2")
  const orderFormRef = useRef<HTMLDivElement>(null)

  const scrollToOrderForm = () => {
    orderFormRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const pricing = {
    "1": { price: "1,500", save: 0, label: "1 Unit" },
    "2": { price: "2,800", save: 200, label: "2 Units" },
    "3": { price: "4,000", save: 500, label: "3 Units" },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">SweepBot Pro</div>
          <Button onClick={scrollToOrderForm} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Order Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-accent uppercase tracking-wider">
                  Intelligent Home Automation
                </p>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                  Your Home,
                  <br />
                  <span className="text-primary">Perfectly Clean</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Experience effortless cleaning with SweepBot Pro. Advanced AI navigation, obstacle avoidance, and
                  automatic scheduling keep your floors spotless 24/7—without lifting a finger.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span>14-Day Trial Period</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span>1-Year Warranty</span>
                </div>
              </div>

              <Button
                size="lg"
                onClick={scrollToOrderForm}
                className="w-full sm:w-auto text-lg h-14 px-8 bg-primary hover:bg-primary/90"
              >
                Get Your SweepBot Today
              </Button>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 md:h-full min-h-96 bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src="\H6769346b1bfe407e9d95cc0d0af3184db.jpg_960x960q80.jpg"
                alt="SweepBot Pro Robot Sweeper"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute top-6 right-6 bg-primary text-primary-foreground rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">600+ Sold</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Image Gallery */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Why Choose SweepBot</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Revolutionary Cleaning Technology
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Smart Mapping & Navigation",
                description:
                  "LiDAR technology creates detailed room maps, ensuring 100% coverage with intelligent path planning that learns your home layout.",
                image: "\H6caa195abdcf4a5ea08c40c42b0d3dbfa.jpg_720x720q50.jpg",
              },
              {
                icon: BatteryFull,
                title: "Extended Battery & Auto-Return",
                description:
                  "Up to 90 minutes of cleaning on a single charge. Automatically returns to dock when battery runs low, resuming where it left off.",
                image: "/H363406a4c99943718ba44773575494f3F.jpg",
              },
              {
                icon: Wind,
                title: "Powerful Yet Eco-Friendly",
                description:
                  "4000 Pa suction power cleans deeply while using 80% less energy than traditional vacuums. Perfect for the environmentally conscious.",
                image: "/Hb07711e7b6f94245b20792dac9f1a36ea.jpg_720x720q50.jpg",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Card key={idx} className="overflow-hidden border border-border hover:shadow-lg transition-shadow">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Flexible Plans for Every Home
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Get more savings when you buy multiple units. Perfect for families, offices, or businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {Object.entries(pricing).map(([units, { price, save, label }]) => (
              <Card
                key={units}
                onClick={() => setSelectedUnits(units)}
                className={`relative p-8 cursor-pointer transition-all border-2 ${
                  selectedUnits === units
                    ? "border-primary bg-primary/5 shadow-lg scale-105"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {units === "2" && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-4">{label}</h3>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary">GH₵{price}</div>
                  {save > 0 && <div className="text-sm text-accent mt-2">Save GH₵{save}</div>}
                </div>
                <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Advanced obstacle avoidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>90-minute battery life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>LiDAR smart mapping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>1-Year warranty & support</span>
                  </li>
                </ul>
                <Button
                  onClick={() => scrollToOrderForm()}
                  className={`w-full ${
                    selectedUnits === units
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  Choose {label}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section ref={orderFormRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ready to Transform Your Home?
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              Complete your order below and we'll arrange delivery within 2-3 business days.
            </p>
          </div>
          <Card className="p-8 border border-border">
            <OrderForm />
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-xl font-bold text-primary mb-4">SweepBot Pro</div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Intelligent cleaning for modern homes in Ghana. We're committed to making your life easier with
              cutting-edge robotics and exceptional customer service.
            </p>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 SweepBot Pro. All rights reserved. | Serving Ghana with Smart Cleaning Technology</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
