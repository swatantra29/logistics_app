"use client"

import { useEffect, useRef } from "react"
import type { LogisticsItem } from "@/types/database"

interface StatsChartProps {
  data: LogisticsItem[]
}

export function StatsChart({ data }: StatsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Group data by category
    const categories: Record<string, number> = {}

    data.forEach((item) => {
      if (!categories[item.Category]) {
        categories[item.Category] = 0
      }
      categories[item.Category] += item.Quantity
    })

    const categoryNames = Object.keys(categories)
    const quantities = categoryNames.map((cat) => categories[cat])

    // Chart dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 60
    const barWidth = (width - padding * 2) / categoryNames.length - 20

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Find max value for scaling
    const maxValue = Math.max(...quantities)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = "#888"
    ctx.stroke()

    // Y-axis labels
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#888"
    const yStep = Math.ceil(maxValue / 5)
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - (i * (height - padding * 2)) / 5
      const value = i * yStep
      ctx.fillText(value.toString(), padding - 10, y)

      // Grid line
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.strokeStyle = "#eee"
      ctx.stroke()
    }

    // Draw bars
    categoryNames.forEach((category, i) => {
      const x = padding + i * ((width - padding * 2) / categoryNames.length) + 10
      const barHeight = (quantities[i] / maxValue) * (height - padding * 2)

      ctx.fillStyle = "#3b82f6"
      ctx.fillRect(x, height - padding - barHeight, barWidth, barHeight)

      // X-axis labels
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillStyle = "#888"
      ctx.fillText(category, x + barWidth / 2, height - padding + 10)
    })

    // Title
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillStyle = "#333"
    ctx.font = "16px sans-serif"
    ctx.fillText("Items by Category", width / 2, 20)
  }, [data])

  return (
    <div className="w-full h-[400px] relative">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}
