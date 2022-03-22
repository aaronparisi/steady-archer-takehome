import React from "react";
import { GameState } from "../../App";

interface LauncherProps {
	onClick: () => void;
	curState: GameState;
}

const Index: React.FC<LauncherProps> = ({ onClick, curState }) => {
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
			buttonText = "Reset Target!";
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
			<h1>{buttonText}</h1>
		</button>
	);
};

export default Index;
