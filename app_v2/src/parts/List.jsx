import styled from "styled-components";
import { COLOR } from "../style";
import styles from "./Styles";

var List = styled.ul`
	display: grid;
	padding: 0;
	margin: 0;
	grid-template-columns: repeat(2, 1fr);
	${({ xs = {} }) => styles(xs)}
	@media (min-width: 640px) {
		${({ ms = {} }) => styles(ms)}
	}
	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
		${({ md = {} }) => styles(md)}
	}
	@media (min-width: 1024px) {
		${({ lg = {} }) => styles(lg)}
	}
	@media (min-width: 1280px) {
		${({ xl = {} }) => styles(xl)}
	}
`;

List.Item = styled.li`
	display: flex;
	align-items: center;
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
	&:before {
		content: "";
		display: block;
		width: 8px;
		height: 8px;
		background-color: ${COLOR.Primary};
		border-radius: 10px;
		@media (min-width: 768px) {
			width: 10px;
			height: 10px;
		}
	}
`;

export default List;
