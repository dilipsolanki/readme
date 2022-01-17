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
    cy.wait(2000);
    cy.exec('php artisan manage:user ' + email + ' ' + password + ' ' + 1);
    cy.visit({
        route: 'labs-login'
    });
});
it('Welcome at Global Cactus Landing Page', () => {
    cy.wait(200);
});
it('Select tool of Scholarcy', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(10) > .h-full > .relative > .absolute > div > .flex > span').click().should('have.length', 1);
    cy.wait(500);
});
it('Run scholarcy and upload pdf file and explore Meta Data and check Author, Abstract', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(10) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type=file]').attachFile('test.pdf', 'application/pdf').click({ force: true });
    cy.wait(20000);
    cy.get("#Meta").first().click({ force: true });
    cy.wait(2000);
    cy.get("#Meta").first().click({ force: true });
    cy.wait(2000);
});
it('Run scholarcy and upload pdf file and explore Summary', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(10) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type=file]').attachFile('test.pdf', 'application/pdf').click({ force: true });
    cy.wait(20000);
    cy.scrollTo(0, 400);
    cy.get("#Summary").first().click({ force: true });
    cy.wait(2000);
    cy.get("#Summary").first().click({ force: true });
    cy.wait(2000);
});
it('Run scholarcy and upload pdf file and explore Highlights', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(10) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type=file]').attachFile('test.pdf', 'application/pdf').click({ force: true });
    cy.wait(20000);
    cy.scrollTo(0, 600);
    cy.get("#Highlights").first().click({ force: true });
    cy.wait(2000);
    cy.get("#Highlights").first().click({ force: true });
    cy.wait(2000);
});
it('Run scholarcy and upload doc file and explore Meta Data and check Author, Abstract', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(10) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type=file]').attachFile('test.doc', 'application/msword').click({ force: true });
    cy.wait(20000);
    cy.get("#Meta").first().click({ force: true });
    cy.wait(2000);
    cy.get("#Meta").first().click({ force: true });
    cy.wait(2000);
});
it('Run scholarcy and upload doc file and explore Summary', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(10) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type=file]').attachFile('test.doc', 'application/msword').click({ force: true });
    cy.wait(20000);
    cy.scrollTo(0, 400);
    cy.get("#Summary").first().click({ force: true });
    cy.wait(2000);
    cy.get("#Summary").first().click({ force: true });
    cy.wait(2000);
});
it('Run scholarcy and upload doc file and explore Highlights', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(10) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type=file]').attachFile('test.doc', 'application/msword').click({ force: true });
    cy.wait(20000);
    cy.scrollTo(0, 600);
    cy.get("#Highlights").first().click({ force: true });
    cy.wait(2000);
    cy.get("#Highlights").first().click({ force: true });
    cy.wait(2000);
});