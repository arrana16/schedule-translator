"use client";
import { useState } from "react";
import Calendar from "./calendar";
import Link from "next/link";

export default function Home() {
	const [currentMonth, setCurrentMonth] = useState(9); // Default month
	const [currentYear, setCurrentYear] = useState(2023); // Default year

	return (
		<div>
			<h1>Translation Table</h1>
			<div className="btn-group">
				<Link href="/create" className="createButton">
					Create New Schedule
				</Link>
				<Link href="/pattern" className="createButton">
					Set Pattern
				</Link>
				<Link href="/delete" className="createButton">
					Delete Schedules
				</Link>
			</div>
			<h2>Pick a Month</h2>
			<input
				type="month"
				id="start"
				name="start"
				min="2023-09"
				onChange={(e) => {
					setCurrentYear(parseInt(e.target.value.slice(0, 4)));
					setCurrentMonth(parseInt(e.target.value.slice(5, 7)));
				}}
			/>
			<Calendar month={currentMonth} year={currentYear}></Calendar>
		</div>
	);
}
