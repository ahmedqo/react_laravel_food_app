import React from "react";
import Wrap from "./Wrap";
import { COLOR } from "../style";

export default function () {
	return (
		<Wrap color={COLOR.Primary}>
			<svg viewBox="0 0 30 31">
				<path d="M15 0.5C6.72 0.5 0 7.22 0 15.5C0 23.78 6.72 30.5 15 30.5H22.5V27.5H15C8.49 27.5 3 22.01 3 15.5C3 8.99 8.49 3.5 15 3.5C21.51 3.5 27 8.99 27 15.5V17.645C27 18.83 25.935 20 24.75 20C23.565 20 22.5 18.83 22.5 17.645V15.5C22.5 11.36 19.14 8 15 8C10.86 8 7.5 11.36 7.5 15.5C7.5 19.64 10.86 23 15 23C17.07 23 18.96 22.16 20.31 20.795C21.285 22.13 22.965 23 24.75 23C27.705 23 30 20.6 30 17.645V15.5C30 7.22 23.28 0.5 15 0.5ZM15 20C12.51 20 10.5 17.99 10.5 15.5C10.5 13.01 12.51 11 15 11C17.49 11 19.5 13.01 19.5 15.5C19.5 17.99 17.49 20 15 20Z" />
			</svg>
		</Wrap>
	);
}
