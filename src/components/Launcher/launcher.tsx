import React from "react";
import { GameState } from "../../App";

interface LauncherProps {
	onClick: () => void;
	curState: GameState;
	curCounter: number;
}

const Index: React.FC<LauncherProps> = ({ onClick, curState, curCounter }) => {
	let buttonText: string = "";

	switch (curState) {
		case GameState.Knocked:
			buttonText = "Draw!";
			break;
		case GameState.Drawn:
			buttonText = "Release!";
			break;
		case GameState.Released:
			buttonText = "Released!";
			break;
		case GameState.Hit:
			buttonText = "Reset!";
			break;
		default:
			break;
	}
	return (
		<button
			className="launcher-button"
			onClick={() => onClick()}
			disabled={curState === GameState.Released}
		>
			{/* <div
				className="stressbar"
				// style={{ width: `${(curCounter * 2) / 3}%` }}
				style={{ width: `50%` }}
			></div> */}
			<h1>{buttonText}</h1>
		</button>
	);
};

export default Index;
