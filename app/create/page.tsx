"use client";

import { useState } from "react";
import axios from "axios";

async function postSchedule(blocks: any[]) {
	let status = "";
	axios
		.post(`http://localhost:4000/addSchedule`, {
			data: blocks,
		})
		.then((res) => {
			status = "Success";
			alert("Succesfully created a new schedule");
			return status;
		})
		.catch((err) => {
			alert("An error occured");
			status = "Error";
		});
	return status;
}
export default function createNew() {
	const [blocks, setBlocks] = useState([
		{ id: 1, block: "A1", start_time: "8:45", end_time: "10:00" },
	]);

	function blockChange(index: number, value: string, changeType: string) {
		let nextBlock = [];
		if (changeType == "block") {
			nextBlock = blocks.map((c, i) => {
				if (i == index) {
					return {
						id: c.id,
						block: value,
						start_time: c.start_time,
						end_time: c.end_time,
					};
				} else {
					return c;
				}
			});
		} else if (changeType == "start_time") {
			nextBlock = blocks.map((c, i) => {
				if (i == index) {
					return {
						id: c.id,
						block: c.block,
						start_time: value,
						end_time: c.end_time,
					};
				} else {
					return c;
				}
			});
		} else {
			nextBlock = blocks.map((c, i) => {
				if (i == index) {
					return {
						id: c.id,
						block: c.block,
						start_time: c.start_time,
						end_time: value,
					};
				} else {
					return c;
				}
			});
		}

		setBlocks(nextBlock);
	}

	return (
		<div>
			<h1>Create New Schedule</h1>
			{blocks.map((block, blockIndex) => (
				<div key={blockIndex}>
					<select
						name="block"
						id="block"
						className="options-row"
						value={block.block}
						onChange={(e) =>
							blockChange(blockIndex, e.target.value, "block")
						}
					>
						<option value="A1">A1</option>
						<option value="B1">B1</option>
						<option value="C1">C1</option>
						<option value="D1">D1</option>
						<option value="A2">A2</option>
						<option value="B2">B2</option>
						<option value="C2">C2</option>
						<option value="D2">D2</option>
						<option value="BT">BT</option>
						<option value="Club">Club</option>
					</select>
					<input
						type="text"
						id="startTime"
						className="options-row"
						value={block.start_time}
						onChange={(e) =>
							blockChange(
								blockIndex,
								e.target.value,
								"start_time"
							)
						}
					></input>
					<input
						type="text"
						id="endTime"
						className="options-row"
						value={block.end_time}
						onChange={(e) =>
							blockChange(blockIndex, e.target.value, "end_time")
						}
					></input>
				</div>
			))}
			<div className="add-block">
				<button
					onClick={(e) =>
						setBlocks([
							...blocks,
							{
								id: blocks.length + 1,
								block: "A1",
								start_time: "8:45",
								end_time: "10:00",
							},
						])
					}
				>
					Add Block
				</button>
			</div>

			<button
				className="submit"
				onClick={async (e) => {
					const result = await postSchedule(blocks);
				}}
			>
				Submit Schedule
			</button>
		</div>
	);
}
