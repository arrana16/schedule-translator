"use client";
import axios from "axios";
import { useState, useEffect } from "react";

async function getSchedules() {
	try {
		const response = axios
			.get(`http://localhost:4000/getSchedules/`)
			.catch((err) => {});
		return response;
	} catch (err) {
		alert("An error occured");
	}
}

async function deleteSchedule(schedule_id: number) {
	axios
		.delete(`http://localhost:4000/deleteSchedules/${schedule_id}`)
		.catch((err) => {});
}

async function deleteDates(startDate: String, endDate: String) {
	axios
		.delete(`http://localhost:4000/deleteDates/${startDate}/${endDate}`)
		.catch((err) => {});
}

export default function DeleteSchedules() {
	const [schedules, setSchedules] = useState([]);
	const [scheduleSelect, setDelete] = useState(0);
	const [startDate, setStart] = useState("2023-09-01");
	const [endDate, setEnd] = useState("2023-09-02");

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
			<h2>Delete a Schedule</h2>
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
				<p>No Data</p>
			)}
			<div className="schedule-delete">
				<h3>Select a schedule to delete</h3>
				<select
					value={scheduleSelect}
					onChange={(e) => {
						setDelete(parseInt(e.target.value));
					}}
				>
					<option>0</option>
					{optionMap()}
				</select>
				<button onClick={(_) => deleteSchedule(scheduleSelect)}>
					Delete
				</button>
			</div>

			<div className="days-delete">
				<h3>Select dates to delete</h3>
				<b>Start Date</b>
				<input
					type="date"
					value={startDate}
					onChange={(e) => setStart(e.target.value)}
				></input>
				<b>End Date</b>
				<input
					type="date"
					value={endDate}
					onChange={(e) => setEnd(e.target.value)}
				></input>
				<button onClick={(_) => deleteDates(startDate, endDate)}>
					Delete
				</button>
			</div>
		</div>
	);
}
