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
    cy.wait(1000);
    cy.exec('php artisan manage:user ' + email + ' ' + password + ' ' + 1);
    cy.visit({
        route: 'labs-login'
    });
});
it('Welcome at Global Cactus Landing Page', () => {
    cy.wait(200);
});
it('Select tool of PDF Extraction', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(9) > .h-full > .relative > .absolute > div > .flex > span').click().should('have.length', 1);
    cy.wait(500);
});
it('Run PDF Extraction and download result file with JSON', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(9) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type="file"]')
        .attachFile({ filePath: 'test.pdf', encoding: 'base64', mimeType: 'application/pdf' }).click({ force: true });
    cy.contains("JSON").first().click({ force: true });
});