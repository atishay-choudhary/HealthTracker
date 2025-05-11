import { Tooltip as RechartsTooltip } from "recharts"

const ChartTooltipContent = ({ payload, label }) => {
  if (!payload || payload.length === 0) {
    return null
  }

  return (
    <div className="rounded-md border bg-popover p-4 text-popover-foreground shadow-md">
      <div className="text-sm font-medium">{label}</div>
      <ul className="mt-2 space-y-1">
        {payload.map((item, index) => (
          <li key={index} className="flex items-center justify-between text-xs">
            <span className="mr-2">{item.dataKey}:</span>
            <span className="font-semibold">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Add the missing ChartTooltip component
const ChartTooltip = RechartsTooltip

const ChartContainer = ({ children }) => {
  return <div className="w-full overflow-auto">{children}</div>
}

const ChartLegend = ({ children }) => {
  return <div className="flex items-center">{children}</div>
}

const ChartLegendItem = ({ name, color }) => {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span>{name}</span>
    </div>
  )
}

const Chart = () => {
  return null
}

export { ChartTooltipContent, ChartTooltip, ChartContainer, ChartLegend, ChartLegendItem, Chart }
