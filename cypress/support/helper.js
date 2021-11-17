/// <reference types="cypress" />
switch (Cypress.env('environment')) {
    case 'local':
        var email = Cypress.env('local_server_login_details').user_name;
        var password = Cypress.env('local_server_login_details').password;
        break;
    case 'test':
        var email = Cypress.env('test_server_login_details').user_name;
        var password = Cypress.env('test_server_login_details').password;
        break;
    case 'stagging':
        var email = Cypress.env('stagging_server_login_details').user_name;
        var password = Cypress.env('stagging_server_login_details').password;
        break;
    default:
        var email = Cypress.env('production_server_login_details').user_name;
        var password = Cypress.env('production_server_login_details').password;
}
module.exports = {
    email: email,
    password: password
};