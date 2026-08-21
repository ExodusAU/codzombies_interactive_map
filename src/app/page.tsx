import type { Metadata } from "next";
import MapViewer from "./components/MapViewer";
import { latestMap, mapMetadata, mapSummaries } from "@/lib/maps/registry";

// The main URL always opens the newest map, so a new release becomes the
// landing page just by carrying the highest `number`. Every map also keeps a
// stable `/<slug>` URL (see `[map]/page.tsx`) for sharing a specific one.
export const metadata: Metadata = mapMetadata(latestMap);

export default function Home() {
  return (
    <div className="h-dvh w-screen overflow-hidden">
      <MapViewer data={latestMap} maps={mapSummaries} />
    </div>
  );
}
