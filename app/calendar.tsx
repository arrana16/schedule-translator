"use state";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

async function getSchedule(date: string) {
	try {
		const response = axios
			.get(`http://localhost:4000/date/${date}`)
			.catch((err) => {
				console.log("Failed to fetch Schedule");
			});
		return response;
	} catch (error) {
		console.log(error);
		return "Bad";
	}
}

async function getblueTime(date: string) {
	try {
		const response = axios
			.get(`http://localhost:4000/btdate/${date}`)
			.catch((err) => {
				console.log("Failed to fetch Schedule");
			});
		return response;
	} catch (error) {
		console.log(error);
		return "Bad";
	}
}

export default function Calendar(props: { month: number; year: number }) {
	const [calendarData, setCalendarData] = useState([]);

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	useEffect(() => {
		async function fetchCalendarData() {
			const month = props.month;
			const year = props.year;

			var dateNums = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

			if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
				dateNums[1] = 29;
			}
			var calendar = [];
			var week = [];

			var date;
			var day;
			var schedule;
			var blueTime;

			for (let i = 0; i < dateNums[month - 1]; i++) {
				date = new Date(`${year}-${month}-${i + 1} 12:00:00`);
				day = date.getDay();

				if (i + 1 == 1) {
					for (let a = 0; a < day; a++) {
						week.push(["", []]);
					}
				}

				try {
					schedule = await getSchedule(`${year}-${month}-${i + 1}`);
					blueTime = await getblueTime(`${year}-${month}-${i + 1}`);
					week.push([
						i + 1,
						schedule.data.message,
						blueTime.data.message[0],
					]);

					if (i + 1 == dateNums[month - 1]) {
						for (let a = 0; a < 7 - day; a++) {
							if (week.length != 7) {
								week.push(["", []]);
							}
						}
					}

					if (week.length == 7) {
						calendar.push(week);
						week = [];
					}
				} catch (err) {}
			}
			setCalendarData(calendar);
		}
		try {
			fetchCalendarData();
		} catch (err) {
			console.log(err);
		}
	}, [props]);

	return (
		<div>
			<h3 className="month-name">{monthNames[props.month - 1]}</h3>
			<table className="Month">
				<thead>
					<tr>
						<th>Sunday</th>
						<th>Monday</th>
						<th>Tuesday</th>
						<th>Wednesday</th>
						<th>Thursday</th>
						<th>Friday</th>
						<th>Saturday</th>
					</tr>
				</thead>

				<tbody>
					{calendarData.map((week, weekIndex) => (
						<tr key={weekIndex} className="Dates">
							{week.map((day, dayIndex) => (
								<td key={dayIndex}>
									{day[0]}
									{day[1].map((block, blockIndex) => (
										<p key={blockIndex}>
											{block.class_block}
											&nbsp;
											{block.start_time}
											&nbsp; - &nbsp;
											{block.end_time}
										</p>
									))}
									{day[2] != null ? (
										<div>
											<p>G9 BT: &nbsp;{day[2].g9_bt}</p>
											<p>G10 BT: &nbsp;{day[2].g10_bt}</p>
											<p>G11 BT: &nbsp;{day[2].g11_bt}</p>
											<p>G12 BT: &nbsp;{day[2].g12_bt}</p>
										</div>
									) : (
										<p></p>
									)}
									{typeof day[0] == "number" ? (
										<Link
											href={`${props.year}-${props.month}-${day[0]}`}
										>
											Edit
										</Link>
									) : (
										<p></p>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
