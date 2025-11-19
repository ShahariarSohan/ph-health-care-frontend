"use client";

import { formatDateTime } from "@/lib/formatters";



interface IDateCellProps {
  date?: string | Date;
}

export default function DateCell({ date }: IDateCellProps) {
  return <span className="text-sm">{formatDateTime(date!)}</span>;
}