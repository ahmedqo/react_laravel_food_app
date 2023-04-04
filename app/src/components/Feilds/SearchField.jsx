import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLOR, RADIUS } from "../../style";
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
			navigate(`/menu/${keyword}`);
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
						padding: 4,
					}}
					md={{
						width: "max-content",
					}}
					onClick={onClick}
				>
					<Search />
				</Button>
			}
			xsPadding={"6px 6px 6px 14px"}
			lgPadding={"6px 6px 6px 20px"}
		/>
	);
}
