import styled from "styled-components";
import { COLOR, SIZE, GAP } from "../style";
import { Arrow } from "../icons";
import { Link } from "../parts";

var Btn = styled(Link)`
	all: unset;
	text-decoration: underline;
	font-size: ${SIZE.Base};
	color: ${COLOR.Primary};
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: ${GAP.Small};
`;

export default function ({ to, ...prop }) {
	return (
		<Btn to={to} {...prop}>
			voir <Arrow rotate={-90} size={"14px"} color={COLOR.Primary} />
		</Btn>
	);
}
