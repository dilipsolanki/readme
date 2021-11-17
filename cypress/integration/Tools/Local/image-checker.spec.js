/// <reference types="cypress" />
import {
    email,
    password
} from '../../../support/helper'

beforeEach(() => {
    Cypress.env()
    cy.visit({
        route: 'labs-login'
    });
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#email').invoke('val').should('not.be.empty');
    cy.get('#password').invoke('val').should('not.be.empty');
    cy.get('form').submit().should('be.visible');
    cy.wait(1000);
});
afterEach(() => {
    //Log off user
    cy.exec('php artisan manage:user ' + email + ' ' + password + ' ' + 1);
});
after(() => {
    //Log off user
    cy.exec('php artisan manage:user ' + email + ' ' + password + ' ' + 1);
    cy.visit({
        route: 'labs-login'
    });
});
it('Welcome at Global Cactus Landing Page', () => {
    cy.wait(200);
});
it('Select tool of image checker', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(5) > .h-full > .relative > .absolute > div > .flex > span').click().should('have.length', 1);
    cy.wait(500);
});
it('Run image checker with png image', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(5) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type=file]').attachFile('test.png', 'image/png').click({ force: true });

});
it('Run image checker with jpg image', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(5) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type=file]').attachFile('test.jpg', 'image/jpeg').click({ force: true });
});
it('Run image checker with jpg image', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(5) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type=file]').attachFile('test.jpeg', 'image/jpeg').click({ force: true });
});