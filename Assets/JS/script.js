const inquirer = require('inquirer');
const sequelize = require('../config/connection');

const menu = async () => {
    const choices = [
        { name: 'View all departments', value: 'viewDepartments' },
        { name: 'View all roles', value: 'viewRoles' },
        { name: 'View all employees', value: 'viewEmployees' },
        { name: 'Add a department', value: 'addDepartment' },
        { name: 'Add a role', value: 'addRole' },
        { name: 'Add an employee', value: 'addEmployee' },
        { name: 'Update an employee role', value: 'updateEmployeeRole' },
        { name: 'Exit', value: 'exit' },
    ];

    const { choice } = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'Please select an option:',
        choices,
    });
    
    switch (choice) {
        case 'viewDepartments':
            viewDepartments();
            break;
        case 'viewRoles':
            viewRoles();
            break;
        case 'viewEmployees':
            viewEmployees();
            break;
        case 'addDepartment':
            addDepartment();
            break;
        case 'addRole':
            addRole();
            break;
        case 'addEmployee':
            addEmployee();
            break;
        case 'updateEmployeeRole':
            break;
        case 'exit':
            console.log('Goodbye!');
            break;
        default:
            console.log('Invalid choice!');
            menu();
            break;
      }
};

// View departments
const viewDepartments = async () => {
    const [rows] = await sequelize.query('SELECT * FROM departments');
    console.table(rows);
    menu();
}

// View all roles
const viewRoles = async () => {
    const [rows] = await sequelize.query(`
        SELECT roles.id, roles.title, roles.salary, departments.name AS department
        FROM roles
        JOIN departments ON roles.department_id = departments.id
    `);
    console.table(rows);
    menu();
}

// View all employees
const viewEmployees = async () => {
    const [rows] = await sequelize.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name,' ', managers.last_name) AS manager
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees managers ON employees.manager_id = managers.id
    `)
    console.table(rows);
    menu();
}

// Add a department
const addDepartment = async () => {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter a name for the Department'
    });
    await sequelize.query('INSERT INTO departments (name) VALUES (?)', {replacements: [name]});
    console.log('Department has been added!');
    menu();
}

// Add a role
const addRole = async () => {
    const departments = await sequelize.query('SELECT * FROM departments');
    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department for the role:',
            choices: departments[0].map((department) => ({
                name: department.name,
                value: department.id
            }))
        }
    ]);
    await sequelize.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
    { replacements: [title, salary, department_id] });
    console.log('Role added successfully.');
    menu();
}

// Add an employee
const addEmployee = async () => {
    const roles = await sequelize.query(`
    SELECT roles.id, roles.title
    FROM roles
    JOIN departments ON roles.department_id = departments.id
    `);

    const employees = await sequelize.query(`
    SELECT id, CONCAT(first_name,' ', last_name) AS name
    FROM employees
    `);

    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the employee\'s first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the employee\'s last name:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the employee\'s role:',
            choices: roles[0].map((role) => ({
                name: role.title,
                value: role.id
            }))
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the employee\'s manager:',
            choices: [
                { name: 'None', value: null },
                ...employees[0].map((employee) => ({
                    name: employee.name,
                    value: employee.id
                }))
            ]
        }
    ]);
    await sequelize.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    { replacements: [first_name, last_name, role_id, manager_id] });
    console.log('Employee added successfully!');
    menu();
}

menu();