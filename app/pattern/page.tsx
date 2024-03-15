"use client";
import axios from "axios";
import { useEffect, useState } from "react";

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

async function setSchedules(dates: any[]) {
	let status = "";
	axios
		.post("http://localhost:4000/assignSchedules", { data: dates })
		.then((res) => {
			if (res.status == 200) {
				status = "succesful";
				alert("Succesful");
				return status;
			} else {
				status = "error";
				alert("An error occured");
				return status;
			}
		})
		.catch((err) => {
			status = "error";
			alert("An error occured");
			return status;
		});
	return status;
}

async function assignSchedules(
	startDate: string | number | Date,
	endDate: string | number | Date,
	week1: any[],
	week2: any[],
	bt1: any[],
	bt2: any[]
) {
	function addOneDay(date: Date) {
		date.setDate(date.getDate() + 1);
		return date;
	}

	let firstDate = new Date(`${startDate}`);
	let secondDate = new Date(`${endDate}`);

	if (
		firstDate.getTime() > secondDate.getTime() ||
		week1.includes(0) ||
		week2.includes(0)
	) {
		alert(
			"End date must be after start date or you have selected 0 as one of your choices"
		);
	} else {
		let scheduleAssignments = [];
		let week = 1;

		while (firstDate.getTime() <= secondDate.getTime()) {
			if (firstDate.getUTCDay() != 0 && firstDate.getUTCDay() != 6) {
				if (week == 1) {
					scheduleAssignments.push({
						date: new Date(firstDate),
						schedule: week1[firstDate.getUTCDay() - 1],
						g9_bt: bt1[firstDate.getUTCDay() - 1]["G9"],
						g10_bt: bt1[firstDate.getUTCDay() - 1]["G10"],
						g11_bt: bt1[firstDate.getUTCDay() - 1]["G11"],
						g12_bt: bt1[firstDate.getUTCDay() - 1]["G12"],
					});
				} else {
					scheduleAssignments.push({
						date: new Date(firstDate),
						schedule: week2[firstDate.getUTCDay() - 1],
						g9_bt: bt2[firstDate.getUTCDay() - 1]["G9"],
						g10_bt: bt2[firstDate.getUTCDay() - 1]["G10"],
						g11_bt: bt2[firstDate.getUTCDay() - 1]["G11"],
						g12_bt: bt2[firstDate.getUTCDay() - 1]["G12"],
					});
				}
			}

			firstDate = addOneDay(firstDate);
			if (firstDate.getDay() == 6) {
				if (week == 1) {
					week = 2;
				} else {
					week = 1;
				}
			}
		}
		if (secondDate.getUTCDay() != 0 && secondDate.getUTCDay() != 6) {
			if (week == 1) {
				scheduleAssignments.push({
					date: secondDate,
					schedule: week1[secondDate.getUTCDay() - 1],
					g9_bt: bt1[secondDate.getUTCDay() - 1]["G9"],
					g10_bt: bt1[secondDate.getUTCDay() - 1]["G10"],
					g11_bt: bt1[secondDate.getUTCDay() - 1]["G11"],
					g12_bt: bt1[secondDate.getUTCDay() - 1]["G12"],
				});
			} else {
				scheduleAssignments.push({
					date: secondDate,
					schedule: week2[secondDate.getUTCDay() - 1],
					g9_bt: bt2[secondDate.getUTCDay() - 1]["G9"],
					g10_bt: bt2[secondDate.getUTCDay() - 1]["G10"],
					g11_bt: bt2[secondDate.getUTCDay() - 1]["G11"],
					g12_bt: bt2[secondDate.getUTCDay() - 1]["G12"],
				});
			}
		}
		console.log(scheduleAssignments);
		setSchedules(scheduleAssignments);
	}
}
export default function SetPattern() {
	const [schedules, setSchedules] = useState([]);
	const [week1, setSelected1] = useState([0, 0, 0, 0, 0]);
	const [week2, setSelected2] = useState([0, 0, 0, 0, 0]);
	const [blueTime1, setBlueTime1] = useState([
		{ G9: "Assembly", G10: "Assembly", G11: "Assembly", G12: "Assembly" },
		{ G9: "Assembly", G10: "Assembly", G11: "Assembly", G12: "Assembly" },
		{ G9: "Assembly", G10: "Assembly", G11: "Assembly", G12: "Assembly" },
		{ G9: "Assembly", G10: "Assembly", G11: "Assembly", G12: "Assembly" },
		{ G9: "Assembly", G10: "Assembly", G11: "Assembly", G12: "Assembly" },
	]);
	const [blueTime2, setBlueTime2] = useState([
		{ G9: "Assembly", G10: "Assembly", G11: "Assembly", G12: "Assembly" },
		{ G9: "Assembly", G10: "Assembly", G11: "Assembly", G12: "Assembly" },
		{ G9: "Assembly", G10: "Assembly", G11: "Assembly", G12: "Assembly" },
		{ G9: "Assembly", G10: "Assembly", G11: "Assembly", G12: "Assembly" },
		{ G9: "Assembly", G10: "Assembly", G11: "Assembly", G12: "Assembly" },
	]);
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

	function updateList(week: Number, index: number, value: number) {
		if (week == 1) {
			let updateList = week1;
			updateList[index] = value;
			setSelected1(updateList);
		} else {
			let updateList = week2;
			updateList[index] = value;
			setSelected2(updateList);
		}
	}

	function updateBTList(
		week: number,
		day: number,
		grade: String,
		value: String
	) {
		if (week == 1) {
			let updateList = blueTime1;
			updateList[day][grade] = value;
			setBlueTime1(updateList);
		} else {
			let updateList = blueTime2;
			updateList[day][grade] = value;
			setBlueTime2(updateList);
		}
	}
	return (
		<div>
			<h2>Schedules</h2>
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

			<div className="assign-display">
				<h2>Assign Pattern</h2>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Monday</th>
							<th>Tuesday</th>
							<th>Wednesday</th>
							<th>Thursday</th>
							<th>Friday</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>Week 1</th>
							{week1.map((choice, choiceIndex) => (
								<td key={choiceIndex}>
									<select
										value={choice}
										onChange={(e) =>
											updateList(
												1,
												choiceIndex,
												parseInt(e.target.value)
											)
										}
									>
										<option>0</option>
										{optionMap()}
									</select>
									<div className="blue-time-selection">
										<b>Grade 9 BT</b>
										<select
											value={blueTime1[choiceIndex]["G9"]}
											onChange={(e) =>
												updateBTList(
													1,
													choiceIndex,
													"G9",
													e.target.value
												)
											}
										>
											<option>Assembly</option>
											<option>Advisory</option>
											<option>Chapel</option>
											<option>Guidance</option>
											<option>Extra Help</option>
											<option>Grade Band</option>
											<option>CYOA</option>
											<option>Free Time</option>
											<option>Other</option>
										</select>
										<b>Grade 10 BT</b>
										<select
											value={
												blueTime1[choiceIndex]["G10"]
											}
											onChange={(e) =>
												updateBTList(
													1,
													choiceIndex,
													"G10",
													e.target.value
												)
											}
										>
											<option>Assembly</option>
											<option>Advisory</option>
											<option>Chapel</option>
											<option>Guidance</option>
											<option>Extra Help</option>
											<option>Grade Band</option>
											<option>CYOA</option>
											<option>Free Time</option>
											<option>Other</option>
										</select>
										<b>Grade 11 BT</b>
										<select
											value={
												blueTime1[choiceIndex]["G11"]
											}
											onChange={(e) =>
												updateBTList(
													1,
													choiceIndex,
													"G11",
													e.target.value
												)
											}
										>
											<option>Assembly</option>
											<option>Advisory</option>
											<option>Chapel</option>
											<option>Guidance</option>
											<option>Extra Help</option>
											<option>Grade Band</option>
											<option>CYOA</option>
											<option>Free Time</option>
											<option>Other</option>
										</select>
										<b>Grade 12 BT</b>
										<select
											value={
												blueTime1[choiceIndex]["G12"]
											}
											onChange={(e) =>
												updateBTList(
													1,
													choiceIndex,
													"G12",
													e.target.value
												)
											}
										>
											<option>Assembly</option>
											<option>Advisory</option>
											<option>Chapel</option>
											<option>Guidance</option>
											<option>Extra Help</option>
											<option>Grade Band</option>
											<option>CYOA</option>
											<option>Free Time</option>
											<option>Other</option>
										</select>
									</div>
								</td>
							))}
						</tr>
						<tr>
							<th>Week 2</th>
							{week2.map((choice, choiceIndex) => (
								<td key={choiceIndex}>
									<select
										value={choice}
										onChange={(e) =>
											updateList(
												2,
												choiceIndex,
												parseInt(e.target.value)
											)
										}
									>
										<option>0</option>
										{optionMap()}
									</select>
									<div className="blue-time-selection">
										<b>Grade 9 BT</b>
										<select
											value={blueTime2[choiceIndex]["G9"]}
											onChange={(e) =>
												updateBTList(
													2,
													choiceIndex,
													"G9",
													e.target.value
												)
											}
										>
											<option>Assembly</option>
											<option>Advisory</option>
											<option>Chapel</option>
											<option>Guidance</option>
											<option>Extra Help</option>
											<option>Grade Band</option>
											<option>CYOA</option>
											<option>Free Time</option>
											<option>Other</option>
										</select>
										<b>Grade 10 BT</b>
										<select
											value={
												blueTime2[choiceIndex]["G10"]
											}
											onChange={(e) =>
												updateBTList(
													2,
													choiceIndex,
													"G10",
													e.target.value
												)
											}
										>
											<option>Assembly</option>
											<option>Advisory</option>
											<option>Chapel</option>
											<option>Guidance</option>
											<option>Extra Help</option>
											<option>Grade Band</option>
											<option>CYOA</option>
											<option>Free Time</option>
											<option>Other</option>
										</select>
										<b>Grade 11 BT</b>
										<select
											value={
												blueTime2[choiceIndex]["G11"]
											}
											onChange={(e) =>
												updateBTList(
													2,
													choiceIndex,
													"G11",
													e.target.value
												)
											}
										>
											<option>Assembly</option>
											<option>Advisory</option>
											<option>Chapel</option>
											<option>Guidance</option>
											<option>Extra Help</option>
											<option>Grade Band</option>
											<option>CYOA</option>
											<option>Free Time</option>
											<option>Other</option>
										</select>
										<b>Grade 12 BT</b>
										<select
											value={
												blueTime2[choiceIndex]["G12"]
											}
											onChange={(e) =>
												updateBTList(
													2,
													choiceIndex,
													"G12",
													e.target.value
												)
											}
										>
											<option>Assembly</option>
											<option>Advisory</option>
											<option>Chapel</option>
											<option>Guidance</option>
											<option>Extra Help</option>
											<option>Grade Band</option>
											<option>CYOA</option>
											<option>Free Time</option>
											<option>Other</option>
										</select>
									</div>
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
			<div className="date-assignment">
				<h3>Start Date</h3>
				<input
					type="date"
					value={startDate}
					onChange={(e) => {
						setStart(e.target.value);
					}}
				></input>
				<h3>End Date</h3>
				<input
					type="date"
					value={endDate}
					onChange={(e) => {
						setEnd(e.target.value);
					}}
				></input>
				<button
					onClick={() => {
						const result = assignSchedules(
							startDate,
							endDate,
							week1,
							week2,
							blueTime1,
							blueTime2
						);
						alert(result);
					}}
				>
					Submit Pattern
				</button>
			</div>
		</div>
	);
}
