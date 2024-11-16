import { type WordReference } from "@/types/Dictionary";
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
interface dataProp {
  Data?: WordReference[];
}

export default function DataTableWR({ Data }: dataProp) {
  const rows = Data?.map((item, index) => {
    return {
      key: index.toString(),
      from: item.from,
      mid: item.mid,
      to: item.to,
    };
  });
  async function copyToClipboard(text: string) {
    if (text.trim().length == 0) return;
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied: " + text);
    } catch (err) {
      console.error("Failed to copy text to clipboard:", err);
    }
  }
  return (
    <>
      <Table className="flex flex-col">
        <TableHeader className="border-b-1 border-teal flex w-full select-none">
          <TableRow className="flex flex-1 items-center justify-center">
            <TableHead className="text-text flex flex-1 items-center justify-center text-center">
              الكلمة العربية
            </TableHead>
            <TableHead className="text-text flex flex-1 items-center justify-center text-center">
              وصف الكلمة
            </TableHead>
            <TableHead className="text-text flex flex-1 items-center justify-center text-center">
              الكلمة الانجليزية
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="flex flex-1 flex-col">
          {rows?.map((row) => {
            return (
              <React.Fragment key={row.key}>
                <TableRow className="bg-surface1 flex flex-1 cursor-pointer text-center">
                  <TableCell
                    className="group/cell flex flex-1 flex-row items-center justify-center gap-2"
                    onClick={() => {
                      if (row.from) {
                        void copyToClipboard(row.from);
                      }
                    }}
                  >
                    {row.from}
                    <Copy className="scale-75 gap-2 opacity-0 transition group-hover/cell:opacity-100" />
                  </TableCell>
                  <TableCell className="flex-1">{row.mid}</TableCell>
                  <TableCell
                    className="group/cell flex flex-1 flex-row items-center justify-center"
                    onClick={() => {
                      if (row.to) {
                        void copyToClipboard(row.to);
                      }
                    }}
                  >
                    {row.to}
                    <Copy className="scale-75 opacity-0 transition group-hover/cell:opacity-100" />
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
          href={"https://www.wordreference.com/"}
          className="text-blue hover:text-primary mx-2"
        >
          wordreference
        </Link>
      </h3>
    </>
  );
}
