import React, { useEffect, useRef, useState } from "react";
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
		<div className="launcher">
			<button className="launcher-button" onClick={() => onClick()}>
				{buttonText}
			</button>

			{/* <span>{bowState === GameStates.Fired && distanceTimer.current}</span> */}
		</div>
	);
};

export default Index;
