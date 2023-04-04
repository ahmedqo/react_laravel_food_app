import styled from "styled-components";
import { COLOR, FONT, SIZE } from "../style";
import styles from "./Styles";

export default styled.h1`
	width: 100%;
	margin: 0;
	line-height: 1;
	word-break: break-word;
	font-weight: ${({ xs = {} }) => (xs.fontWeight ? xs.fontWeight : FONT.Large_4)};
	font-size: ${({ xs = {} }) => (xs.fontSize ? xs.fontSize : SIZE.Base)};
	color: ${({ xs = {} }) => (xs.color ? xs.color : COLOR.Black)};
	${({ xs = {} }) => styles(xs)}
	@media (min-width: 640px) {
		${({ ms = {} }) => styles(ms)}
	}
	@media (min-width: 768px) {
		${({ md = {} }) => styles(md)}
	}
	@media (min-width: 1024px) {
		${({ lg = {} }) => styles(lg)}
	}
	@media (min-width: 1280px) {
		${({ xl = {} }) => styles(xl)}
	}
`;
