import styled from "styled-components";
import { COLOR, RADIUS } from "../../style";
import { Check, Times } from "../../icons";
import { Button } from "..";

var Stepper = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	z-index: 1;
	margin-bottom: 2rem;
	&::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 4px;
		background-color: ${COLOR.Primary};
		transform: translateY(-50%);
		z-index: -1;
	}
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: ${COLOR.White};
		border-radius: ${RADIUS.Rounded};
		border: 4px solid ${COLOR.White};
		padding: 6px;
		position: relative;
		label {
			position: absolute;
			top: calc(100% + 1rem);
			left: 50%;
			transform: translateX(-50%);
			font-size: 1rem;
		}
		svg {
			fill: ${COLOR.Primary};
		}
	}
	div:nth-child(-n + ${(props) => props.step}) {
		background-color: ${COLOR.Primary};
		label {
			font-weight: 900;
		}
		svg {
			fill: ${COLOR.White};
		}
	}
	div:last-child {
		${(prop) =>
			prop.step === 0 &&
			prop.yep &&
			`background-color: ${COLOR.Primary};
		label {
			font-weight: 900;
		}
		svg {
			fill: ${COLOR.White};
		}`}
	}
`;

export default function ({ status, onClick = false, order }) {
	return (
		<Stepper {...(status >= 0 ? { step: 1 + status } : { step: 0 })} {...(onClick && { yep: true })}>
			<div>
				{status < 0 ? (
					onClick ? (
						<Button
							xs={{
								width: 24,
								height: 24,
								padding: 0,
								background: "transparent",
							}}
							md={{ width: 24, height: 24 }}
							onClick={() => {
								onClick(0, order);
							}}
						>
							<Times />
						</Button>
					) : (
						<Times />
					)
				) : onClick ? (
					<Button
						xs={{
							width: 24,
							height: 24,
							padding: 0,
							background: "transparent",
						}}
						md={{ width: 24, height: 24 }}
						onClick={() => {
							onClick(0, order);
						}}
					>
						<Check />
					</Button>
				) : (
					<Check />
				)}
				{status < 0 ? <label>Passer</label> : <label>Passé</label>}
			</div>
			<div>
				{status < 1 ? (
					onClick ? (
						<Button
							xs={{
								width: 24,
								height: 24,
								padding: 0,
								background: "transparent",
							}}
							md={{ width: 24, height: 24 }}
							onClick={() => {
								onClick(1, order);
							}}
						>
							<Times />
						</Button>
					) : (
						<Times />
					)
				) : onClick ? (
					<Button
						xs={{
							width: 24,
							height: 24,
							padding: 0,
							background: "transparent",
						}}
						md={{ width: 24, height: 24 }}
						onClick={() => {
							onClick(1, order);
						}}
					>
						<Check />
					</Button>
				) : (
					<Check />
				)}
				{status < 1 ? <label>Confirmer</label> : <label>Confirmé</label>}
			</div>
			<div>
				{status < 2 ? (
					onClick ? (
						<Button
							xs={{
								width: 24,
								height: 24,
								padding: 0,
								background: "transparent",
							}}
							md={{ width: 24, height: 24 }}
							onClick={() => {
								onClick(2, order);
							}}
						>
							<Times />
						</Button>
					) : (
						<Times />
					)
				) : onClick ? (
					<Button
						xs={{
							width: 24,
							height: 24,
							padding: 0,
							background: "transparent",
						}}
						md={{ width: 24, height: 24 }}
						onClick={() => {
							onClick(2, order);
						}}
					>
						<Check />
					</Button>
				) : (
					<Check />
				)}
				{status < 2 ? <label>Preparer</label> : <label>Preparé</label>}
			</div>
			<div>
				{status < 3 ? (
					onClick ? (
						<Button
							xs={{
								width: 24,
								height: 24,
								padding: 0,
								background: "transparent",
							}}
							md={{ width: 24, height: 24 }}
							onClick={() => {
								onClick(3, order);
							}}
						>
							<Times />
						</Button>
					) : (
						<Times />
					)
				) : onClick ? (
					<Button
						xs={{
							width: 24,
							height: 24,
							padding: 0,
							background: "transparent",
						}}
						md={{ width: 24, height: 24 }}
						onClick={() => {
							onClick(3, order);
						}}
					>
						<Check />
					</Button>
				) : (
					<Check />
				)}
				{status < 3 ? <label>Terminer</label> : <label>Terminé</label>}
			</div>
			{onClick && (
				<div>
					{status !== -1 ? (
						<Button
							xs={{
								width: 24,
								height: 24,
								padding: 0,
								background: "transparent",
							}}
							md={{ width: 24, height: 24 }}
							onClick={() => {
								onClick(-1, order);
							}}
						>
							<Times />
						</Button>
					) : (
						<Button
							xs={{
								width: 24,
								height: 24,
								padding: 0,
								background: "transparent",
							}}
							md={{ width: 24, height: 24 }}
							onClick={() => {
								onClick(-1, order);
							}}
						>
							<Check />
						</Button>
					)}
					{status !== -1 ? <label>Annuler</label> : <label>Annulé</label>}
				</div>
			)}
		</Stepper>
	);
}
