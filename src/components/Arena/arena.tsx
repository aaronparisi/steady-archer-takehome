import React from "react";
import { BiDownArrowCircle } from "react-icons/bi";
import { GiHeavyArrow } from "react-icons/gi";

import Target from "../Target/target";

interface ArenaProps {
	targetDistance: number;
	pastShots: number[];
}

const Arena: React.FC<ArenaProps> = ({ targetDistance, pastShots }) => {
	const numShots = pastShots.length;

	return (
		<div className="arena-wrapper">
			<div className="spacer"></div>
			<div className="arena">
				<GiHeavyArrow className="arrow" />
				<Target
					distance={targetDistance}
					diff={Math.abs(targetDistance - pastShots[pastShots.length - 1])}
				/>
				{pastShots.length > 0 &&
					pastShots.map((shot, idx) => {
						return (
							<div
								className="past-shot-indicator"
								style={{ left: `${shot * 8 + 50 - 8}px` }} // the + 50 is to account for the width of the bow icon, the - 8 is to account for the width of the indicator itself
								key={shot}
							>
								<div className="past-shot-indicator-counter">
									{numShots - idx}
								</div>
								<BiDownArrowCircle />
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Arena;

// TODO - past shot indicator keys get duplicated if I have 2 past shots with the same distance
// I wonder if the fact that we are basically rendering the same little icon makes the issue 'go away'?
