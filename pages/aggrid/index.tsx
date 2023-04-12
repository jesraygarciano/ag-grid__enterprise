import Image from "next/image";
import { Inter } from "next/font/google";
import AgGridGrouping from "../../components/AgGridGrouping/AgGridGrouping";

export default function AgGrid() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl mb-4">AG Grid Row Grouping Example</h1>
      <AgGridGrouping />
    </main>
  );
}
