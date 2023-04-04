import { FONT, SIZE, GAP, COLOR } from "../../style";
import { Flex, Text } from "../../parts";
import Radio from "@mui/material/Radio";

export default function ({ children, ...props }) {
	return (
		<Flex xs={{ gap: GAP.Small_2, alignItems: "center" }}>
			<Radio
				sx={{
					color: COLOR.Primary,
					width: "16px",
					height: "20px",
					"&.Mui-checked": {
						color: COLOR.Primary,
					},
				}}
				{...props}
			/>
			<Text xs={{ fontWeight: FONT.Base, fontSize: SIZE.Base, textAlign: "left" }}>{children}</Text>
		</Flex>
	);
}
