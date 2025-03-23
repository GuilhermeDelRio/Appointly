import React from "react"
import { Input } from "@/components/ui/input"

interface DataTableColumnFilterProps {
  table: any
  columnKey: string
  placeholder?: string
  className?: string
}

const DataTableColumnFilter: React.FC<DataTableColumnFilterProps> = ({
  table,
  columnKey,
  placeholder = "Filter...",
  className = "",
}) => {
  const column = table.getColumn(columnKey)
  const value = (column?.getFilterValue() as string) ?? ""

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    column?.setFilterValue(event.target.value)
  }

  return (
    <div className="flex items-center py-4">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`max-w-sm ${className}`}
      />
    </div>
  )
}

export default DataTableColumnFilter
