import type { MapData } from "./types";

// Kowakujo — main map data
//
// Positions are percent of the image (0–100). Enable the cursor-coords overlay
// (NEXT_PUBLIC_SHOW_COORDS=true) to read exact percentages by hovering, or use
// the Draw tool for zone outlines.

export const kowakujo: MapData = {
  id: "kowakujo",
  number: 49,
  name: "Kowakujo",
  logo: { src: "/maps/kowakujo_logo.png", width: 701, height: 242 },
  tagline: "Interactive Zombies Map",
  image: "/maps/kowakujo_map.png",
  imageSize: { width: 2912, height: 2912 },

  floors: [
    { id: "ground", label: "Ground" },
    { id: "upper", label: "Upper" },
  ],

  categories: [
    {
      id: "perk",
      label: "Perk Machines",
      color: "#22d3ee",
      kind: "icon",
      glyph: "🥤",
      defaultVisible: true,
      description: "Perk-a-Cola vending machines.",
      group: "Perks",
    },
    {
      id: "utility",
      label: "Pack-a-Punch",
      color: "#f59e0b",
      kind: "icon",
      glyph: "P",
      defaultVisible: true,
      description: "Pack-a-Punch machine.",
      group: "Map Markers",
    },
    {
      id: "box",
      label: "Mystery Box",
      color: "#a855f7",
      kind: "icon",
      glyph: "❓",
      defaultVisible: true,
      description: "Possible Mystery Box spawn locations.",
      group: "Map Markers",
    },
    {
      id: "wallbuy",
      label: "Wall Buys",
      color: "#84cc16",
      kind: "icon",
      glyph: "🔫",
      defaultVisible: false,
      description: "Wall-mounted weapon purchases.",
      group: "Map Markers",
    },
    {
      id: "spawn",
      label: "Spawn / Exfil",
      color: "#ef4444",
      kind: "icon",
      glyph: "🚩",
      defaultVisible: true,
      description: "Player spawn and exfil points.",
      group: "Map Markers",
    },
    {
      id: "ee",
      label: "Easter Egg Steps",
      color: "#ec4899",
      kind: "step",
      defaultVisible: true,
      description: "Numbered main-quest step locations.",
      group: "Quest",
    },
  ],

  // ── Icons / markers ─────────────────────────────────────────────────────
  markers: [
    {
      id: "spawn-point",
      categoryId: "spawn",
      label: "Spawn",
      position: { x: 52.7, y: 95 },
    },
    {
      id: "util-pack-a-punch",
      categoryId: "utility",
      label: "Pack-a-Punch",
      position: { x: 59.7, y: 7.9 },
      icon: "/images/perks/icons/packapunch.png",
      revealImage: "/images/perks/ingame/kowakujo/perk_pack-a-punch.jpg",
    },
    {
      id: "perk-melee-macchiato",
      categoryId: "perk",
      floor: "ground",
      label: "Melee Macchiato",
      position: { x: 14.9, y: 56.4 },
      icon: "/images/perks/icons/meleemacchiato.webp",
      revealImage: "/images/perks/ingame/kowakujo/perk_melee_macchiato.jpg",
    },
    {
      id: "perk-elemental-pop",
      categoryId: "perk",
      floor: "ground",
      label: "Elemental Pop",
      position: { x: 56.2, y: 18.7 },
      icon: "/images/perks/icons/elementalpop.webp",
      revealImage: "/images/perks/ingame/kowakujo/perk_elemental-pop.jpg",
    },
    {
      id: "perk-mule-kick",
      categoryId: "perk",
      floor: "ground",
      label: "Mule Kick",
      position: { x: 47.8, y: 19.5 },
      icon: "/images/perks/icons/mulekick.webp",
    },
    {
      id: "perk-vulture-aid",
      categoryId: "perk",
      floor: "ground",
      label: "Vulture Aid",
      position: { x: 47.2, y: 9 },
      icon: "/images/perks/icons/vultureaid.webp",
      revealImage: "/images/perks/ingame/kowakujo/perk_vulture-aid.jpg",
    },
    {
      id: "perk-phd-flopper",
      categoryId: "perk",
      floor: "ground",
      label: "PHD Flopper",
      position: { x: 39.1, y: 33.3 },
      icon: "/images/perks/icons/phdflopper.webp",
      revealImage: "/images/perks/ingame/kowakujo/perk_phd-flopper.jpg",
    },
    {
      id: "perk-der-wunderfizz",
      categoryId: "perk",
      floor: "ground",
      label: "Der Wunderfizz",
      position: { x: 43.3, y: 36 },
      icon: "/images/perks/icons/derwunderfizz.png",
      revealImage: "/images/perks/ingame/kowakujo/perk_der_wunderfizz.jpg",
    },
    {
      id: "perk-juggernog",
      categoryId: "perk",
      floor: "ground",
      label: "Juggernog",
      position: { x: 56.4, y: 41.3 },
      icon: "/images/perks/icons/juggernog.webp",
      revealImage: "/images/perks/ingame/kowakujo/perk_juggernog.jpg",
    },
    {
      id: "perk-death-perception",
      categoryId: "perk",
      floor: "ground",
      label: "Death Perception",
      position: { x: 28.4, y: 80.8 },
      icon: "/images/perks/icons/deathperception.webp",
      revealImage: "/images/perks/ingame/kowakujo/perk_death_perception.jpg",
    },
    {
      id: "perk-stamin-up",
      categoryId: "perk",
      floor: "ground",
      label: "Stamin-Up",
      position: { x: 53.1, y: 76 },
      icon: "/images/perks/icons/staminup.webp",
      revealImage: "/images/perks/ingame/kowakujo/perk_stamin-up.jpg",
    },
    {
      id: "perk-quick-revive",
      categoryId: "perk",
      floor: "ground",
      label: "Quick Revive",
      position: { x: 57.7, y: 92.9 },
      icon: "/images/perks/icons/quickrevive.webp",
    },
    {
      id: "perk-speed-cola",
      categoryId: "perk",
      floor: "ground",
      label: "Speed Cola",
      position: { x: 58, y: 67.2 },
      icon: "/images/perks/icons/speedcola.webp",
      revealImage: "/images/perks/ingame/kowakujo/perk_speed-cola.jpg",
    },
    {
      id: "perk-wisp-tea",
      categoryId: "perk",
      floor: "ground",
      label: "Wisp Tea",
      position: { x: 79.7, y: 88.7 },
      icon: "/images/perks/icons/wisptea.webp",
    },
    {
      id: "perk-double-tap",
      categoryId: "perk",
      floor: "ground",
      label: "Double Tap",
      position: { x: 88.8, y: 53.1 },
      icon: "/images/perks/icons/doubletap.webp",
      revealImage: "/images/perks/ingame/kowakujo/perk_double-tap.jpg",
    },
  ],

  // ── Named areas ─────────────────────────────────────────────────────────
  areas: [
    {
      id: "shoguns-sanctum",
      label: "Shogun's\nSanctum",
      position: { x: 56.2, y: 10.8 },
      color: "#fcd34d",
      outline: [
        { x: 54.4, y: 14.9 },
        { x: 62, y: 13.3 },
        { x: 60.6, y: 5.7 },
        { x: 52.9, y: 7 },
        { x: 54.4, y: 14.9 },
      ],
    },
    {
      id: "war-room",
      label: "War Room",
      position: { x: 55, y: 15.6 },
      color: "#f43f5e",
      outline: [
        { x: 47.7, y: 8 },
        { x: 50, y: 19.9 },
        { x: 56.5, y: 18.2 },
        { x: 62.7, y: 16.9 },
        { x: 62, y: 13.3 },
        { x: 54.4, y: 14.9 },
        { x: 52.9, y: 7 },
        { x: 47.7, y: 8 },
      ],
    },
    {
      id: "onsen-baths",
      label: "Onsen\nBaths",
      position: { x: 55.2, y: 25.4 },
      color: "#aea9b1",
      outline: [
        { x: 52.6, y: 30 },
        { x: 53.7, y: 36.5 },
        { x: 60.3, y: 35.6 },
        { x: 59.1, y: 29 },
        { x: 58.4, y: 29.1 },
        { x: 56.5, y: 18.1 },
        { x: 51.2, y: 19.6 },
        { x: 51.6, y: 21.5 },
        { x: 52, y: 21.5 },
        { x: 53.4, y: 29.9 },
        { x: 52.6, y: 30 },
      ],
    },
    {
      id: "workshop",
      label: "Workshop",
      position: { x: 39.2, y: 15.3 },
      color: "#fb923c",
      outline: [
        { x: 49.3, y: 16.2 },
        { x: 48.2, y: 11.3 },
        { x: 42.7, y: 12.2 },
        { x: 42.5, y: 11 },
        { x: 34.8, y: 12.3 },
        { x: 36.1, y: 19.9 },
        { x: 37.2, y: 19.9 },
        { x: 43.7, y: 18.3 },
        { x: 43.6, y: 17.3 },
        { x: 49.3, y: 16.2 },
      ],
    },
    {
      id: "storage-rooms",
      label: "Storage\nRooms",
      position: { x: 41.3, y: 25.7 },
      color: "#6366f1",
      outline: [
        { x: 43.8, y: 18.3 },
        { x: 37.1, y: 19.8 },
        { x: 39.1, y: 30.6 },
        { x: 38.4, y: 30.7 },
        { x: 40, y: 39.9 },
        { x: 48.9, y: 38.5 },
        { x: 47.3, y: 29.2 },
        { x: 45.7, y: 29.4 },
        { x: 43.8, y: 18.3 },
      ],
    },
    {
      id: "tenshu-entrance",
      label: "Tenshu\nEntrance",
      position: { x: 51, y: 40.4 },
      color: "#d946ef",
      outline: [
        { x: 45.8, y: 39.2 },
        { x: 46.8, y: 44.3 },
        { x: 55, y: 42.9 },
        { x: 54.7, y: 41.5 },
        { x: 55.8, y: 40.4 },
        { x: 55.1, y: 36.3 },
        { x: 53.7, y: 36.5 },
        { x: 52.7, y: 30.1 },
        { x: 53.4, y: 29.9 },
        { x: 52, y: 21.4 },
        { x: 51.6, y: 21.5 },
        { x: 51.2, y: 19.7 },
        { x: 50, y: 19.9 },
        { x: 49.3, y: 16.3 },
        { x: 43.6, y: 17.2 },
        { x: 45.6, y: 29.4 },
        { x: 47.3, y: 29.2 },
        { x: 48.9, y: 38.5 },
        { x: 45.8, y: 39.1 },
      ],
    },
    {
      id: "central-courtyard",
      label: "Central\nCourtyard",
      position: { x: 52.2, y: 51.1 },
      color: "#f59e0b",
      outline: [
        { x: 46.8, y: 44.2 },
        { x: 44.2, y: 44.7 },
        { x: 44.2, y: 45.2 },
        { x: 43, y: 45.4 },
        { x: 43.5, y: 47.4 },
        { x: 44.2, y: 47.4 },
        { x: 44.6, y: 48.9 },
        { x: 44.8, y: 51.1 },
        { x: 44.8, y: 54.9 },
        { x: 44.8, y: 58.8 },
        { x: 54.4, y: 58.9 },
        { x: 57.5, y: 58.9 },
        { x: 61.3, y: 55.5 },
        { x: 64, y: 58.1 },
        { x: 66.5, y: 55.4 },
        { x: 64.6, y: 53.7 },
        { x: 64.4, y: 53.9 },
        { x: 63.3, y: 52.7 },
        { x: 62.9, y: 51.5 },
        { x: 63, y: 50.6 },
        { x: 63.5, y: 49.6 },
        { x: 59, y: 45.5 },
        { x: 59.8, y: 44.6 },
        { x: 57.6, y: 42.8 },
        { x: 56.5, y: 42.8 },
        { x: 55.9, y: 42.7 },
        { x: 46.8, y: 44.4 },
        { x: 46.8, y: 44.2 },
      ],
    },
    {
      id: "hillslide",
      label: "Hill\nSlide",
      position: { x: 54, y: 62.5 },
      color: "#60a5fa",
      outline: [
        { x: 54.4, y: 58.9 },
        { x: 57.5, y: 58.9 },
        { x: 57.4, y: 59.8 },
        { x: 57.4, y: 60.6 },
        { x: 57.6, y: 62.1 },
        { x: 56.3, y: 63.8 },
        { x: 55.1, y: 64.6 },
        { x: 54.3, y: 65 },
        { x: 53.2, y: 65 },
        { x: 53.2, y: 66.3 },
        { x: 53.7, y: 66.3 },
        { x: 53.9, y: 67.4 },
        { x: 48.9, y: 67.4 },
        { x: 50.3, y: 66.6 },
        { x: 50.5, y: 64.9 },
        { x: 51.2, y: 62.9 },
        { x: 52.3, y: 61.1 },
        { x: 53.9, y: 60 },
        { x: 54.4, y: 58.9 },
      ],
    },
    {
      id: "kitchens",
      label: "Kitchens",
      position: { x: 79.1, y: 54.3 },
      color: "#38bdf8",
      outline: [
        { x: 64, y: 58.1 },
        { x: 66.6, y: 55.4 },
        { x: 66.8, y: 55.5 },
        { x: 68.2, y: 54.1 },
        { x: 71.6, y: 54.2 },
        { x: 72, y: 52.1 },
        { x: 73.1, y: 52.3 },
        { x: 75.4, y: 43.6 },
        { x: 87.3, y: 46.6 },
        { x: 85.7, y: 52.2 },
        { x: 89.9, y: 53.2 },
        { x: 85.2, y: 70.6 },
        { x: 81, y: 69.4 },
        { x: 82.4, y: 63.8 },
        { x: 77.1, y: 62.4 },
        { x: 77.3, y: 61.7 },
        { x: 72.5, y: 58.9 },
        { x: 72.5, y: 58.1 },
        { x: 70, y: 58.1 },
        { x: 67.2, y: 59.6 },
        { x: 65.8, y: 60.8 },
        { x: 63.7, y: 58.6 },
        { x: 64.1, y: 58.2 },
        { x: 64, y: 58.1 },
      ],
    },
    {
      id: "flower-garden",
      label: "Flower\nGarden",
      position: { x: 81.5, y: 79.5 },
      color: "#4ade80",
      outline: [
        { x: 81, y: 69.5 },
        { x: 85.2, y: 70.7 },
        { x: 85.3, y: 70.1 },
        { x: 88, y: 70 },
        { x: 88.8, y: 76.9 },
        { x: 89.2, y: 76.9 },
        { x: 89.8, y: 82.5 },
        { x: 91.4, y: 82.4 },
        { x: 92, y: 83.8 },
        { x: 91.8, y: 85.3 },
        { x: 90.2, y: 87.5 },
        { x: 88.2, y: 88.7 },
        { x: 87.5, y: 88.7 },
        { x: 87, y: 88.1 },
        { x: 85.9, y: 87.8 },
        { x: 85.4, y: 88.3 },
        { x: 85.4, y: 88.8 },
        { x: 85.4, y: 89.4 },
        { x: 84.7, y: 89.8 },
        { x: 84.2, y: 89.1 },
        { x: 83, y: 89.7 },
        { x: 81.7, y: 90.5 },
        { x: 80.1, y: 90.6 },
        { x: 79.6, y: 90.4 },
        { x: 78.9, y: 90.6 },
        { x: 78, y: 90.5 },
        { x: 76.7, y: 90.4 },
        { x: 76, y: 89.3 },
        { x: 73.8, y: 87.9 },
        { x: 73.5, y: 87.4 },
        { x: 73.9, y: 87 },
        { x: 72.5, y: 86.2 },
        { x: 72.6, y: 86 },
        { x: 73.1, y: 85.9 },
        { x: 73.9, y: 85.7 },
        { x: 74.2, y: 85.3 },
        { x: 74.3, y: 84.7 },
        { x: 73.6, y: 84.8 },
        { x: 73.6, y: 83.1 },
        { x: 72.6, y: 81.9 },
        { x: 72.5, y: 80.9 },
        { x: 71.9, y: 80.8 },
        { x: 71.9, y: 79.5 },
        { x: 70, y: 79.5 },
        { x: 70, y: 76.6 },
        { x: 71.8, y: 76.7 },
        { x: 71.8, y: 75.2 },
        { x: 70.3, y: 75.2 },
        { x: 70.3, y: 72.7 },
        { x: 70.9, y: 72.6 },
        { x: 70.5, y: 70.6 },
        { x: 75.2, y: 69.6 },
        { x: 74.3, y: 66.2 },
        { x: 75.9, y: 65.7 },
        { x: 81.6, y: 67 },
        { x: 81, y: 69.5 },
      ],
    },
    {
      id: "gatehouse",
      label: "Gatehouse",
      position: { x: 62.7, y: 78 },
      color: "#f472b6",
      outline: [
        { x: 55.3, y: 68.6 },
        { x: 58.7, y: 69.1 },
        { x: 62.3, y: 68 },
        { x: 63.6, y: 73.7 },
        { x: 65.1, y: 73.4 },
        { x: 65.7, y: 76.2 },
        { x: 70, y: 76.2 },
        { x: 70, y: 80.5 },
        { x: 69.6, y: 80.6 },
        { x: 69.4, y: 81 },
        { x: 65.8, y: 81 },
        { x: 65.5, y: 80.8 },
        { x: 64.6, y: 80.9 },
        { x: 64.3, y: 81.2 },
        { x: 64.2, y: 81.6 },
        { x: 60.4, y: 81.6 },
        { x: 60.2, y: 83.6 },
        { x: 57.6, y: 83.7 },
        { x: 57.5, y: 82.4 },
        { x: 55.4, y: 82.4 },
        { x: 55.3, y: 76.2 },
        { x: 55.3, y: 68.6 },
      ],
    },
    {
      id: "staging-area",
      label: "Staging\nArea",
      position: { x: 50.2, y: 75.3 },
      color: "#34d399",
      outline: [
        { x: 55.4, y: 82.4 },
        { x: 55.3, y: 76.2 },
        { x: 55.3, y: 67.6 },
        { x: 54, y: 67.5 },
        { x: 48.9, y: 67.4 },
        { x: 48.9, y: 68.8 },
        { x: 44.4, y: 68.8 },
        { x: 44.2, y: 72.3 },
        { x: 44.1, y: 73.7 },
        { x: 45.4, y: 73.7 },
        { x: 45.5, y: 74.9 },
        { x: 44.8, y: 75 },
        { x: 45.3, y: 77.8 },
        { x: 45.9, y: 77.8 },
        { x: 46.5, y: 80.6 },
        { x: 45.7, y: 80.9 },
        { x: 47.7, y: 85.3 },
        { x: 50.1, y: 84.4 },
        { x: 51.3, y: 84.1 },
        { x: 52, y: 84 },
        { x: 52, y: 82.4 },
        { x: 55.4, y: 82.4 },
      ],
    },
    {
      id: "outer-ward",
      label: "Outer\nWard",
      position: { x: 53.1, y: 91.2 },
      color: "#a78bfa",
      outline: [
        { x: 47, y: 85.7 },
        { x: 47.9, y: 88.6 },
        { x: 47.8, y: 92.4 },
        { x: 47.7, y: 95.2 },
        { x: 47.6, y: 95.6 },
        { x: 48.3, y: 97.4 },
        { x: 50.3, y: 98.5 },
        { x: 52.1, y: 98.6 },
        { x: 54.3, y: 98.2 },
        { x: 55.5, y: 97.5 },
        { x: 56.2, y: 97.1 },
        { x: 57.1, y: 96 },
        { x: 57.9, y: 95.4 },
        { x: 58.9, y: 94.3 },
        { x: 59.8, y: 92.5 },
        { x: 60, y: 91.5 },
        { x: 60, y: 88 },
        { x: 62.1, y: 86.8 },
        { x: 62.2, y: 86.3 },
        { x: 61.4, y: 84.6 },
        { x: 61.6, y: 84 },
        { x: 61.4, y: 83.8 },
        { x: 60.2, y: 83.6 },
        { x: 57.6, y: 83.8 },
        { x: 57.6, y: 84.1 },
        { x: 56.1, y: 84 },
        { x: 52.6, y: 83.9 },
        { x: 51.6, y: 84.1 },
        { x: 50.7, y: 84.2 },
        { x: 48.6, y: 84.9 },
        { x: 47, y: 85.7 },
      ],
    },
    {
      id: "stables",
      label: "Stables",
      position: { x: 35.7, y: 77.2 },
      color: "#eab308",
      outline: [
        { x: 44.8, y: 75 },
        { x: 45.3, y: 77.8 },
        { x: 43.4, y: 78.2 },
        { x: 43.5, y: 79.2 },
        { x: 44, y: 79.2 },
        { x: 44.4, y: 81.5 },
        { x: 41.3, y: 82.9 },
        { x: 40.9, y: 83.4 },
        { x: 40, y: 83.4 },
        { x: 39.9, y: 84.8 },
        { x: 33.9, y: 84.8 },
        { x: 32.4, y: 84.3 },
        { x: 33, y: 82.9 },
        { x: 31.3, y: 82.3 },
        { x: 30.8, y: 82.8 },
        { x: 27, y: 82.3 },
        { x: 27.7, y: 76.1 },
        { x: 27, y: 76.1 },
        { x: 27.1, y: 75.8 },
        { x: 24.6, y: 75.6 },
        { x: 25.2, y: 72.3 },
        { x: 25.9, y: 72.3 },
        { x: 25.9, y: 72.1 },
        { x: 28, y: 72.4 },
        { x: 28.3, y: 70.7 },
        { x: 31, y: 70.9 },
        { x: 31.5, y: 68 },
        { x: 39.7, y: 68 },
        { x: 39.7, y: 70 },
        { x: 42.2, y: 72.7 },
        { x: 42.6, y: 72.8 },
        { x: 42.7, y: 73.8 },
        { x: 42.9, y: 75.3 },
        { x: 44.8, y: 75 },
      ],
    },
    {
      id: "training-area",
      label: "Training\nArea",
      position: { x: 21.4, y: 64.3 },
      color: "#ef4444",
      outline: [
        { x: 25.1, y: 72.3 },
        { x: 24.5, y: 75.9 },
        { x: 18.4, y: 75.1 },
        { x: 19, y: 70.9 },
        { x: 19.2, y: 70.7 },
        { x: 19.4, y: 68.9 },
        { x: 18.7, y: 68.8 },
        { x: 18.5, y: 68.4 },
        { x: 16.4, y: 67.3 },
        { x: 14.7, y: 67 },
        { x: 12.9, y: 66.7 },
        { x: 12.6, y: 66.1 },
        { x: 12.5, y: 65.3 },
        { x: 13.5, y: 64.5 },
        { x: 15.4, y: 63.9 },
        { x: 15.9, y: 62.9 },
        { x: 15.6, y: 61.9 },
        { x: 16.3, y: 60.8 },
        { x: 16.2, y: 60.3 },
        { x: 16.6, y: 59.7 },
        { x: 17.4, y: 59.1 },
        { x: 17.6, y: 58.2 },
        { x: 19.1, y: 57.3 },
        { x: 19.6, y: 57.2 },
        { x: 20.3, y: 57.4 },
        { x: 20.8, y: 57.8 },
        { x: 21.2, y: 57.6 },
        { x: 22.6, y: 57.8 },
        { x: 23.6, y: 57.9 },
        { x: 24.6, y: 57.7 },
        { x: 25.7, y: 57 },
        { x: 30.8, y: 57 },
        { x: 30.8, y: 59.9 },
        { x: 30.5, y: 64 },
        { x: 28.8, y: 63.9 },
        { x: 28, y: 70.5 },
        { x: 27.8, y: 70.6 },
        { x: 24.1, y: 70 },
        { x: 24.1, y: 70.3 },
        { x: 24.9, y: 70.6 },
        { x: 24.7, y: 72.3 },
        { x: 25.1, y: 72.3 },
      ],
    },
    {
      id: "tea-garden",
      label: "Tea\nGarden",
      position: { x: 35.5, y: 58.2 },
      color: "#14b8a6",
      outline: [
        { x: 30.8, y: 55.6 },
        { x: 30.7, y: 61.2 },
        { x: 32.5, y: 62.3 },
        { x: 33, y: 62.5 },
        { x: 34.5, y: 62.5 },
        { x: 34.6, y: 64.2 },
        { x: 37.8, y: 64.2 },
        { x: 37.8, y: 62.4 },
        { x: 39, y: 62.4 },
        { x: 40.3, y: 60.6 },
        { x: 40.3, y: 56.2 },
        { x: 42.2, y: 56.2 },
        { x: 42.2, y: 55 },
        { x: 44.8, y: 55 },
        { x: 44.8, y: 51.2 },
        { x: 41.4, y: 51.2 },
        { x: 41.3, y: 52.8 },
        { x: 36.3, y: 52.8 },
        { x: 36.1, y: 50.6 },
        { x: 32.7, y: 50.7 },
        { x: 32.7, y: 51.9 },
        { x: 33.4, y: 52 },
        { x: 33.4, y: 53 },
        { x: 32.8, y: 53.1 },
        { x: 32.8, y: 54.9 },
        { x: 30.8, y: 55.6 },
      ],
    },
    {
      id: "collapsed-study",
      label: "Collapsed\nStudy",
      position: { x: 43.2, y: 34.2 },
      floor: "upper",
      color: "#c084fc",
      outline: [
        { x: 38.4, y: 30.7 },
        { x: 40, y: 39.9 },
        { x: 48.9, y: 38.5 },
        { x: 48.5, y: 35.9 },
        { x: 53.4, y: 35 },
        { x: 53.1, y: 33 },
        { x: 48.1, y: 34 },
        { x: 47.3, y: 29.2 },
        { x: 38.4, y: 30.7 },
      ],
    },
    {
      id: "meditation-room",
      label: "Meditation\nRoom",
      position: { x: 40.8, y: 21.4 },
      floor: "upper",
      color: "#a3e635",
      outline: [
        { x: 37.1, y: 19.8 },
        { x: 43.8, y: 18.3 },
        { x: 44.6, y: 23.4 },
        { x: 38.1, y: 24.8 },
        { x: 37.1, y: 19.8 },
      ],
    },
    {
      id: "tenshu-eaves",
      label: "Tenshu\nEaves",
      position: { x: 46.9, y: 15 },
      floor: "upper",
      color: "#2dd4bf",
      outline: [
        [
          { x: 51.5, y: 21.5 },
          { x: 51.2, y: 19.6 },
          { x: 50, y: 19.9 },
          { x: 49.3, y: 16.2 },
          { x: 43.6, y: 17.2 },
          { x: 44.2, y: 20.8 },
          { x: 45.2, y: 20.7 },
          { x: 44.8, y: 18.6 },
          { x: 45.1, y: 17.9 },
          { x: 47.8, y: 17.5 },
          { x: 48.5, y: 21.9 },
          { x: 51.6, y: 21.5 },
        ],
        [
          { x: 47.3, y: 29.2 },
          { x: 45.7, y: 29.5 },
          { x: 44.9, y: 24.8 },
          { x: 46.3, y: 24.6 },
          { x: 47.3, y: 29.2 },
        ],
        [
          { x: 52.3, y: 22.8 },
          { x: 51.3, y: 23 },
          { x: 51.6, y: 24.9 },
          { x: 52.6, y: 24.8 },
          { x: 52.3, y: 22.8 },
        ],
      ],
    },
  ],

  // ── Easter eggs ─────────────────────────────────────────────────────────
  eggs: [
    {
      id: "main-quest",
      name: "Main Quest",
      color: "#ec4899",
      stages: [
        // ────────────────────────────────────────────────────────────────
        //  STAGE 1 — Acquire the World Seed
        // ────────────────────────────────────────────────────────────────
        {
          id: "stage-1",
          title: "Acquire the World Seed",
          steps: [
            {
              id: "s1-kitchens",
              title: "Recapture the Ward — Kitchens",
              instruction:
                "Recapture the Ward in the **Kitchens** by standing next to the dragon banner while fending off zombies.",
              icon: "/images/easteregg/dragonicon.png",
              path: [
                { x: 52.7, y: 95.1 },
                { x: 58.6, y: 84 },
                { x: 60.1, y: 78.8 },
                { x: 82.4, y: 77.6 },
                { x: 84.2, y: 63 },
                { x: 79.7, y: 60.8 },
                { x: 73.7, y: 53.8 },
              ],
              revealImages: [
                "/images/easteregg/kowakujo/20260628132934_1.jpg",
                "/images/easteregg/kowakujo/20260628132939_1.jpg",
              ],
            },
            {
              id: "s1-training",
              title: "Recapture the Ward — Training Area",
              instruction:
                "Recapture the Ward in the **Training Area** by standing next to the dragon banner while fending off zombies.",
              icon: "/images/easteregg/dragonicon.png",
              path: [
                { x: 73.7, y: 53.8 },
                { x: 66.9, y: 57.4 },
                { x: 60.7, y: 53.3 },
                { x: 45, y: 53.5 },
                { x: 20.8, y: 61 },
              ],
              revealImages: [
                "/images/easteregg/kowakujo/20260628133103_1.jpg",
                "/images/easteregg/kowakujo/20260628133112_1.jpg",
              ],
            },
            {
              id: "s1-open-tenshu-gate",
              title: "Open the Tenshu Entrance",
              instruction:
                "After both wards are recaptured, return to the Central Courtyard and interact with the door marked by two red Oni glyphs to open the Tenshu Entrance.",
              icon: "/images/easteregg/star.svg",
              path: [
                { x: 20.8, y: 61 },
                { x: 46, y: 53.3 },
                { x: 48.3, y: 44.1 },
              ],
              revealCaption:
                "**Central Courtyard:** Once the **Training Area** and **Kitchens** wards are both recaptured, the gate with two red Oni glyphs becomes interactable.\n\nInteract with it to remove the glyphs and open the path into **Tenshu Entrance**.",
            },
            {
              id: "s1-hanko",
              title: "Acquire the Shogun's Hanko",
              instruction:
                "Defeat the Oni in the War Room and collect the Shogun's Hanko.",
              icon: "/images/easteregg/star.svg",
              path: [
                { x: 48.3, y: 44.1 },
                { x: 50.5, y: 32.7 },
                { x: 42.3, y: 34.4 },
                { x: 38.5, y: 16.3 },
                { x: 51.6, y: 13.7 },
              ],
              revealImages: [
                "/images/easteregg/kowakujo/20260628133428_1.jpg",
                "/images/easteregg/kowakujo/20260628133431_1.jpg",
                "/images/easteregg/kowakujo/20260628133508_1.jpg",
                "/images/easteregg/kowakujo/20260628133547_1.jpg",
              ],
              revealCaption:
                "**Route:** On the way to the **War Room**, detour through **PHD Flopper**; you will need it soon.\n\n**Fight:** Enter the **War Room** and defeat the armoured zombies and the Oni.\n\n**Finish:** The Oni drops **Shogun's Hanko**. Collect it, then open the door to the **Shogun's Sanctum**.",
            },
            {
              id: "s1-ceramic-shard",
              title: "Broken Ceramic Shard",
              instruction:
                "Find the ceramic shard near the pool of blood by the Pack-a-Punch stairs. This is part of Evidence Box #4 but can be completed early.",
              icon: "/images/easteregg/star.svg",
              path: [
                { x: 51.6, y: 13.7 },
                { x: 58.8, y: 11.7 },
              ],
              revealImages: [
                "/images/easteregg/kowakujo/20260628133535_1.jpg",
                "/images/easteregg/kowakujo/20260628133538_1.jpg",
              ],
            },
            {
              id: "s1-unlock-pap",
              title: "Unlock Pack-a-Punch",
              instruction:
                "Defeat zombies around the World Seed to unlock Pack-a-Punch.",
              icon: "/images/easteregg/star.svg",
              iconPosition: { x: 58.8, y: 11.7 },
              revealImages: [
                "/images/easteregg/kowakujo/20260628133552_1.jpg",
                "/images/easteregg/kowakujo/20260628133643_1.jpg",
                "/images/easteregg/kowakujo/20260628133647_1.jpg",
              ],
              revealCaption:
                "**World Seed:** Walk up the stairs to the seed beside **Pack-a-Punch**.\n\nLure zombies close enough that they glow purple, then kill them near the seed to charge it. When the charge is complete, **Pack-a-Punch** unlocks.",
            },
          ],
        },

        // ────────────────────────────────────────────────────────────────
        //  STAGE 2 — Obtain the Nekomancer Wonder Weapon
        // ────────────────────────────────────────────────────────────────
        {
          id: "stage-2",
          title: "Obtain the Nekomancer Wonder Weapon",
          steps: [
            {
              id: "s2-furin",
              title: "Find the Furin (Bell)",
              instruction:
                "Find the **Furin** (Bell) in one of three locations: Training Area, Stables, or Staging Area.",
              locations: [
                {
                  position: { x: 19.7, y: 69 },
                  text: "**Training Area:** Facing the weapon wall buy, the bell hangs on the right side.",
                  revealImage: "/images/easteregg/kowakujo/20260628133928_1.jpg",
                },
                {
                  position: { x: 37.6, y: 72.8 },
                  text: "**Stables:** Facing the centre barn opening that collapses into the lava, the bell hangs on the right side of the doorway.",
                  revealImage: "/images/easteregg/kowakujo/20260628133949_1.jpg",
                },
                {
                  position: { x: 50.1, y: 84.2 },
                  text: "**Staging Area:** Looking at the building near the Outer Ward, the bell hangs from the left rafter.",
                  revealImage: "/images/easteregg/kowakujo/20260628134019_1.jpg",
                },
              ],
            },
            {
              id: "s2-maneki-neko",
              title: "Obtain the Maneki-Neko (Cat Statue)",
              instruction:
                "Find the **Maneki-Neko** (Cat Statue) in one of three spots in the Gatehouse or Kitchens.",
              locations: [
                {
                  position: { x: 60.9, y: 71.9 },
                  text: "**Gatehouse:** Entering from the Speed Cola door, the cat is on a crate along the right wall (opposite the cells).",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628134040_1.jpg",
                    "/images/easteregg/kowakujo/20260628134044_1.jpg",
                  ],
                },
                {
                  position: { x: 73.8, y: 51.5 },
                  text: "**Kitchens:** Facing the outside hole, the cat is on a barrel in the corner.",
                  revealImages: ["/images/easteregg/kowakujo/20260628134152_1.jpg"],
                },
                {
                  position: { x: 86.5, y: 57.1 },
                  text: "**Kitchens:** Standing at the **Double Tap** machine facing the Flower Garden, the cat is in the centre of the room on a barrel.",
                  revealImages: ["/images/easteregg/kowakujo/20260628134132_1.jpg"],
                },
              ],
            },
            {
              id: "s2-karakuri",
              title: "Get the Karakuri (Doll)",
              instruction:
                "Find the **Karakuri** (Doll) in one of the marked Storage Rooms or Workshop spots.",
              locations: [
                {
                  position: { x: 36.3, y: 17.1 },
                  text: "**Workshop:** Facing the stairs, the doll sits on the floor along the left wall.",
                  revealImage: "/images/easteregg/kowakujo/20260628133412_1.jpg",
                },
                {
                  position: { x: 44.1, y: 22.6 },
                  text: "**Storage Rooms:** In the room closest to the Workshop, facing outside — the doll sits next to the lantern and scrolls on the desk.",
                  revealImage: "/images/easteregg/kowakujo/20260628134420_1.jpg",
                },
                {
                  position: { x: 46.1, y: 33 },
                  text: "**Storage Rooms:** On the opposite side of the **PHD Flopper** machine, the doll lies on the floor next to some broken vases.",
                  revealImage: "/images/easteregg/kowakujo/20260628134444_1.jpg",
                },
              ],
            },
            {
              id: "s2-craft-maneki-neko",
              title: "Craft the Maneki-Neko",
              instruction:
                "Craft the **Maneki-Neko** on the worktable in the Workshop.",
              icon: "/images/easteregg/craft.svg",
              iconPosition: { x: 44.9, y: 12.6 },
              revealImages: [
                "/images/easteregg/kowakujo/stage_02_step_04.jpg",
                "/images/easteregg/kowakujo/20260628134509_1.jpg",
              ],
              revealCaption:
                "**Workshop:** With all three parts collected, craft the **Maneki-Neko** on the worktable to the left of **Vulture Aid**.\n\nPick it up once crafting finishes.\n\n**Important:** The Maneki-Neko is tactical equipment used later. If you use it, you can recraft another one at this bench.",
            },
            {
              id: "s2-upgrade-maneki-neko",
              title: "Upgrade the Maneki-Neko",
              instruction:
                "Complete the timed archery event in Central Courtyard, gather supplies, then upgrade the Maneki-Neko at the Workshop bench.",
              icon: "/images/easteregg/craft.svg",
              locations: [
                {
                  label: "1",
                  position: { x: 38.7, y: 12.6 },
                  text: "Obtain a **Combat Bow** via a drop or craft one from the crafting table.",
                  revealImage: "/images/easteregg/kowakujo/20260628150213_1.jpg",
                },
                {
                  label: "2",
                  position: { x: 49.8, y: 43.2 },
                  text: "Activate the **Ghost Sniper trap** above the **Central Courtyard** (before **Tenshu Entrance**). Look through the wall holes and shoot the blue targets with the **Combat Bow**. Move around the big tree hitting all targets within the time limit. Interact with the coloured masks that spawn, then collect the **White Powder** from the holes where you took the first shot.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628150213_1_dup2.jpg",
                    "/images/easteregg/kowakujo/20260628150221_1.jpg",
                    "/images/easteregg/kowakujo/20260628150228_1.jpg",
                    "/images/easteregg/kowakujo/20260628152402_1.jpg",
                    "/images/easteregg/kowakujo/20260628152406_1.jpg",
                  ],
                },
                {
                  label: "3",
                  // Trail start = destination (stove); route runs back to the archery spot.
                  path: [
                    { x: 76.4, y: 51.7 },
                    { x: 75.1, y: 55.2 },
                    { x: 66.6, y: 57.5 },
                    { x: 48.4, y: 45.2 },
                    { x: 49.8, y: 43.2 },
                  ],
                  text: "**Kitchens — Coal:** Go to the stove, prone, and interact inside the fire place to collect the coal.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628145241_1.jpg",
                    "/images/easteregg/kowakujo/20260628145243_1.jpg",
                    "/images/easteregg/kowakujo/20260628145246_1.jpg",
                  ],
                },
                {
                  label: "4",
                  path: [
                    { x: 86.1, y: 55 },
                    { x: 76.4, y: 51.7 },
                  ],
                  text: "**Kitchens — Matches:** Facing the **Double Tap** machine, the matches are on the bottom of the shelf.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628145105_1.jpg",
                    "/images/easteregg/kowakujo/20260628145102_1.jpg",
                  ],
                },
                {
                  label: "5",
                  path: [
                    { x: 45.1, y: 14.1 },
                    { x: 39.1, y: 16.5 },
                    { x: 42.3, y: 34.1 },
                    { x: 49.9, y: 32.5 },
                    { x: 51.1, y: 37.7 },
                    { x: 48.6, y: 45 },
                    { x: 65.8, y: 56.9 },
                    { x: 78.7, y: 53.3 },
                    { x: 86.1, y: 55 },
                  ],
                  text: "Return to the **Workshop** bench next to **Vulture Aid** and interact to craft the upgraded **Maneki-Neko** tactical. You can recraft it anytime for salvage cost.",
                  revealImage: "/images/easteregg/kowakujo/20260628134509_1_dup2.jpg",
                },
              ],
            },
            {
              id: "s2-cage",
              title: "Get the Cage at the Castle",
              instruction:
                "Drop the cage from the Tenshu Eaves using PHD Flopper, then collect it.",
              icon: "/images/easteregg/star.svg",
              iconPosition: { x: 46.7, y: 28.2 },
              revealImages: [
                "/images/easteregg/kowakujo/20260628133817_1.jpg",
                "/images/easteregg/kowakujo/20260628133844_1.jpg",
              ],
              revealCaption:
                "**Tenshu Entrance:** Find the cage near the cherry blossom tree.\n\nGet **PHD Flopper** from the **Storage Rooms**, then dolphin-dive under the cage so the landing explosion knocks it down. Collect the cage after it drops.",
            },
            {
              id: "s2-lava",
              title: "Throw the Cage into Lava",
              instruction:
                "Once you have the cage, throw it into lava to free the cat.",
              icon: "/images/easteregg/flame.svg",
              path: [
                { x: 46.7, y: 28.2 },
                { x: 49.9, y: 30.9 },
                { x: 51, y: 38.8 },
                { x: 47.2, y: 51.4 },
                { x: 23.5, y: 60 },
                { x: 23.5, y: 58.2 },
              ],
              revealImage: "/images/easteregg/kowakujo/20260628133915_1.jpg",
              revealCaption:
                "Pick up the cage and throw it into any body of **lava** to destroy the cage and free the cat.\n\n**Note:** Some lava can harden temporarily, but the outer lava areas never fully seal and can always be used.",
            },
            {
              id: "s2-paw-prints",
              title: "Follow the Paw Prints",
              instruction:
                "Follow and clear the paw-print trails in one of four locations: Training Area, Stables, Flower Garden, or Kitchens.",
              revealCaption:
                "After building the **Maneki-Neko**, one of four paw-print starts is chosen at random each match: **Stables**, **Flower Garden**, **Kitchens**, or **Training Area**.\n\nKill a zombie on the correct start location to reveal paw prints in its blood. Follow the prints, then kill a zombie at the next indicated spot (approximately 5 steps away). Repeat until the prints form a circle.\n\nWhen the lava is raised in that area, throw the **Maneki-Neko** into the centre of the circle to spawn the Abomination. If the lava is solid, two explosives can break it.",
              locations: [
                {
                  label: "1",
                  color: "#fb923c",
                  icon: "/images/easteregg/paw.svg",
                  path: [
                    { x: 24.6, y: 73.7 },
                    { x: 15.8, y: 64.4 },
                  ],
                  text: "**Training Area:** At the entrance between the Training Area and Stables.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628134837_1.jpg",
                    "/images/easteregg/kowakujo/20260628134840_1.jpg",
                    "/images/easteregg/kowakujo/20260628135415_1.jpg",
                    "/images/easteregg/kowakujo/20260628135420_1.jpg",
                    "/images/easteregg/kowakujo/20260628135431_1.jpg",
                  ],
                },
                {
                  label: "2",
                  color: "#fb923c",
                  icon: "/images/easteregg/paw.svg",
                  path: [
                    { x: 44.8, y: 76.3 },
                    { x: 42.1, y: 77 },
                    { x: 39.3, y: 83.2 },
                    { x: 34, y: 83.3 },
                    { x: 33, y: 79.2 },
                  ],
                  text: "**Stables:** At the entrance between the Stables and Staging Area.",
                },
                {
                  label: "3",
                  color: "#fb923c",
                  icon: "/images/easteregg/paw.svg",
                  path: [
                    { x: 83, y: 70.8 },
                    { x: 81.6, y: 76.7 },
                    { x: 76.2, y: 82.1 },
                    { x: 79.2, y: 88.2 },
                  ],
                  text: "**Flower Garden:** At the entrance between the Flower Garden and Kitchens.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629073724_1.jpg",
                    "/images/easteregg/kowakujo/20260629073748_1.jpg",
                    "/images/easteregg/kowakujo/20260629075926_1.jpg",
                    "/images/easteregg/kowakujo/20260629075935_1.jpg",
                  ],
                },
                {
                  label: "4",
                  color: "#fb923c",
                  icon: "/images/easteregg/paw.svg",
                  path: [
                    { x: 65.8, y: 56.9 },
                    { x: 75.1, y: 55.9 },
                    { x: 76.8, y: 53.5 },
                    { x: 80.3, y: 54.6 },
                  ],
                  text: "**Kitchens:** At the entrance between the Kitchens and Central Courtyard.",
                },
              ],
            },
            {
              id: "s2-abomination",
              title: "Kill the Abomination",
              instruction:
                "Throw the **Maneki-Neko** at the end of your paw-print trail into the centre of the converging paws to spawn the Abomination, then defeat it to free the cat.",
              locations: [
                {
                  label: "1",
                  color: "#ef4444",
                  icon: "/images/easteregg/skull.svg",
                  position: { x: 15.8, y: 64.4 },
                  text: "**Training Area** Abomination",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628135431_1_dup2.jpg",
                    "/images/easteregg/kowakujo/20260628135436_1.jpg",
                    "/images/easteregg/kowakujo/20260628135438_1.jpg",
                  ],
                },
                {
                  label: "2",
                  color: "#ef4444",
                  icon: "/images/easteregg/skull.svg",
                  position: { x: 33, y: 79.2 },
                  text: "**Stables** Abomination",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628135431_1_dup3.jpg",
                    "/images/easteregg/kowakujo/20260628135436_1_dup2.jpg",
                    "/images/easteregg/kowakujo/20260628135438_1_dup2.jpg",
                  ],
                },
                {
                  label: "3",
                  color: "#ef4444",
                  icon: "/images/easteregg/skull.svg",
                  position: { x: 79.2, y: 88.2 },
                  text: "**Flower Garden** Abomination",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628135431_1_dup4.jpg",
                    "/images/easteregg/kowakujo/20260628135436_1_dup3.jpg",
                    "/images/easteregg/kowakujo/20260628135438_1_dup3.jpg",
                  ],
                },
                {
                  label: "4",
                  color: "#ef4444",
                  icon: "/images/easteregg/skull.svg",
                  position: { x: 80.3, y: 54.6 },
                  text: "**Kitchens** Abomination",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628135431_1_dup5.jpg",
                    "/images/easteregg/kowakujo/20260628135436_1_dup4.jpg",
                    "/images/easteregg/kowakujo/20260628135438_1_dup4.jpg",
                  ],
                },
              ],
            },
            {
              id: "s2-capture-cat",
              title: "Capture the Cat",
              instruction:
                "Quietly find and capture the cat in the Kitchens (2 spots) or the Training Area (1 spot).",
              revealCaption:
                "**Required perk:** Get **Death Perception** before searching.\n\nSearch the marked locations. Each has creaky floorboards that **Death Perception** highlights in orange. Crouch-walk early — any noise will scare the cat away. Avoid the noisy boards, then crouch beside the cat and interact to pick it up.",
              locations: [
                {
                  label: "1",
                  position: { x: 27.5, y: 65.6 },
                  text: "**Training Area:** In the building between the Training Area and Tea Garden.",
                  revealImage: "/images/easteregg/kowakujo/20260628140124_1.jpg",
                },
                {
                  label: "2",
                  position: { x: 76.2, y: 45.2 },
                  text: "**Kitchens (stove room):** In the room with the stove and green plum fruit.",
                  revealImage: "/images/easteregg/kowakujo/20260628140030_1.jpg",
                },
                {
                  label: "3",
                  position: { x: 86.5, y: 62.9 },
                  text: "**Kitchens (Flower Garden side):** In a room between the Kitchens and Flower Garden.",
                  revealImage: "/images/easteregg/kowakujo/20260628140049_1.jpg",
                },
              ],
            },
            {
              id: "s2-get-nekomancer",
              title: "Get the Nekomancer",
              instruction:
                "Take the cat to the World Seed and melee the seed between pulses, then collect the Nekomancer.",
              icon: "/images/easteregg/star.svg",
              iconPosition: { x: 58.5, y: 10.9 },
              revealImages: [
                "/images/easteregg/kowakujo/20260628140730_1.jpg",
                "/images/easteregg/kowakujo/20260628140739_1.jpg",
                "/images/easteregg/kowakujo/20260628140740_1.jpg",
                "/images/easteregg/kowakujo/20260628140746_1.jpg",
              ],
              revealCaption:
                "**Shogun's Sanctum:** Bring the cat back to the **World Seed** beside **Pack-a-Punch**. It will jump onto the seed automatically.\n\nWhen the seed glows red, it emits damaging shockwaves. Move in between shockwaves and melee the seed.\n\nAfter enough hits, the cat jumps off and drops nearby as the **Nekomancer** Wonder Weapon. When Pack-a-Punched, it becomes **Tsunderera-Hime**.",
            },
          ],
        },

        // ────────────────────────────────────────────────────────────────
        //  STAGE 3 — Light the Lanterns
        // ────────────────────────────────────────────────────────────────
        {
          id: "stage-3",
          title: "Light the Lanterns",
          steps: [
            {
              id: "s3-lanterns",
              title: "Light the Lanterns",
              instruction:
                "With the **Nekomancer**, light all 11 lanterns in order — without missing a shot and within the time limit. Failing means waiting for the next round to retry.",
              color: "#fbbf24",
              solidMarkers: true,
              path: [
                { x: 23.4, y: 59 }, // lantern 1
                { x: 24.9, y: 60.8 },
                { x: 31.3, y: 58.6 },
                { x: 33.2, y: 55.7 }, // lantern 2
                { x: 49.4, y: 51.4 }, // lantern 3
                { x: 48.4, y: 42.3 },
                { x: 52.5, y: 30.4 }, // lantern 4
                { x: 49.2, y: 43.3 },
                { x: 60.2, y: 55.9 }, // lantern 5
                { x: 62, y: 54.3 },
                { x: 65.8, y: 56.9 },
                { x: 72.6, y: 57.9 }, // lantern 6
                { x: 79.5, y: 59.2 },
                { x: 79.3, y: 61 },
                { x: 84.7, y: 63.2 },
                { x: 81.3, y: 76.9 },
                { x: 75, y: 80.2 }, // lantern 7
                { x: 70.3, y: 78.1 },
                { x: 56.3, y: 75.4 }, // lantern 8
                { x: 58.7, y: 76.9 },
                { x: 57.9, y: 85.5 },
                { x: 51.2, y: 90.6 }, // lantern 9
                { x: 48.2, y: 77.1 },
                { x: 49.2, y: 72.1 }, // lantern 10
                { x: 45.2, y: 76.3 },
                { x: 35.3, y: 81 }, // lantern 11
              ],
              locations: [
                {
                  label: "1",
                  position: { x: 23.4, y: 59 },
                  revealImage: "/images/easteregg/kowakujo/20260628141345_1.jpg",
                },
                {
                  label: "2",
                  position: { x: 33.2, y: 55.7 },
                  revealImage: "/images/easteregg/kowakujo/20260628141354_1.jpg",
                },
                {
                  label: "3",
                  position: { x: 49.4, y: 51.4 },
                  revealImage: "/images/easteregg/kowakujo/20260628141412_1.jpg",
                },
                {
                  label: "4",
                  position: { x: 52.5, y: 30.4 },
                  revealImage: "/images/easteregg/kowakujo/20260628141419_1.jpg",
                },
                {
                  label: "5",
                  position: { x: 60.2, y: 55.9 },
                  revealImage: "/images/easteregg/kowakujo/20260628141428_1.jpg",
                },
                {
                  label: "6",
                  position: { x: 72.6, y: 57.9 },
                  revealImage: "/images/easteregg/kowakujo/20260628141435_1.jpg",
                },
                {
                  label: "7",
                  position: { x: 75, y: 80.2 },
                  revealImage: "/images/easteregg/kowakujo/20260628141643_1.jpg",
                },
                {
                  label: "8",
                  position: { x: 56.3, y: 75.4 },
                  revealImage: "/images/easteregg/kowakujo/20260628141651_1.jpg",
                },
                {
                  label: "9",
                  position: { x: 51.2, y: 90.6 },
                  revealImage: "/images/easteregg/kowakujo/20260628141702_1.jpg",
                },
                {
                  label: "10",
                  position: { x: 49.2, y: 72.1 },
                  revealImage: "/images/easteregg/kowakujo/20260628141709_1.jpg",
                },
                {
                  label: "11",
                  position: { x: 35.3, y: 81 },
                  revealImage: "/images/easteregg/kowakujo/20260628141714_1.jpg",
                },
              ],
            },
            {
              id: "s3-war-room-cutscene",
              title: "War Room Cut-Scene",
              instruction:
                "Interact with the ghosts in the **War Room** to trigger the cut-scene.",
              icon: "/images/easteregg/star.svg",
              iconPosition: { x: 52.3, y: 12.5 },
              revealImages: [
                "/images/easteregg/kowakujo/20260628141855_1.jpg",
                "/images/easteregg/kowakujo/20260628141857_1.jpg",
                "/images/easteregg/kowakujo/20260628141906_1.jpg",
              ],
            },
          ],
        },

        // ────────────────────────────────────────────────────────────────
        //  STAGE 4 — Fox Mask
        // ────────────────────────────────────────────────────────────────
        {
          id: "stage-4",
          title: "Fox Mask",
          steps: [
            {
              id: "s4-obtain-fox-mask",
              title: "Obtain the Fox Mask",
              instruction:
                "Fly the Ninja Kite from atop the Shogun's Sanctum, take the right path past the tree, and spam interact to grab the Fox Mask.",
              revealCaption:
                "**Shogun's Sanctum:** Turn around and exit through the blasted-out wall that leads to the castle roof.\n\nOutside, look left for the carp-shaped windsocks — this is the **Ninja Kite**. Interact with it. While gliding, steer right until you pass to the right of the large tree.\n\nOnce you are on the right-hand path, spam interact to grab the **Fox Mask** from the castle roof edge. A notification appears when you pick it up.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  position: { x: 48.7, y: 15.8 },
                  text: "Ninja Kite launch point",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628141926_1.jpg",
                    "/images/easteregg/kowakujo/20260628142422_1.jpg",
                  ],
                },
                {
                  label: "2",
                  position: { x: 44.4, y: 59 },
                  text: "Fox Mask pickup",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628142507_1.jpg",
                    "/images/easteregg/kowakujo/20260628142509_1.jpg",
                  ],
                },
              ],
            },
            {
              id: "s4-fox-mask-minigame",
              title: "Fox Mask Mini-Game",
              instruction:
                "Interact with the mask wall and kill zombies matching the order of the masks (Simon Says mini-game) until the cutscene.",
              icon: "/images/easteregg/star.svg",
              iconPosition: { x: 44.2, y: 27.9 },
              revealImages: [
                "/images/easteregg/kowakujo/20260628142548_1.jpg",
                "/images/easteregg/kowakujo/20260628145315_1.jpg",
                "/images/easteregg/kowakujo/20260628145326_1.jpg",
                "/images/easteregg/kowakujo/20260628145503_1.jpg",
                "/images/easteregg/kowakujo/20260628145512_1.jpg",
              ],
              revealCaption:
                "**Storage Rooms:** Bring the **Fox Mask** to the mask wall and start the mini-game.\n\nThe masks glow in a sequence, then zombies spawn wearing matching masks. Kill the masked zombies in the same order the wall masks glowed. Complete three rounds to finish the step.\n\n**Failure rules:** Shooting the zombies out of order fails the attempt. Leaving the Storage Rooms also fails it.\n\n**Tip:** Shock Charges and Stun Grenades help hold zombies still. Avoid **Aether Shroud** because it can make the zombies leave the area.\n\nWhen complete, interact with the mask at the bottom of the wall to trigger the cutscene.",
            },
          ],
        },

        // ────────────────────────────────────────────────────────────────
        //  STAGE 5 — Collect the Evidences
        // ────────────────────────────────────────────────────────────────
        {
          id: "stage-5",
          title: "Collect the Evidences",
          steps: [
            {
              id: "s5-evidence-board",
              title: "Evidence Board Setup",
              instruction:
                "Use the **Meditation Room** shelves and evidence wall to place gathered notes and evidence items as you collect them.",
              icon: "/images/easteregg/star.svg",
              iconPosition: { x: 38.4, y: 22.3 },
              revealImage: "/images/easteregg/kowakujo/20260628145908_1.jpg",
              revealCaption:
                "**Meditation Room:** Use this room as the evidence hub. Place evidence items and notes on the shelves as you complete each chain.\n\nCompleting all evidence for a person gives an image that can be placed on the Meditation Room wall. Interacting with the board may trigger dialogue clues for the murder-solve steps. Remember to return evidences once you find them as some steps may depend on them being placed.",
            },
            {
              id: "s5-suspect-evidences",
              title: "Suspect Evidences",
              instruction:
                "Find the masks in three rooms (Workshop, Collapsed Study, Onsen Baths) and return them to the Meditation Room.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  position: { x: 36.7, y: 16.5 },
                  text: "**Takeshi's Pipe — Workshop:** Shoot the mask sitting on the bottom shelf on the left side of the stairs.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628145545_1.jpg",
                    "/images/easteregg/kowakujo/20260628145554_1.jpg",
                  ],
                },
                {
                  label: "2",
                  position: { x: 41.3, y: 37.3 },
                  text: "**Takeo's Case — Collapsed Study:** Shoot the mask on the ceiling rafters.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628145609_1.jpg",
                    "/images/easteregg/kowakujo/20260628145617_1.jpg",
                  ],
                },
                {
                  label: "3",
                  position: { x: 56.7, y: 21.4 },
                  text: "**Mitsuhime's Comb — Onsen Baths:** Near **Elemental Pop**, face the War Room and look outside the right wall window on a tight angle to shoot the mask.\n\nPlace all three evidences on the **Meditation Room** shelves. When correct, a painting of a person wearing the fox mask appears on the other side of the room.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628145637_1.jpg",
                    "/images/easteregg/kowakujo/20260628145643_1.jpg",
                  ],
                },
              ],
            },
            {
              id: "s5-accomplice-merchant",
              title: "Evidence Box 2: Coin Purse and Merchant",
              instruction:
                "Trigger the Coin Purse evidence cutscene, then spawn and defeat the Merchant for the Sales Note and Mercantile Abacus.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  position: { x: 17, y: 84.5 },
                  text: "Find the **Mystery Box** with the Japanese wooden plaque on its base (off-map marker — it can be at any Mystery Box location). Move that box to the marked spot before continuing.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628143510_1.jpg",
                    "/images/easteregg/kowakujo/20260628144836_1.jpg",
                  ],
                },
                {
                  label: "2",
                  position: { x: 17, y: 89.2 },
                  text: "Throw the **Maneki-Neko** in front of the box while using it. If done correctly, the **Coin Purse** becomes available to pick up.",
                  revealImage: "/images/easteregg/kowakujo/20260628145939_1.jpg",
                },
                {
                  label: "3",
                  position: { x: 52.7, y: 97.4 },
                  text: "**Outer Ward:** Place the **Coin Purse** to the right of the Rampage Inducer. Interact again to trigger the short cinematic.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628151117_1.jpg",
                    "/images/easteregg/kowakujo/20260628151124_1.jpg",
                  ],
                },
                {
                  label: "4",
                  // Trail start = fruit basket in Kitchens; end = Staging Area shack (next spot).
                  path: [
                    { x: 84.8, y: 47.6 },
                    { x: 77.5, y: 45.6 },
                    { x: 74.3, y: 56.6 },
                    { x: 65, y: 56.5 },
                    { x: 61.6, y: 53.7 },
                    { x: 55.2, y: 60.4 },
                    { x: 51.8, y: 68.5 },
                    { x: 47.8, y: 70.5 },
                  ],
                  text: "**Kitchens:** Knock a fruit from the basket on top of the shelf. Once per round, a zombie eats the fruit and follows you around. Lead it to the **Staging Area**.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628134313_1.jpg",
                    "/images/easteregg/kowakujo/20260628134317_1.jpg",
                    "/images/easteregg/kowakujo/20260628135736_1.jpg",
                    "/images/easteregg/kowakujo/20260628135741_1.jpg",
                    "/images/easteregg/kowakujo/20260628135744_1.jpg",
                    "/images/easteregg/kowakujo/20260628135824_1.jpg",
                  ],
                },
                {
                  label: "5",
                  position: { x: 47.8, y: 70.5 },
                  text: "**Staging Area:** Lead the fruit-carrying zombie to the shack window and kill it there. The **Merchant** spawns — kill it to collect the note and **Mercantile Abacus**.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628135847_1.jpg",
                    "/images/easteregg/kowakujo/20260628151747_1.jpg",
                    "/images/easteregg/kowakujo/20260628151800_1.jpg",
                  ],
                },
              ],
            },
            {
              id: "s5-accomplice-noble",
              title: "Evidence Box 2: Noble's Hat",
              instruction:
                "Use 3 Decoy Grenades at the Training Area wooden windows. Throw the Noble's grenades back, then collect the note and Noble's Hat.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  position: { x: 20, y: 66.3 },
                  text: "Craft **Decoy Grenades** — you need 3 (either use the **Mule Kick** augment or have two players). Go to the **Training Area** and find the building with the creaky floorboards — it has three boarded-up windows.",
                  revealImage: "/images/easteregg/kowakujo/20260629082625_1.jpg",
                },
                {
                  label: "2",
                  text: "Throw a **Decoy Grenade** at each window. All three windows open and the Noble throws grenades down.",
                },
                {
                  label: "3",
                  text: "Throw the grenades back into the windows to kill the Noble. Collect the note and the **Noble's Hat** evidence item.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629082659_1.jpg",
                    "/images/easteregg/kowakujo/20260629082702_1.jpg",
                    "/images/easteregg/kowakujo/20260629082705_1.jpg",
                  ],
                },
              ],
            },
            {
              id: "s5-accomplice-gardener",
              title: "Accomplice Evidences: Gardener",
              instruction:
                "Fill a bucket, water the three Flower Garden plants, then break the Gardener's immunity and kill it for the evidence.",
              locations: [
                {
                  label: "1",
                  positions: [
                    { x: 33.8, y: 52.7 },
                    { x: 53.2, y: 30.9 },
                  ],
                  positionImageIndices: [0, 1],
                  text: "Collect the bucket from either a **Tea Garden** cupboard or the top floor of the **Onsen Baths**.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628133053_1.jpg",
                    "/images/easteregg/kowakujo/20260628145831_1.jpg",
                  ],
                },
                {
                  label: "2",
                  positions: [
                    { x: 33.7, y: 57.2 },
                    { x: 57.5, y: 34.9 },
                  ],
                  positionImageIndices: [0, 1],
                  text: "Interact with the water in either **Tea Garden** or **Onsen Baths** to fill the bucket. It holds three water charges — running, sprinting, or getting hit removes one charge.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628133147_1.jpg",
                    "/images/easteregg/kowakujo/20260628145815_1.jpg",
                  ],
                },
                {
                  label: "3",
                  positions: [
                    { x: 83.9, y: 75 },
                    { x: 87.5, y: 80.8 },
                    { x: 77.3, y: 84.5 },
                  ],
                  positionImageIndices: [0, 1, 2],
                  solid: true,
                  text: "**Flower Garden:** Bring the filled bucket to the cobblestone path and water the three marked plants in order. Each marker opens the matching plant screenshot.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628151322_1.jpg",
                    "/images/easteregg/kowakujo/20260628151342_1.jpg",
                    "/images/easteregg/kowakujo/20260628151334_1.jpg",
                  ],
                },
                {
                  label: "4",
                  positions: [
                    { x: 72.5, y: 75.2 },
                    { x: 81.3, y: 70.4 },
                  ],
                  solid: true,
                  text: "**Gardener fight:** The Gardener starts immune. Shoot the glowing flower beside each doorway to briefly remove its immunity. Use that window to damage the Gardener, then kill it and collect the evidence.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628151559_1.jpg",
                    "/images/easteregg/kowakujo/20260628151554_1.jpg",
                    "/images/easteregg/kowakujo/20260629082114_1.jpg",
                  ],
                },
              ],
            },
            {
              id: "s5-poison-note",
              title: "Evidence Box 3: Toxin Timing Note",
              instruction:
                "Pick up the note left of the War Room stairs. It is used to determine the poison timing later in the story. This can be collected earlier.",
              icon: "/images/easteregg/star.svg",
              iconPosition: { x: 51.1, y: 10.4 },
              revealImage: "/images/easteregg/kowakujo/20260628133547_1_dup2.jpg",
              revealCaption:
                "**War Room:** Pick up the note to the left of the stairs. It is used to determine the toxin timing needed later in the murder solve.",
            },
            {
              id: "s5-poison-monkshood",
              title: "Poison Evidences: Monkshood Flower",
              instruction:
                "Gather the pouch, ash, and bud, then plant and grow the Monkshood Flower.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  position: { x: 28.1, y: 60.5 },
                  text: "**Training Area:** Hit the wooden beam above the Ammo Cache with a charged **Nekomancer** shot or a grenade. The **Empty Pouch** drops to the ground.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628134223_1.jpg",
                    "/images/easteregg/kowakujo/20260628140954_1.jpg",
                  ],
                },
                {
                  label: "2",
                  position: { x: 18.7, y: 89.9 },
                  text: "**Volcanic Ash:** Wait for a Fissure to become active, then stay near it until the ash is collected (you can hear it charging). Off-map marker — any Fissure works.",
                  revealImage: "/images/easteregg/kowakujo/20260628144749_1.jpg",
                },
                {
                  label: "3",
                  position: { x: 77.7, y: 77.9 },
                  text: "**Flower Garden:** Collect the **Monkshood Bud** from the ground near the lava river and broken bridge.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628134106_1.jpg",
                    "/images/easteregg/kowakujo/20260628134110_1.jpg",
                  ],
                },
                {
                  label: "4",
                  position: { x: 46.4, y: 39.6 },
                  text: "**Tenshu Entrance:** Plant the **Monkshood Bud** in the pot near the Exfil phone booth, then place the **Volcanic Ash** on the pot.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628133247_1.jpg",
                    "/images/easteregg/kowakujo/20260628150007_1.jpg",
                  ],
                },
                {
                  label: "5",
                  position: { x: 18.7, y: 92.5 },
                  text: "**Grow the flower:** Melee a cherry blossom tree until both you and the tree glow (off-map marker — any tree works). Return to the pot and spin around until a small tornado appears. The **Monkshood Flower** can then be picked up.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628135847_1_dup2.jpg",
                    "/images/easteregg/kowakujo/20260628150018_1.jpg",
                    "/images/easteregg/kowakujo/20260628150047_1.jpg",
                    "/images/easteregg/kowakujo/20260628150053_1.jpg",
                  ],
                },
              ],
            },
            {
              id: "s5-poison-plum",
              title: "Poison Evidences: Plum Pit",
              instruction:
                "Knock the plum loose in the Kitchens, then jump on it to make the Plum Pit.",
              icon: "/images/easteregg/star.svg",
              iconPosition: { x: 77.8, y: 45.3 },
              revealImages: [
                "/images/easteregg/kowakujo/20260628134252_1.jpg",
                "/images/easteregg/kowakujo/20260628151237_1.jpg",
                "/images/easteregg/kowakujo/20260628151244_1.jpg",
                "/images/easteregg/kowakujo/20260628151250_1.jpg",
              ],
              revealCaption:
                "**Kitchens:** Melee the small basket on the shelf near the fire pit to drop a plum. Jump on the plum repeatedly until it becomes the **Plum Pit**, then collect it.",
            },
            {
              id: "s5-poison-pestle-pufferfish",
              title: "Poison Evidences: Pestle and Pufferfish",
              instruction:
                "Solve the Storage Rooms 3x3 scroll grid for the Pestle and note, then fill the Kitchens soul box to reveal the Pufferfish.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  position: { x: 42.8, y: 22.3 },
                  text: "**Storage Rooms:** Find the 3×3 grid filled with papers/sticks and melee it to start the timer. Meleeing pushes one scroll in and an adjacent scroll out — all scrolls need to be inside the grid to succeed. When complete, the **Pestle** and a note pop out of the middle. Use the solver tool: https://kowakujo-scroll-solver.netlify.app/",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629083013_1.jpg",
                    "/images/easteregg/kowakujo/20260629083054_1.jpg",
                    "/images/easteregg/kowakujo/20260629083424_1.jpg",
                  ],
                },
                {
                  label: "2",
                  position: { x: 76.2, y: 51.2 },
                  text: "**Kitchens:** Go to the stove top and hold interact on the bowl to start. Kill zombies using a **Brain Rot** ammo mod weapon or the **Nekomancer** charged attack to feed the souls. Once the pestle is glowing blue, interact with it for a cutscene. Turn to the back of the room near the creaky floorboards to collect the **Pufferfish**.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629083624_1.jpg",
                    "/images/easteregg/kowakujo/20260629083645_1.jpg",
                    "/images/easteregg/kowakujo/20260629083727_1.jpg",
                    "/images/easteregg/kowakujo/20260629083936_1.jpg",
                    "/images/easteregg/kowakujo/20260629084030_1.jpg",
                    "/images/easteregg/kowakujo/20260629084108_1.jpg",
                    "/images/easteregg/kowakujo/20260629084111_1.jpg",
                    "/images/easteregg/kowakujo/20260629084116_1.jpg",
                  ],
                },
              ],
            },
            {
              id: "s5-motive-evidences",
              title: "Motive Evidences",
              instruction:
                "Collect the Shogun's Hanko and the Netsuke of Brothers.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  position: { x: 51.2, y: 13.6 },
                  text: "**Shogun's Hanko:** This was collected from the first Oni during Stage 1.",
                  revealImage: "/images/easteregg/kowakujo/20260628133508_1_dup2.jpg",
                },
                {
                  label: "2",
                  position: { x: 34.9, y: 79.2 },
                  text: "**Stables:** Wait for the lava to harden, find the tiny statue, throw a **Molotov** at it, then collect the **Netsuke of Brothers**.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628134001_1.jpg",
                    "/images/easteregg/kowakujo/20260628135640_1.jpg",
                    "/images/easteregg/kowakujo/20260628135658_1.jpg",
                  ],
                },
              ],
            },
            {
              id: "s5-sake-cup",
              title: "Evidence Box 4: Sake Cup",
              instruction:
                "Use the Ceramic Shard chain and Tea Garden Kintsugi Station to repair the Sake Cup, then use it to collect the Horse Statuette, Calligraphy Brush, and Tea Whisk.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  position: { x: 52.1, y: 13.2 },
                  text: "Collect the **Broken Ceramic Shard** from the **War Room** (left of the stairs to Shogun's Sanctum). This can be collected early.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260628133535_1_dup2.jpg",
                    "/images/easteregg/kowakujo/20260628133538_1_dup2.jpg",
                  ],
                },
                {
                  label: "2",
                  position: { x: 40.7, y: 24.1 },
                  text: "On the 3rd painting in the **Meditation Room**, interact to collect the ceramic piece from the cup in the painting's hand.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629084642_1.jpg",
                    "/images/easteregg/kowakujo/20260629084647_1.jpg",
                  ],
                },
                {
                  label: "3",
                  position: { x: 43.2, y: 52.4 },
                  text: "Take the shards to the **Kintsugi Station** in the **Tea Garden** and craft/repair the **Sake Cup**.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629084658_1.jpg",
                    "/images/easteregg/kowakujo/20260629084702_1.jpg",
                  ],
                },
                {
                  label: "4",
                  position: { x: 43.2, y: 52.4 },
                  text: "End the round. When the **Sake Cup** glows blue, interact with it to trigger the Onryo ghost cutscene. Once complete, take the Sake Cup.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629084730_1.jpg",
                    "/images/easteregg/kowakujo/20260629084740_1.jpg",
                  ],
                },
                {
                  label: "5",
                  position: { x: 61.2, y: 14.9 },
                  text: "**War Room:** Place the **Sake Cup** in the back-left corner near the map and defend it while it pulses. Pick the cup back up and collect the **Horse Statuette** nearby. Failure requires ending the round and recrafting the Sake Cup.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629084840_1.jpg",
                    "/images/easteregg/kowakujo/20260629084848_1.jpg",
                    "/images/easteregg/kowakujo/20260629084906_1.jpg",
                  ],
                },
                {
                  label: "6",
                  position: { x: 46.5, y: 37.3 },
                  text: "**Collapsed Study:** Place the **Sake Cup** to the left of the **Wunderfizz** machine and repeat the defense to collect the **Calligraphy Brush**. Failure requires ending the round and recrafting. Pick up the Sake Cup.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629085018_1.jpg",
                    "/images/easteregg/kowakujo/20260629085026_1.jpg",
                    "/images/easteregg/kowakujo/20260629085347_1.jpg",
                  ],
                },
                {
                  label: "7",
                  position: { x: 34.5, y: 51.8 },
                  text: "**Tea Garden:** Return to the Kintsugi Station / northeast corner for the final defense. A dog steals the **Tea Whisk** — chase it down and collect it.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629085406_1.jpg",
                    "/images/easteregg/kowakujo/20260629085408_1.jpg",
                    "/images/easteregg/kowakujo/20260629085517_1.jpg",
                  ],
                },
              ],
            },
            {
              id: "s5-crest-medallion",
              title: "Evidence Box 5: Clock and Crest Medallion",
              instruction:
                "After Evidence Box 4 reveals the fourth image, solve the Storage Rooms clock and Staging Area flag puzzle to collect the Crest Medallion.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  positions: [
                    { x: 43.2, y: 38.5 },
                    { x: 45.8, y: 56.9 },
                    { x: 39.5, y: 72.9 },
                    { x: 51.6, y: 96.5 },
                    { x: 85.5, y: 87.1 },
                  ],
                  positionLabels: [
                    "Clock",
                    "Courtyard",
                    "Stables",
                    "Outer Ward",
                    "Flower Garden",
                  ],
                  text: "**Storage Rooms:** Beneath the **PHD Flopper** machine is a clock. Interact with it and take note of the four numbers shown in order. Blue numbers for positions 1–4 will now appear on walls in **Stables**, **Flower Garden**, **Outer Ward**, and **Central Courtyard** (marked spots).",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629085754_1.jpg",
                    "/images/easteregg/kowakujo/20260629085750_1.jpg",
                    "/images/easteregg/kowakujo/20260629091841_1.jpg",
                    "/images/easteregg/kowakujo/20260629090204_1.jpg",
                    "/images/easteregg/kowakujo/20260629090231_1.jpg",
                    "/images/easteregg/kowakujo/20260629090206_1.jpg",
                  ],
                },
                {
                  label: "2",
                  position: { x: 18.6, y: 89.5 },
                  text: "Start a new round to initiate a wave defense round (defend from the dragon — gives **Max Ammo**). During this round, kill the zombies carrying red-glowing flags. Off-map marker — flags can appear in multiple locations.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629091156_1.jpg",
                    "/images/easteregg/kowakujo/20260629091250_1.jpg",
                  ],
                },
                {
                  label: "3",
                  position: { x: 50.3, y: 72 },
                  text: "After the defense round, flags spawn in the **Staging Area**. Each flag has a number represented by symbols. Place one or two flags under each glowing wall number so the flag values add up to the corresponding clock number (e.g. clock shows 7 → place a 4 and a 3 under wall number 1).",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629091356_1.jpg",
                    "/images/easteregg/kowakujo/20260629091528_1.jpg",
                    "/images/easteregg/kowakujo/20260629091531_1.jpg",
                    "/images/easteregg/kowakujo/20260629091536_1.jpg",
                    "/images/easteregg/kowakujo/20260629091628_1.jpg",
                    "/images/easteregg/kowakujo/20260629091629_1.jpg",
                    "/images/easteregg/kowakujo/20260629091818_1.jpg",
                    "/images/easteregg/kowakujo/20260629091841_1_dup2.jpg",
                  ],
                },
                {
                  label: "4",
                  position: { x: 43.2, y: 38.5 },
                  text: "Return to the clock in the **Storage Rooms** and open it to collect the **Crest Medallion**.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629093158_1.jpg",
                    "/images/easteregg/kowakujo/20260629093200_1.jpg",
                  ],
                },
              ],
            },
          ],
        },

        // ────────────────────────────────────────────────────────────────
        //  STAGE 6 — Solve the Murder
        // ────────────────────────────────────────────────────────────────
        {
          id: "stage-6",
          title: "Solve the Murder",
          steps: [
            {
              id: "s6-solve-murder",
              title: "Solve the Murder",
              instruction:
                "Move the evidences from the shelves and place them beneath each of the portraits correctly.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  position: { x: 43.4, y: 23.2 },
                  text: "**Portrait 1:** Place the **Comb** beneath the first portrait.",
                  revealImage: "/images/easteregg/kowakujo/20260629093547_1.jpg",
                },
                {
                  label: "2",
                  position: { x: 42.3, y: 23.5 },
                  text: "**Portrait 2:** Activate traps in **Outer Ward**, **Flower Garden**, or **Tenshu Entrance** and kill ~15 zombies. A ghost soldier spawns who either saw nothing or reveals the accomplice. Place that accomplice's item beneath the second portrait:\n- Merchant → **Abacus**\n- Gardener → **Shears**\n- Nobleman → **Hat**",
                  revealImage: "/images/easteregg/kowakujo/20260629095302_1.jpg",
                },
                {
                  label: "3",
                  position: { x: 41.2, y: 23.8 },
                  text: "**Portrait 3:** The toxin depends on the accomplice and symptoms from the Doctor's Note:\n- **Nobleman** → Emesis = Pufferfish, Noxious Plant = Monkshood\n- **Gardener** → Noxious Emesis = Plum Pit, Paralysis = Monkshood\n- **Merchant** → Noxious Plant = Plum Pit, No Noxious Plant = Pufferfish",
                  revealImage: "/images/easteregg/kowakujo/20260629095302_1_dup2.jpg",
                },
                {
                  label: "4",
                  position: { x: 40.1, y: 24 },
                  text: "**Portrait 4:** The image in the 4th portrait determines the item:\n- Fish = **Tea Whisk**\n- Mountains = **Horse Statuette**\n- Bird = **Calligraphy Brush**",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629093939_1.jpg",
                    "/images/easteregg/kowakujo/20260629095302_1_dup3.jpg",
                  ],
                },
                {
                  label: "5",
                  position: { x: 39, y: 24.3 },
                  text: "**Portrait 5:** Place the **Crest Medallion** beneath the fifth portrait.",
                  revealImage: "/images/easteregg/kowakujo/20260629095302_1_dup4.jpg",
                },
                {
                  label: "6",
                  position: { x: 44.1, y: 22.2 },
                  text: "**Sundial:** Open the **Known Toxins** note for the poison's time-to-effect. Open the **Doctor's Record** note for the time of death (shown as an animal for the sundial). Go to the sundial, find the matching animal, and move the dial arm backwards (anti-clockwise) by the poison's time-to-effect. Light the incense on the left and right sides of the portraits (be careful on the left side as it may move the sundial). Success produces glowing smoke in the centre of the room. Failure spawns zombies — end the round to retry.",
                  revealImages: [
                    "/images/easteregg/kowakujo/20260629094010_1.jpg",
                    "/images/easteregg/kowakujo/20260629093939_1_dup2.jpg",
                    "/images/easteregg/kowakujo/20260629094026_1.jpg",
                    "/images/easteregg/kowakujo/20260629094326_1.jpg",
                    "/images/easteregg/kowakujo/20260629100819_1.jpg",
                    "/images/easteregg/kowakujo/20260629100847_1.jpg",
                  ],
                },
              ],
            },
            {
              id: "s6-mini-boss",
              title: "Mini-Boss Fight",
              instruction:
                "Interact with the **World Seed** to initiate the mini-boss fight. Defeat the Oni to be teleported back to the World Seed room.",
              icon: "/images/easteregg/star.svg",
              iconPosition: { x: 58.5, y: 10.2 },
              revealImage: "/images/easteregg/kowakujo/20260629100950_1.jpg",
              revealCaption:
                "Defeat the mini-boss Oni. After it dies, you return to the World Seed room.",
            },
          ],
        },

        // ────────────────────────────────────────────────────────────────
        //  STAGE 7 — Boss Fight
        // ────────────────────────────────────────────────────────────────
        {
          id: "stage-7",
          title: "Boss Fight",
          steps: [
            {
              id: "s7-boss-fight",
              title: "Boss Fight",
              instruction:
                "In the World Seed room, interact with the new Kite flag outside the window to begin the boss fight.",
              icon: "/images/easteregg/dragonicon.png",
              iconPosition: { x: 56.6, y: 6.5 },
              revealImages: [
                "/images/easteregg/kowakujo/20260629101745_1.jpg",
                "/images/easteregg/kowakujo/20260629101818_1.jpg",
                "/images/easteregg/kowakujo/20260629101847_1.jpg",
              ],
              revealCaption:
                "The main mechanic is to kill the Onis carrying flags (waves scale with boss health: 1 flag in stage 1, 2 flags in stage 2, 3 flags in stage 3). Charge the flag area for immunity and pour damage into the dragon until it is defeated.",
            },
          ],
        },
      ],
    },

    // ── Side Easter Eggs ────────────────────────────────────────────────
    {
      id: "side-easter-eggs",
      name: "Side Easter Eggs",
      color: "#22c55e",
      stages: [
        {
          id: "side-music",
          title: "Mr Peeks Music",
          steps: [
            {
              id: "side-music-headphones",
              title: "Headphone Locations",
              instruction:
                "Find and interact with the Mr Peeks headphone locations to trigger the music Easter egg.",
              revealCaption: "TODO",
            },
          ],
        },
        {
          id: "side-takeo-flashback",
          title: "Takeo Flashback",
          steps: [
            {
              id: "side-takeo-start",
              title: "Start Takeo Flashback",
              instruction:
                "You must be playing as Takeo. Craft a Psych Grenade, go to the War Room, and throw it at yourself near the bottom of the stairs.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  text: "Play as **Takeo** and craft a **Psych Grenade**.",
                },
                {
                  label: "2",
                  text: "Go to the **War Room** and throw the Psych Grenade at yourself near the bottom of the stairs.",
                },
                {
                  label: "3",
                  text: "A version of Takeo appears. Interact with him; he disappears and drops a katana on the floor.",
                },
                {
                  label: "4",
                  text: "Interact with the katana to pick it up and start the Flashback Easter egg.",
                },
              ],
            },
          ],
        },
        {
          id: "side-parkour",
          title: "Parkour",
          steps: [
            {
              id: "side-parkour-course",
              title: "Lava Rock Parkour Course",
              instruction:
                "Wait near Melee Macchiato for a floating lava rock, ride it to the house on the lava lake, then look back to reveal the parkour course.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  text: "Wait near **Melee Macchiato** until a floating rock appears on the lava.",
                },
                {
                  label: "2",
                  text: "Jump onto the rock and wait for it to carry you to a house on the lava lake.",
                },
                {
                  label: "3",
                  text: "Jump onto the house and look back to see the parkour course.",
                },
              ],
            },
          ],
        },
        {
          id: "side-cat",
          title: "Cat Easter Egg",
          steps: [
            {
              id: "side-cat-placeholder",
              title: "Cat Easter Egg",
              instruction: "TODO",
              revealCaption: "TODO",
            },
          ],
        },
        {
          id: "side-klaus-mech",
          title: "Klaus Mech",
          steps: [
            {
              id: "side-klaus-build",
              title: "Build or Repair Klaus",
              instruction:
                "Shoot floating rocks in the Flower Garden lava to drop Klaus parts, then repair Klaus when the body appears.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  text: "Go to the **Flower Garden** and shoot the floating rocks inside the lava.",
                },
                {
                  label: "2",
                  text: "Shooting rocks can drop a **Klaus Arm**. Shoot multiple rocks until Klaus' body appears.",
                },
                {
                  label: "3",
                  text: "TODO",
                },
              ],
            },
          ],
        },
        {
          id: "side-gatcha-machine",
          title: "Gatcha Machine Charm",
          steps: [
            {
              id: "side-gatcha-unlock",
              title: "Unlock Gatcha Machine",
              instruction:
                "Use Flower Power Overheal during an active smoky Fissure to reveal a Gatcha Machine, then melee it and jump on the orbs to make it permanent.",
              solidMarkers: true,
              locations: [
                {
                  label: "1",
                  text: "Known machine location: **Kitchens**. TODO: Add additional Gatcha Machine locations.",
                },
                {
                  label: "2",
                  text: "Get the **Flower Power Overheal** effect.",
                },
                {
                  label: "3",
                  text: "Go to the **Kitchens** while a smoky Fissure is active. The Gatcha Machine appears while you have Overheal.",
                },
                {
                  label: "4",
                  text: "Melee the machine, then jump on the orbs that appear on the ground. This makes the machine stay permanently.",
                },
                {
                  label: "5",
                  text: "Pay 500 salvage for a charm. There are five charms, duplicates are possible, and this may remove Pack-a-Punch ability.",
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Power-Up Locations ──────────────────────────────────────────────
    {
      id: "power-up-locations",
      name: "Power-Up Locations",
      color: "#00ffff",
      stages: [
        {
          id: "power-ups",
          title: "Power-Up Drops",
          steps: [
            { id: "power-up-bonus-points", title: "Bonus Points", instruction: "TODO" },
            { id: "power-up-double-points", title: "Double Points", instruction: "TODO" },
            { id: "power-up-nuke", title: "Nuke", instruction: "TODO" },
            { id: "power-up-full-power", title: "Full Power", instruction: "TODO" },
            { id: "power-up-max-armor", title: "Max Armor", instruction: "TODO" },
            { id: "power-up-insta-kill", title: "Insta Kill", instruction: "TODO" },
            { id: "power-up-max-ammo", title: "Max Ammo", instruction: "TODO" },
            { id: "power-up-fire-sale", title: "Fire Sale", instruction: "TODO" },
            { id: "power-up-random-perk", title: "Random Perk", instruction: "TODO" },
          ],
        },
      ],
    },
  ],
};

export default kowakujo;
