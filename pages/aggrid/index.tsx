import Image from "next/image";
import { Inter } from "next/font/google";
import AgGridGrouping from "../../components/AgGridGrouping/AgGridGrouping";
import GroupRows from "../../components/GroupRows/GroupRows";

export default function AgGrid() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl mb-4">NOTION like AG Grid Row Grouping</h1>
      <GroupRows />

      <h1 className="text-xl mb-4 mt-[5rem]">AG Grid Row Grouping Example</h1>
      <AgGridGrouping />
    </main>
  );
}
