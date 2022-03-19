import React, { useEffect, useRef, useState } from "react";
import { GiHeavyArrow } from "react-icons/gi";

interface LauncherProps {
	onFire: (distance: number) => void;
}

enum LaunchStatuses {
	Loaded,
	Drawing,
	Fired,
}

let intervalId: NodeJS.Timeout;
const Index: React.FC<LauncherProps> = ({ onFire }) => {
	const [bowState, setBowState] = useState<LaunchStatuses>(
		LaunchStatuses.Loaded
	);
	const distanceTimer = useRef<number>(0);

	useEffect(() => {
		if (bowState === LaunchStatuses.Drawing) {
			// start timer
			intervalId = setInterval(() => {
				distanceTimer.current += 1;
			}, 20);
		} else if (bowState === LaunchStatuses.Fired) {
			// stop timer
			clearInterval(intervalId);

			// launch arrow
			onFire(Math.min(distanceTimer.current, 150));

			// reset timer, bow state
			distanceTimer.current = 0;
			setBowState(LaunchStatuses.Loaded);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bowState]);

	const transitionBowState = () => {
		switch (bowState) {
			case LaunchStatuses.Loaded:
				setBowState(LaunchStatuses.Drawing);
				break;
			case LaunchStatuses.Drawing:
				setBowState(LaunchStatuses.Fired);
				break;
			case LaunchStatuses.Fired:
				setBowState(LaunchStatuses.Loaded);
				break;
			default:
				break;
		}
	};

	return (
		<div className="launcher">
			<button className="launcher-button" onClick={() => transitionBowState()}>
				{bowState === LaunchStatuses.Loaded ? "Draw" : "Fire"}
			</button>
			<GiHeavyArrow className="arrow" />
			<span>{bowState === LaunchStatuses.Fired && distanceTimer.current}</span>
		</div>
	);
};

export default Index;
