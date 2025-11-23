"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface IPaginationProps{
    currentPage: number;
    totalPages: number;
}

export default function TablePagination({ currentPage, totalPages }: IPaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    
    const navigateToPage = (newPage:number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", newPage.toString())
        startTransition(() => {
            router.push(`?${params.toString()}`)
        })
  }
  const changeLimit = (newLimit:string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("limit", newLimit)
    params.set("page","1")
    startTransition(() => {
      router.push(`?${params.toString()}`)
    })
  }
   const currentLimit=searchParams.get("limit")||"10"
    // if (totalPages <= 1) {
    //     return null
    // }
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage <= 1 || isPending}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
          let pageNumber: number;
          if (totalPages <= 5) {
            pageNumber = idx + 1;
          } else if (currentPage <= 3) {
            pageNumber = idx + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = idx + (totalPages - 4);
          } else {
            pageNumber = idx + currentPage - 2;
          }
          return (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => navigateToPage(pageNumber)}
              disabled={isPending}
              className="w-10"
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
      >
        <ChevronRight className="h-4 w-4 mr-1" />
        Next
      </Button>
      <span className="text-sm text-muted-foreground ml-2">
        {/* Page 9 of 20 */}
        Page {currentPage} of {totalPages}
      </span>

      {/* Items per page selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Items per page:</span>
        <Select
          value={currentLimit}
          onValueChange={changeLimit}
          disabled={isPending}
        >
          <SelectTrigger className="w-[70px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}