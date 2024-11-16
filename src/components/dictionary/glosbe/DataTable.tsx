import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { type Glosbe } from "@/types/Dictionary";

interface dataProp {
  Data?: Glosbe[];
}

export default function DataTableGL({ Data }: dataProp) {
  const rows = Data?.map((item, index) => {
    return {
      key: index.toString(),
      to: item.to,
      def: item.def,
      exampleTo: item.exampleTo,
      exampleFrom: item.exampleFrom,
    };
  });

  // Function to copy text to clipboard
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast("Copied: " + text);
      })
      .catch((err) => {
        toast("error: " + err);
        console.error("Failed to copy text to clipboard:", err);
      });
  };

  return (
    <>
      <Table className="flex flex-col">
        <TableHeader className="flex w-full select-none">
          <TableRow className="flex flex-1 items-center justify-center border-purple-500">
            <TableHead className="text-text flex flex-1 items-center justify-center text-center">
              الكلمة العربية
            </TableHead>
            <TableHead className="text-text flex flex-1 items-center justify-center text-center">
              وصف الكلمة
            </TableHead>
            <TableHead className="text-text hidden flex-1 items-center justify-center text-center sm:flex">
              مثال
            </TableHead>
            <TableHead className="text-text hidden flex-1 items-center justify-center text-center sm:flex">
              ترجمة المثال
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows?.map((row) => {
            return (
              <React.Fragment key={row.key}>
                <TableRow className="flex flex-1 cursor-pointer text-center">
                  <TableCell
                    className="group/cell flex flex-1 flex-row items-center justify-center gap-2"
                    onClick={() => copyTextToClipboard(row.to)}
                  >
                    {row.to}
                    <Copy className="scale-75 opacity-0 transition group-hover/cell:opacity-100" />
                  </TableCell>
                  <TableCell className="flex-1">{row.def}</TableCell>
                  <TableCell className="hidden flex-1 sm:table-cell">
                    {row.exampleTo}
                  </TableCell>
                  <TableCell className="hidden flex-1 sm:table-cell">
                    {row.exampleFrom}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
      <h3 className="border-t-teal mt-5 w-full flex-grow-0 border-t border-dashed text-center">
        powered by:
        <Link
          href={"https://glosbe.com/"}
          className="text-blue hover:text-primary mx-2"
        >
          Glosbe
        </Link>
        <span className="text-sm">Use their Website for advanced usage</span>
      </h3>
    </>
  );
}
