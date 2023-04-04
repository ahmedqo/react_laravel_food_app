import styled from "styled-components";
import { COLOR } from "../style";

var Wrap = styled.span`
	display: flex;
	position: relative;
	align-items: center;
	width: ${(props) => props.pill && (props.size ? props.size + 8 : "32")}px;
	flex-wrap: wrap;
	transform: rotate(${(props) => (props.rotate ? props.rotate : 0)}deg);
	svg {
		display: block;
		width: ${(props) => (props.size ? props.size : "24")}px;
		height: ${(props) => (props.size ? props.size : "24")}px;
		fill: ${(props) => (props.color ? props.color : COLOR.Black)};
	}
`;

export default Wrap;
