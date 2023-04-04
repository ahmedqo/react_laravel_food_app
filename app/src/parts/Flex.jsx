import styled from "styled-components";
import styles from "./Styles";

export default styled.div`
	display: flex;
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
