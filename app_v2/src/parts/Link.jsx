import styled from "styled-components";
import { NavLink } from "react-router-dom";
import styles from "./Styles";

var Link = styled(NavLink)`
	display: inline-block;
	text-decoration: none;
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

export default Link;
