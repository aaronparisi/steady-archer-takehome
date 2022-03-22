import React from "react";
import { GameState } from "../../App";

interface ScoreCardProps {
	gameState: GameState;
	targetDistance: number;
	score: number;
	pastShots: number[];
}

interface ScoreCardItemProps {
	itemTitle: string;
	itemContents: number;
}

const ScoreCardItem: React.FC<ScoreCardItemProps> = ({
	itemTitle,
	itemContents,
}) => {
	return (
		<div className="scorecard-item">
			<h4 className="scorecard-item-title">{itemTitle}</h4>
			<div className="scorecard-item-contents-container">
				<h1 className="scorecard-item-contents">{itemContents}</h1>
			</div>
		</div>
	);
};

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
		case GameState.Released:
			gameStateText = "Arrow has been fired!";
			break;
		case GameState.Hit:
			gameStateText = "You hit the target!!";
			break;
		default:
			break;
	}

	const numShots = pastShots.length;

	return (
		<div className="scorecard">
			<h2 className="scorecard-ticker">{gameStateText}</h2>

			<div className="scorecard-body">
				<div className="scorecard-numbers">
					<ScoreCardItem itemTitle="Tgt Dist" itemContents={targetDistance} />
					<ScoreCardItem itemTitle="Score" itemContents={score} />
				</div>

				<div className="scorecard-past-shots">
					<h3>Past shots:</h3>
					<ul>
						{pastShots.map((shot, idx) => {
							return <li key={shot}>{`${numShots - idx}: ${shot}`}</li>;
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Scorecard;
