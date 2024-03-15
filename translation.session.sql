CREATE TABLE Dates(
    id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_date DATE NOT NULL UNIQUE,
    schedule_id INT NOT NULL UNIQUE,
    FOREIGN KEY (schedule_id) REFERENCES Schedules(schedule_id)
)

--@block
CREATE TABLE Schedules(
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_block VARCHAR(255) NOT NULL,
    start_time VARCHAR(255) NOT NULL,
    end_time VARCHAR(255) NOT NULL,
    schedule_id INT NOT NULL
)


--@block
INSERT INTO Schedules(class_block, start_time, end_time, schedule_id)
VALUES("A2", "8:45", "10:00", 2),("B2", "10:45", "12:00", 2),("C2", "1:10", "2:35", 2),("D2", "2:35", "3:50", 2)

-- @block 
INSERT INTO Dates(schedule_date, schedule_id)
VALUES("2023-09-14", 2)


-- @block
SELECT Dates.schedule_date, Dates.schedule_id, Schedules.class_block
FROM Schedules
INNER JOIN Dates ON Schedules.schedule_id = Dates.schedule_id
WHERE Dates.schedule_date = "2023-09-13";