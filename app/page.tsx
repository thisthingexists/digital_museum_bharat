import MuseumGate from "@/components/MuseumGate";
import MuseumLobby from "@/components/MuseumLobby";
import SearchSection from "@/components/SearchSection";
import IndiaMap from "@/components/IndiaMap";
import Timeline from "@/components/Timeline";
import StoryMode from "@/components/StoryMode";
// Recognizer hidden for now — WOW prototype stays in code (components/Recognizer.tsx)
// but not rendered. Uncomment to make it live when vision really works.
// import Recognizer from "@/components/Recognizer";

export default function Home() {
  return (
    <main className="bg-[#0c0a09]">
      <MuseumGate />
      <MuseumLobby />
      <SearchSection />
      <IndiaMap />
      <Timeline />
      <StoryMode />
      {/* <Recognizer /> — hidden until real vision model is ready */}
    </main>
  );
}
