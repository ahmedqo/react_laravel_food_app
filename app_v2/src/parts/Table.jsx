import styled from "styled-components";
import { SIZE, COLOR, FONT, RADIUS } from "../style";
import styles from "./Styles";

var Table = styled.div`
	width: 100%;
	display: table;
	border-spacing: 0 10px;
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

Table.Header = styled.div`
	display: table-row;
	background: ${COLOR.White};
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
Table.Row = styled.div`
	display: table-row;
	background: ${COLOR.Light};
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

Table.Header.Cell = styled.div`
	display: table-cell;
	padding: 0 20px;
	font-size: ${SIZE.Small};
	font-weight: ${FONT.Large_5};
	&:first-child {
		border-top-left-radius: ${RADIUS.Large};
		border-bottom-left-radius: ${RADIUS.Large};
	}
	&:last-child {
		border-bottom-right-radius: ${RADIUS.Large};
		border-top-right-radius: ${RADIUS.Large};
	}
	${({ xs = {} }) => styles(xs)}
	@media (min-width: 640px) {
		${({ ms = {} }) => styles(ms)}
	}
	@media (min-width: 768px) {
		&:first-child {
			border-top-left-radius: ${RADIUS.Large_2};
			border-bottom-left-radius: ${RADIUS.Large_2};
		}
		&:last-child {
			border-bottom-right-radius: ${RADIUS.Large_2};
			border-top-right-radius: ${RADIUS.Large_2};
		}
		${({ md = {} }) => styles(md)}
	}
	@media (min-width: 1024px) {
		${({ lg = {} }) => styles(lg)}
	}
	@media (min-width: 1280px) {
		${({ xl = {} }) => styles(xl)}
	}
`;

Table.Row.Cell = styled.div`
	display: table-cell;
	padding: 14px 20px;
	vertical-align: middle;
	&:first-child {
		border-top-left-radius: ${RADIUS.Large};
		border-bottom-left-radius: ${RADIUS.Large};
	}
	&:last-child {
		border-bottom-right-radius: ${RADIUS.Large};
		border-top-right-radius: ${RADIUS.Large};
	}
	${({ xs = {} }) => styles(xs)}
	@media (min-width: 640px) {
		${({ ms = {} }) => styles(ms)}
	}
	@media (min-width: 768px) {
		&:first-child {
			border-top-left-radius: ${RADIUS.Large_2};
			border-bottom-left-radius: ${RADIUS.Large_2};
		}
		&:last-child {
			border-bottom-right-radius: ${RADIUS.Large_2};
			border-top-right-radius: ${RADIUS.Large_2};
		}
		${({ md = {} }) => styles(md)}
	}
	@media (min-width: 1024px) {
		${({ lg = {} }) => styles(lg)}
	}
	@media (min-width: 1280px) {
		${({ xl = {} }) => styles(xl)}
	}
`;

export default Table;
