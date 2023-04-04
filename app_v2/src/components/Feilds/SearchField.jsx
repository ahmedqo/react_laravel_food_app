import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLOR } from "../../style";
import { Search } from "../../icons";
import { TextField } from ".";
import { Button } from "..";

export default function () {
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();

	const onChange = (e) => {
		setKeyword(e.target.value);
	};
	const onClick = () => {
		if (keyword.trim()) {
			navigate(`/menu?q=${keyword}`);
		} else {
			navigate("/menu");
		}
	};
	const onKeyDown = (e) => {
		if (e.keyCode === 13) {
			onClick();
		}
	};

	return (
		<TextField
			showLabel={false}
			label="Rechercher plats pour..."
			value={keyword}
			changed={onChange}
			onKeyDown={onKeyDown}
			suffix={
				<Button
					xs={{
						width: "max-content",
						background: "transparent",
						padding: 0,
					}}
					md={{
						width: "max-content",
					}}
					onClick={onClick}
				>
					<Search color={COLOR.Primary} size="24" />
				</Button>
			}
		/>
	);
}
