import GameBoard from "./components/GameBoard";

export default function App() {
  return (
    <div className="min-h-screen bg-green-800 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Football 4-4-2</h1>
      <GameBoard />
    </div>
  );
}
