import React from "react";
import { BiDownArrowCircle } from "react-icons/bi";
import { GiHeavyArrow } from "react-icons/gi";

import Target from "../Target/target";

interface ArenaProps {
	targetDistance: number;
	lastDistFired: number;
	pastShots: number[];
}

const Arena: React.FC<ArenaProps> = ({
	targetDistance,
	lastDistFired,
	pastShots,
}) => {
	console.log(pastShots);
	console.log(lastDistFired);
	return (
		<div className="arena-wrapper">
			<div className="arena">
				<GiHeavyArrow className="arrow" />
				<Target
					distance={targetDistance}
					diff={Math.abs(targetDistance - lastDistFired)}
				/>
				{lastDistFired > 0 &&
					pastShots.map((shot) => {
						return (
							<div
								className="past-shot-indicator"
								style={{ left: `${shot * 8 + 100}px` }}
								key={shot}
							>
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