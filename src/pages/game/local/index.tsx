import { Board } from "../components/Board";
import GameStateProvider from "~/context/GameContext";

export default function LocalGame() {
  return (
    <>
      <GameStateProvider>
        <Board />
      </GameStateProvider>
    </>
  );
}
