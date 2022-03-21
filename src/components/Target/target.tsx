import React from "react";

interface TargetProps {
	distance: number;
	diff: number | null;
}

// css is UGLY here
// and also it won't do anything because currently the target resets itself instantly on a hit

const Index: React.FC<TargetProps> = ({ distance, diff }) => {
	return (
		<div className="target" style={{ left: distance * 8 + 10 }}>
			<div
				className="outer-ring ring"
				// id={diff !== null && diff > 2 && diff < 3 ? "hit" : ""}
			>
				<div
					className="inner-ring ring"
					// id={diff !== null && diff > 1 && diff < 2 ? "hit" : ""}
				>
					<div
						className="bullseye ring"
						// id={diff !== null && diff < 1 ? "hit" : ""}
					></div>
				</div>
			</div>
		</div>
	);
};

export default Index;
