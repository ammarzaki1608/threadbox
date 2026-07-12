import HeroMalaysia from "@/components/HeroMalaysia";
import MissionStrip from "@/components/MissionStrip";
import PenangCollection from "@/components/PenangCollection";
import BalikPulauCollection from "@/components/BalikPulauCollection";
import HostelCollection from "@/components/HostelCollection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroMalaysia />
      <MissionStrip />
      <PenangCollection />
      <BalikPulauCollection />
      <HostelCollection />
    </main>
  );
}
