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
            break;
        case 'addEmployee':
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
        message: 'Enter a name for the Department',
    });
    await sequelize.query('INSERT INTO departments (name) VALUES (?)', {replacements: [name]});
    console.log('Department has been added!');
    menu();
}

menu();