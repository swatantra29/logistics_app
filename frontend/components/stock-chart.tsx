"use client"

import { useEffect, useRef } from "react"
import type { InventoryItem } from "@/types/inventory"

interface StockChartProps {
  data: InventoryItem[]
}

export function StockChart({ data }: StockChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Group data by category
    const categories: Record<string, { available: number; sold: number }> = {}

    data.forEach((item) => {
      if (!categories[item.category]) {
        categories[item.category] = { available: 0, sold: 0 }
      }
      categories[item.category].available += item.stock_available
      categories[item.category].sold += item.stock_sold
    })

    const categoryNames = Object.keys(categories)
    const availableData = categoryNames.map((cat) => categories[cat].available)
    const soldData = categoryNames.map((cat) => categories[cat].sold)

    // Chart dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 60
    const barWidth = (width - padding * 2) / categoryNames.length / 2 - 10

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Find max value for scaling
    const maxValue = Math.max(...availableData, ...soldData)

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
      const x = padding + i * ((width - padding * 2) / categoryNames.length) + 20

      // Available stock bar
      const availableHeight = (availableData[i] / maxValue) * (height - padding * 2)
      ctx.fillStyle = "#22c55e"
      ctx.fillRect(x, height - padding - availableHeight, barWidth, availableHeight)

      // Sold stock bar
      const soldHeight = (soldData[i] / maxValue) * (height - padding * 2)
      ctx.fillStyle = "#3b82f6"
      ctx.fillRect(x + barWidth + 5, height - padding - soldHeight, barWidth, soldHeight)

      // X-axis labels
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillStyle = "#888"
      ctx.fillText(category, x + barWidth, height - padding + 10)
    })

    // Legend
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"

    // Available legend
    ctx.fillStyle = "#22c55e"
    ctx.fillRect(width - padding - 150, padding, 15, 15)
    ctx.fillStyle = "#888"
    ctx.fillText("Available", width - padding - 130, padding + 7)

    // Sold legend
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(width - padding - 150, padding + 25, 15, 15)
    ctx.fillStyle = "#888"
    ctx.fillText("Sold", width - padding - 130, padding + 32)
  }, [data])

  return (
    <div className="w-full h-[400px] relative">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
    </div>
  )
}
