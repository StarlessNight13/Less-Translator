import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy } from "lucide-react";
import Link from "next/link";
import React from "react";
import { type Arabdict } from "@/types/Dictionary";

interface dataProp {
  Data?: Arabdict;
}

export default function DataTableAR({ Data }: dataProp) {
  const rows =
    Data?.translation.map((item, index) => {
      return {
        key: index.toString(),
        right: item.right,
        left: item.left,
      };
    }) ?? [];

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
          <TableRow className="flex flex-1 items-center justify-center">
            <TableHead className="text-text flex flex-1 items-center justify-center text-center">
              {"انجليزي"}
            </TableHead>
            <TableHead className="text-text flex flex-1 items-center justify-center text-center">
              {"عربي"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="flex flex-1 flex-col">
          {rows.map((row) => {
            return (
              <React.Fragment key={row.key}>
                <TableRow className="bg-surface1 flex flex-1 cursor-pointer text-center">
                  <TableCell
                    className="group/cell flex flex-1 flex-row items-center justify-center"
                    onClick={() => {
                      if (row.left) {
                        copyTextToClipboard(row.left);
                      }
                    }}
                  >
                    {row.left}
                    <Copy className="scale-75 opacity-0 transition group-hover/cell:opacity-100" />
                  </TableCell>
                  <TableCell
                    className="group/cell flex flex-1 flex-row items-center justify-center gap-2"
                    onClick={() => {
                      if (row.right) {
                        copyTextToClipboard(row.right);
                      }
                    }}
                  >
                    {row.right}
                    <Copy className="scale-75 opacity-0 transition group-hover/cell:opacity-100" />
                  </TableCell>
                  <TableCell className="l bg-blue w-2 text-black" hidden>
                    {"add To Deck"}
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
          href={"https://arabdict.com/"}
          className="text-blue hover:text-primary mx-2"
        >
          ArabDict
        </Link>
      </h3>
    </>
  );
}
