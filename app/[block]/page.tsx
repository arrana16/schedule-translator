"use client";
import axios from "axios";
import { useEffect, useState } from "react";

async function getSchedules() {
	try {
		const response = axios
			.get(`http://localhost:4000/getSchedules/`)
			.catch((err) => {});
		return response;
	} catch (err) {}
}

async function editSchedule(
	date: String,
	schedule_id: number,
	g9_bt: String,
	g10_bt: String,
	g11_bt: String,
	g12_bt: String
) {
	let data = {
		date: date,
		schedule_id: schedule_id,
		g9_bt: g9_bt,
		g10_bt: g10_bt,
		g11_bt: g11_bt,
		g12_bt: g12_bt,
	};
	try {
		if (schedule_id != 0) {
			const response = await axios.patch(
				`http://localhost:4000/editDate/`,
				data
			);
			alert("Success");
			return "Success";
		} else {
			alert("Schedule ID cannot be 0");
			return "Error";
		}
	} catch (error) {
		alert("An error occurred");
		return "Error";
	}
}

export default function EditPage({ params }: any) {
	const [schedules, setSchedules] = useState([]);
	const [option, setOption] = useState(0);
	const [g9_bt, setG9] = useState("");
	const [g10_bt, setG10] = useState("");
	const [g11_bt, setG11] = useState("");
	const [g12_bt, setG12] = useState("");
	const [requestMessage, setMessage] = useState("");

	useEffect(() => {
		async function updateSchedules() {
			let schedules = await getSchedules();
			setSchedules(schedules?.data.data);
		}

		updateSchedules();
	});

	function optionMap() {
		try {
			return schedules.map((schedule, index) => (
				<option key={index}>{schedule[index].schedule_id}</option>
			));
		} catch (err) {}
	}

	return (
		<div>
			<h1>{params.block}</h1>
			{Array.isArray(schedules) && schedules.length > 0 ? (
				schedules.map((schedule, index) => (
					<div key={index} className="schedule-display">
						<h3>Schedule ID: {schedule[index].schedule_id}</h3>
						{schedule.map((block, blockIndex) => (
							<p key={blockIndex}>
								{block.class_block} &nbsp; {block.start_time} -{" "}
								{block.end_time}
							</p>
						))}
					</div>
				))
			) : (
				<p>invalid data</p>
			)}
			<div className="edit-schedule">
				<h2>Edit Schedule</h2>
				<select
					value={option}
					onChange={(e) => setOption(parseInt(e.target.value))}
				>
					<option>0</option>
					{optionMap()}
				</select>
				<div className="blue-time-selection">
					<b>Grade 9 BT</b>
					<select
						value={g9_bt}
						onChange={(e) => setG9(e.target.value)}
					>
						<option></option>
						<option>Assembly</option>
						<option>Advisory</option>
						<option>Chapel</option>
						<option>Guidance</option>
						<option>Extra Help</option>
						<option>CYOA</option>
						<option>Free Time</option>
						<option>Other</option>
					</select>
					<b>Grade 10 BT</b>
					<select
						value={g10_bt}
						onChange={(e) => setG10(e.target.value)}
					>
						<option></option>
						<option>Assembly</option>
						<option>Advisory</option>
						<option>Chapel</option>
						<option>Guidance</option>
						<option>Extra Help</option>
						<option>CYOA</option>
						<option>Free Time</option>
						<option>Other</option>
					</select>
					<b>Grade 11 BT</b>
					<select
						value={g11_bt}
						onChange={(e) => setG11(e.target.value)}
					>
						<option></option>
						<option>Assembly</option>
						<option>Advisory</option>
						<option>Chapel</option>
						<option>Guidance</option>
						<option>Extra Help</option>
						<option>CYOA</option>
						<option>Free Time</option>
						<option>Other</option>
					</select>
					<b>Grade 12 BT</b>
					<select
						value={g12_bt}
						onChange={(e) => setG12(e.target.value)}
					>
						<option></option>
						<option>Assembly</option>
						<option>Advisory</option>
						<option>Chapel</option>
						<option>Guidance</option>
						<option>Extra Help</option>
						<option>CYOA</option>
						<option>Free Time</option>
						<option>Other</option>
					</select>
				</div>

				<button
					onClick={async (e) => {
						const response = await editSchedule(
							params.block,
							option,
							g9_bt,
							g10_bt,
							g11_bt,
							g12_bt
						);
						setMessage(response);
					}}
				>
					Confirm Change
				</button>
				<p>{requestMessage}</p>
			</div>
		</div>
	);
}
