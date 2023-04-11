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
            break;
        case 'addDepartment':
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

menu();