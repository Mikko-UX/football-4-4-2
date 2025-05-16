
import { useState } from "react";

const initialFormation = () => {
  const grid = Array(8).fill(null).map(() => Array(6).fill(null));
  const place = (row, col, role, player) => {
    grid[row][col] = { role, player, skills: { pass: 6, kick: 6, attack: 6, defense: 6 } };
  };
  place(0, 2, "GK", "A");
  [0, 1, 2, 3].forEach((_, idx) => place(1, idx + 1, "DF", "A"));
  [0, 1, 2, 3].forEach((_, idx) => place(2, idx + 1, "MF", "A"));
  [0, 1].forEach((_, idx) => place(3, idx + 2, "FW", "A"));
  place(7, 3, "GK", "B");
  [0, 1, 2, 3].forEach((_, idx) => place(6, idx + 1, "DF", "B"));
  [0, 1, 2, 3].forEach((_, idx) => place(5, idx + 1, "MF", "B"));
  [0, 1].forEach((_, idx) => place(4, idx + 2, "FW", "B"));
  return grid;
};

const roll = (sides) => Math.floor(Math.random() * sides) + 1;
const drawTacticCard = () => {
  const effects = [
    "+2 pass",
    "+2 attack",
    "+2 defense",
    "+2 kick",
    "+2 save",
    "Skill Pass",
    "Steal the Ball",
    "Counter Attack",
    "Extra Throw"
  ];
  return effects[Math.floor(Math.random() * effects.length)];
};

export default function GameBoard() {
  const [board, setBoard] = useState(initialFormation());
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [turn, setTurn] = useState("A");
  const [attackTurns, setAttackTurns] = useState({ A: 3, B: 3 });
  const [tacticCards, setTacticCards] = useState({ A: [], B: [] });
  const [activeCard, setActiveCard] = useState(null);
  const [usedCards, setUsedCards] = useState([]);
  const [score, setScore] = useState({ A: 0, B: 0 });
  const [half, setHalf] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const addGoal = (player) => {
    setScore(prev => ({ ...prev, [player]: prev[player] + 1 }));
  };

  const discardActiveCard = () => {
    if (activeCard) {
      setTacticCards(prev => ({
        ...prev,
        [turn]: prev[turn].filter(c => c !== activeCard),
      }));
      setUsedCards(prev => [...prev, activeCard]);
      setActiveCard(null);
    }
  };

  const endTurn = () => {
    setAttackTurns(prev => {
      const updated = { ...prev, [turn]: prev[turn] - 1 };
      if (updated[turn] <= 0) {
        const next = turn === "A" ? "B" : "A";
        updated[next] = 3;
        if (updated["A"] <= 0 && updated["B"] <= 0) {
          if (half === 1) {
            setHalf(2);
            updated["A"] = 3;
            updated["B"] = 3;
            setTacticCards({
              A: Array(2).fill(0).map(drawTacticCard),
              B: Array(2).fill(0).map(drawTacticCard)
            });
            setMessage("Toinen puoliaika alkaa!");
          } else {
            setGameOver(true);
            setMessage("Peli päättyi!");
          }
        } else {
          setTurn(next);
          setTacticCards(prevCards => ({
            ...prevCards,
            [next]: Array(2).fill(0).map(drawTacticCard)
          }));
          setMessage(`Vuoro siirtyy pelaajalle ${next}`);
        }
      }
      return updated;
    });
  };

  return (
    <div>
      <div className="mb-2">
        <div>{message}</div>
        <div>Peliaika: {half}. puoliaika</div>
        <div>Pisteet – Pelaaja A: {score.A} | Pelaaja B: {score.B}</div>
        {gameOver && (
          <div className="text-xl font-bold mt-2">
            {score.A > score.B
              ? "Pelaaja A voitti pelin!"
              : score.B > score.A
              ? "Pelaaja B voitti pelin!"
              : "Peli päättyi tasan!"}
          </div>
        )}
      </div>
    </div>
  );
}
