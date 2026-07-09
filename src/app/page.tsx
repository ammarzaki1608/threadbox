import HeroMerdeka from "@/components/HeroMerdeka";
import MissionStrip from "@/components/MissionStrip";
import MerdekaCollection from "@/components/MerdekaCollection";
import PenangCollection from "@/components/PenangCollection";
import BalikPulauCollection from "@/components/BalikPulauCollection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroMerdeka />
      <MissionStrip />
      <MerdekaCollection />
      <PenangCollection />
      <BalikPulauCollection />
    </main>
  );
}
