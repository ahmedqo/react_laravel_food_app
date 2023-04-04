import styled from "styled-components";
import styles from "./Styles";

var Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
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

Grid.Item = styled.div`
	grid-column: ${({ xs = {} }) => (xs.cols ? `span ${xs.cols}` : null)};
	${({ xs = {} }) => styles(xs)}
	@media (min-width: 640px) {
		grid-column: ${({ sm = {} }) => (sm.cols ? `span ${sm.cols}` : null)};
		${({ ms = {} }) => styles(ms)}
	}
	@media (min-width: 768px) {
		grid-column: ${({ md = {} }) => (md.cols ? `span ${md.cols}` : null)};
		${({ md = {} }) => styles(md)}
	}
	@media (min-width: 1024px) {
		grid-column: ${({ lg = {} }) => (lg.cols ? `span ${lg.cols}` : null)};
		${({ lg = {} }) => styles(lg)}
	}
	@media (min-width: 1280px) {
		grid-column: ${({ xl = {} }) => (xl.cols ? `span ${xl.cols}` : null)};
		${({ xl = {} }) => styles(xl)}
	}
`;

export default Grid;
