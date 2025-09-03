import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeletonLoader({rows = 5 , columns = 3}){
    return (
        <div className="w-full overflow-auto">
            <div className="mb-4">
         <Skeleton className="h-8 w-[250px]" />
            </div>
         <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
            {Array(columns)
                .fill()
                .map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableHead>
                ))}
            </TableRow>
            </TableHeader>
            <TableBody>
                {Array(rows).fill().map((_, rowIndex)=>(
                    <TableRow key={rowIndex}>
                    {
                        Array(columns).fill().map((_, colIndex)=>( 
                            <TableCell key={colIndex}>
                                <Skeleton className="h-4 w-full" />
                            </TableCell>
                        ))
                    }
                    </TableRow>
                ))}
            </TableBody>
            </Table>
         </div>
        </div>
    )
}