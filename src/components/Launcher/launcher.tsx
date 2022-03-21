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
			buttonText = "Fire!";
			break;
		case GameState.Fired:
			buttonText = "Calculating...";
			break;
		case GameState.Hit:
			buttonText = "Reset Target!";
			break;
		default:
			break;
	}
	return (
		<button className="launcher-button" onClick={() => onClick()}>
			<h1>{buttonText}</h1>
		</button>
	);
};

export default Index;
