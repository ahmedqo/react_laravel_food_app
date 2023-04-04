import styled from "styled-components";
import styles from "./Styles";

export default styled.div`
	display: block;
	width: 100%;
	height: 100%;
	background-color: rgb(29 29 29 / 50%);
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	background-blend-mode: overlay;
	background-image: ${({ xs = {} }) => (xs.src ? `url(${process.env.PUBLIC_URL + xs.src})` : null)};
	${({ xs = {} }) => styles(xs)}
	@media (min-width: 640px) {
		background-image: ${({ sm = {} }) => (sm.src ? `url(${process.env.PUBLIC_URL + sm.src})` : null)};
		${({ ms = {} }) => styles(ms)}
	}
	@media (min-width: 768px) {
		background-image: ${({ md = {} }) => (md.src ? `url(${process.env.PUBLIC_URL + md.src})` : null)};
		${({ md = {} }) => styles(md)}
	}
	@media (min-width: 1024px) {
		background-image: ${({ lg = {} }) => (lg.src ? `url(${process.env.PUBLIC_URL + lg.src})` : null)};
		${({ lg = {} }) => styles(lg)}
	}
	@media (min-width: 1280px) {
		background-image: ${({ xl = {} }) => (xl.src ? `url(${process.env.PUBLIC_URL + xl.src})` : null)};
		${({ xl = {} }) => styles(xl)}
	}
`;
