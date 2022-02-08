/// <reference types="cypress" />
import {
    email,
    password
} from '../../../support/helper'

beforeEach(() => {
    Cypress.env()
    cy.visit('labs-login');
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
    cy.visit('labs-login');
});
it('Welcome at Global Cactus Landing Page', () => {
    cy.wait(200);
});
it('Select tool of PDF Extraction', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(9) > .h-full > .relative > .absolute > div > .flex > span').click().should('have.length', 1);
    cy.wait(500);
});

it('Run PDF Extraction and download result file with XML', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(9) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type="file"]')
        .attachFile({ filePath: 'test.pdf', encoding: 'base64', mimeType: 'application/pdf' }).click({ force: true });
    cy.contains('XML').then(function($input) {
            $input[0].setAttribute('target', '_blank')
        })
        .should('have.attr', 'target', '_blank');
    cy.contains('XML').click();
    cy.wait(10000);
});
it('Run PDF Extraction and download result file with JSON', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(9) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type="file"]')
        .attachFile({ filePath: 'test.pdf', encoding: 'base64', mimeType: 'application/pdf' }).click({ force: true });
    cy.contains('JSON').then(function($input) {
            $input[0].setAttribute('target', '_blank')
        })
        .should('have.attr', 'target', '_blank');
    cy.contains('JSON').click();
    cy.wait(10000);
});
it('Run PDF Extraction and download result file with TEXT', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(9) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('input[type="file"]')
        .attachFile({ filePath: 'test.pdf', encoding: 'base64', mimeType: 'application/pdf' }).click({ force: true });
    cy.contains('TEXT').then(function($input) {
            $input[0].setAttribute('target', '_blank')
        })
        .should('have.attr', 'target', '_blank');
    cy.contains('TEXT').click();
    cy.wait(10000);
});