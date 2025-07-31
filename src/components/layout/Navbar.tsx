"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <ul className="flex space-x-6">
        <li>
          <Link href="/">Dashboard</Link>
          <Link href="/grade-config">Grade-Config</Link>

          <Link href="/grade-input-table">Input Nilai </Link>
        </li>
      </ul>
    </nav>
  );
}
