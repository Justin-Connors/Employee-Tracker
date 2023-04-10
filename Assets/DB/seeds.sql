INSERT INTO departments (name) VALUES
('Sales'),
('Marketing'),
('Engineering'),
('Human Resources'),
('Finance');

INSERT INTO roles (title, salary, department_id) VALUES
('Sales Manager', 75000.00, 1),
('Sales Representative', 50000.00, 1),
('Marketing Manager', 80000.00, 2),
('Marketing Coordinator', 45000.00, 2),
('Software Engineer', 90000.00, 3),
('QA Engineer', 70000.00, 3),
('HR Manager', 85000.00, 4),
('HR Coordinator', 50000.00, 4),
('Financial Analyst', 75000.00, 5),
('Accountant', 60000.00, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Mark', 'Johnson', 3, NULL),
('Michael', 'Brown', 4, 3),
('Sarah', 'Williams', 5, NULL),
('David', 'Lee', 6, 5),
('Emily', 'Taylor', 7, 3),
('Robert', 'Wilson', 8, 4),
('Jessica', 'Davis', 9, NULL),
('William', 'Anderson', 10, 9);