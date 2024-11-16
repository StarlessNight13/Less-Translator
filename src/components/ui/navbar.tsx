"use client";

import { BookA, Home, Languages } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
const ModeToggle = dynamic(
  () => import("../ThemeToggler").then((module) => module.ModeToggle),
  {
    ssr: false,
  },
);

// get current url

export default function Navbar() {
  const pathname = usePathname(); // Get the current pathname

  return (
    <div className="from-crust to-base flex flex-row justify-between bg-gradient-to-b p-2 sm:p-5">
      <ModeToggle />
      <div className="hover:*:bg-blue flex flex-row-reverse gap-5 *:flex *:flex-row *:items-center *:justify-center *:gap-2 *:rounded *:p-2 *:text-center">
        <Link
          href="/"
          className='border-b-green rounded-b-none data-[aktiv="true"]:border-b-2'
          data-aktiv={pathname === "/"}
        >
          <Home />
          <span className="hidden sm:inline-block">{"Home"}</span>
        </Link>
        <Link
          href="/translation"
          className='border-b-green data-[aktiv="true"]:border-b-2'
          data-aktiv={pathname === "/translation"}
        >
          <Languages />
          <span className="hidden sm:inline-block">{"Translation"}</span>
        </Link>
        <Link
          href="/dictionary"
          className='border-b-green data-[aktiv="true"]:border-b-2'
          data-aktiv={pathname === "/dictionary"}
        >
          <BookA />
          <span className="hidden sm:inline-block"> {"Dictionary"}</span>
        </Link>
      </div>
    </div>
  );
}
