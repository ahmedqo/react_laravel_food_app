import React from "react";
import { Table, Box } from "../parts";

export default function ({ columns, data }) {
	const head = columns.reduce((acc, el) => [...acc, el.field], []);
	return (
		<Box
			xs={{
				width: "100%",
				overflow: "auto",
			}}
		>
			<Table>
				<Table.Header>
					{columns.map(({ xs = {}, sm = {}, md = {}, lg = {}, xl = {}, ...prop }, i) => (
						<Table.Header.Cell key={i} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
							{prop.label}
						</Table.Header.Cell>
					))}
				</Table.Header>
				{data.map((prop, i) => (
					<Table.Row key={i}>
						{head.map((_el, _i) => (
							<Table.Row.Cell
								key={_i}
								xs={columns[_i]?.xs}
								sm={columns[_i]?.sm}
								md={columns[_i]?.md}
								lg={columns[_i]?.lg}
								xl={columns[_i]?.xl}
							>
								{(columns[_i]?.render && columns[_i]?.render(prop)) || prop[_el]}
							</Table.Row.Cell>
						))}
					</Table.Row>
				))}
			</Table>
		</Box>
	);
}
