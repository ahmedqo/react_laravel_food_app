import styled from "styled-components";

function type(type) {
	switch (type) {
		case "row":
			return [120, 160];
		case "column":
			return [80, 100];
		default:
			return [60, 80];
	}
}

var Logo = styled.img`
	display: block;
	width: ${(prop) => type(prop.type)[0]}px;
	height: auto;
	@media (min-width: 768px) {
		width: ${(prop) => type(prop.type)[1]}px;
	}
`;

export default function ({ type }) {
	const logo = "/asset/" + (type === "row" ? "Logo-row" : type === "column" ? "Logo-column" : "logo") + ".png";
	return <Logo src={process.env.PUBLIC_URL + logo} alt="logo" type={type} />;
}
