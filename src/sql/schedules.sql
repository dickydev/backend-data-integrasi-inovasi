CREATE TABLE schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id INT NOT NULL,
  day VARCHAR(10),
  time_start TIME,
  time_finish TIME,
  quota INT,
  status BOOLEAN,
  schedule_date DATE,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);
