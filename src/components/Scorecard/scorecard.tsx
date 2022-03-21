import React from "react";
import { GameState } from "../../App";

interface ScoreCardProps {
	gameState: GameState;
	targetDistance: number;
	score: number;
	pastShots: number[];
}

const Scorecard: React.FC<ScoreCardProps> = ({
	gameState,
	targetDistance,
	score,
	pastShots,
}) => {
	let gameStateText: string = "";

	switch (gameState) {
		case GameState.Knocked:
			gameStateText = "Bow is knocked!";
			break;
		case GameState.Drawn:
			gameStateText = "Bow is drawn!";
			break;
		case GameState.Fired:
			gameStateText = "Arrow has been fired!";
			break;
		case GameState.Hit:
			gameStateText = "You hit the target!!";
			break;
		default:
			break;
	}

	return (
		<div className="scorecard">
			<h1>Scorecard</h1>
			<p>Announcements: {gameStateText}</p>
			<p>Target is {targetDistance} feet away!</p>
			<p>Score is {score}</p>
			<p>Past shots:</p>
			<ul className="pastShots">
				{pastShots.map((shot) => {
					return <li key={shot}>{shot}</li>;
				})}
			</ul>
		</div>
	);
};

export default Scorecard;
