INSERT INTO users (username, password, first_name, last_name, weight, height_ft, height_in, age, phone_num, picture)
VALUES ('test', 'a', 'Git', 'Ript', 350, 6, 7, 30, '7707774444', 'https://www.t-nation.com/system/publishing/articles/10003581/original/How-Bodybuilders-REALLY-Get-Ripped.jpg?1462825320');

INSERT INTO types (name) 
VALUES ('Weightlifting'),
('Cardio'),
('Yoga'),
('Calisthenics');

INSERT INTO parts_of_body (name)
VALUES ('shoulders'),
('arms'),
('back'),
('chest'),
('abs'),
('legs');

INSERT INTO workouts (name, picture, link, type_id) 
VALUES ('Dumbbell Row', 'picture', 'https://www.youtube.com/watch?v=-koP10y1qZI', 1),
('Farmer''s Carry', 'picture', 'https://www.youtube.com/watch?v=p5MNNosenJc', 1),
('Bench Press', 'picture', 'https://www.youtube.com/watch?v=SCVCLChPQFY', 1),
('Hammer Curls', 'picture', 'https://www.youtube.com/watch?v=CFBZ4jN1CMI', 1),
('Triceps Kickback', 'picture', 'https://www.youtube.com/watch?v=6SS6K3lAwZ8', 1),
('Squats', 'picture', 'https://www.youtube.com/watch?v=1oed-UmAxFs', 1), 
('Lunges', 'picture', 'https://www.youtube.com/watch?v=ZkISva8aWDI', 1), 
('Swing', 'picture', 'https://www.youtube.com/watch?v=cfYt7Q21w_0', 1), 
('Crunch', 'picture', 'https://www.youtube.com/watch?v=Xyd_fa5zoEU&ab_channel=LIVESTRONG.COM', 1), 
('Shrugs', 'picture', 'https://www.youtube.com/watch?v=g6qbq4Lf1FI', 1), 
('Overhead Press', 'picture', 'https://www.youtube.com/watch?v=_RlRDWO2jfg&t=316s&ab_channel=JeffNippard', 1), 
('Inclined Bench Press', 'picture', 'https://www.youtube.com/watch?v=SrqOu55lrYU&ab_channel=ScottHermanFitness', 1);

INSERT INTO parts_workouts (part_id, workout_id)
VALUES (3, 1),
(1, 1),
(3, 2),
(1, 2),
(1, 3),
(4, 3),
(2, 4),
(2, 5),
(6, 6),
(6, 7),
(1, 8),
(2, 8),
(5, 8),
(5, 9),
(1, 10),
(2, 10),
(1, 11),
(2, 11),
(4, 11),
(1, 12),
(2, 12),
(4, 12);