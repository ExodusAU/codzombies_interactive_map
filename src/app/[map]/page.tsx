import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import MapViewer from "../components/MapViewer";
import { findMap, mapHref, mapMetadata, maps, mapSummaries } from "@/lib/maps/registry";

export function generateStaticParams() {
  return maps.map((map) => ({ map: map.id }));
}

export async function generateMetadata(
  props: PageProps<"/[map]">,
): Promise<Metadata> {
  const { map } = await props.params;
  const data = findMap(map);
  return data ? mapMetadata(data) : {};
}

export default async function MapPage(props: PageProps<"/[map]">) {
  const { map } = await props.params;
  const data = findMap(map);
  if (!data) notFound();
  // `/3` and other aliases settle on the map's canonical slug.
  if (data.id !== map) redirect(mapHref(data));

  return (
    <div className="h-dvh w-screen overflow-hidden">
      <MapViewer data={data} maps={mapSummaries} />
    </div>
  );
}
