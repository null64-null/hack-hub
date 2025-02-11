import DebatePage from "./components/pages/DebatePage";

export default function Home() {
  return (
    <div className="flex justify-center">
      <h1 className="text-4xl font-bold absolute top-8">
        AI ディベートメーカー
      </h1>
      <div className="flex justify-center items-center h-screen">
        <DebatePage />
      </div>
    </div>
  );
}
