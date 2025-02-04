import s from "./LandOwnershipPopup.module.scss";
import cn from "classnames";
import StructuredContent from "./StructuredContent";
import { useEffect, useState } from "react";
import { Modal } from "/components";

export type Props = {
	data: LandOwnershipQuery["landOwnership"];
};

export default function LandOwnershipPopup({ data: { title, text }, data }: Props) {
	const [open, setOpen] = useState(false);
	const close = () => {
		localStorage.setItem("landOwnershipPopup", "false");
		setOpen(false);
	};

	useEffect(() => {
		if (typeof localStorage === "undefined") return;

		// Reset
		//localStorage.removeItem("landOwnershipPopup");

		const open =
			!localStorage.getItem("landOwnershipPopup") &&
			localStorage.getItem("landOwnershipPopup") !== "false";
		setOpen(open);
	}, []);

	if (!open) return null;

	return (
		<Modal>
			<div className={s.container}>
				<div className={cn(s.box)}>
					<h1>{title}</h1>
					<StructuredContent
						id={data.id}
						record={data}
						content={text}
					/>
					<button
						className={s.close}
						onClick={close}
					>
						×
					</button>
				</div>
			</div>
		</Modal>
	);
}
