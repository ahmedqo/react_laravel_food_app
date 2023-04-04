import React from "react";
import { Grid, Fixed, Flex } from "../../parts";
import { Wrapper } from "../../components";
import { GAP, COLOR, RADIUS } from "../../style";
import { SideLink } from ".";

export default function ({ links = [], children }) {
	return (
		<Wrapper.Wrap>
			<Grid
				xs={{
					gap: GAP.Large,
				}}
			>
				<Grid.Item
					xs={{
						cols: 12,
						display: "none",
					}}
					md={{
						cols: 3,
						display: "block",
					}}
				>
					<Fixed>
						<Flex
							xs={{
								flexDirection: "column",
								background: COLOR.Light,
								borderRadius: RADIUS.Large_2,
								padding: 10,
							}}
						>
							{links.map(({ to, text, icon, ...prop }, i) => (
								<SideLink to={to} key={i} {...prop}>
									{icon && icon} {text}
								</SideLink>
							))}
						</Flex>
					</Fixed>
				</Grid.Item>
				<Grid.Item
					xs={{
						cols: 12,
					}}
					md={{
						cols: 9,
					}}
				>
					{children}
				</Grid.Item>
			</Grid>
		</Wrapper.Wrap>
	);
}
