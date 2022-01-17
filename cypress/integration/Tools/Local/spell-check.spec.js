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
    console.log('php artisan manage:user ' + email + ' ' + password + ' ' + 1);
    cy.exec('php artisan manage:user ' + email + ' ' + password + ' ' + 1);
    cy.visit({
        route: 'labs-login'
    });
});
it('Welcome at Global Cactus Landing Page', () => {
    cy.wait(200);
});
it('Select tool of spell check and enter text', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(1) > .h-full > .relative > .absolute > div > .flex > span').click().should('have.length', 1);
    cy.wait(500);
});
it('Enter correct text and apply for spell check', () => {
    cy.get(':nth-child(1) > .h-full > .relative > .absolute > div > .flex > span').click().should('have.length', 1);
    cy.get('#enteredText').type('In searching for life in extraterrestrial space, it is essential to act based on an unequivocal definition of life. In the twentieth century, life was defined as cells that self-replicate, metabolize, and are open for mutations, without which genetic information would remain unchangeable, and evolution would be impossible. Current definitions of life derive from statistical mechanics, physics, and chemistry of the twentieth century in which life is considered to function machine like, ignoring a central role of communication.Evolutionary relevant new nucleotide sequences now appear to have originated from social agents such as viruses, their parasitic relatives, and related RNA networks, not from errors. By applying the known features of natural languages and communication, a new twenty-first century definition of life can be reached in which communicative interactions are central to all processes of life.').should('not.be.empty');
    cy.get('button[id="runSpellCheck"]').click().should('be.visible');
    cy.get('button[id="runSpellCheck"]').click().should('be.visible');
    cy.wait(1000);
});
it('Text copy from textarea', () => {
    cy.get(':nth-child(1) > .h-full > .relative > .absolute > div > .flex > span').click().should('have.length', 1);
    cy.get('#enteredText').type('In searching for life in extraterrestrial space, it is essential to act based on an unequivocal definition of life. In the twentieth century, life was defined as cells that self-replicate, metabolize, and are open for mutations, without which genetic information would remain unchangeable, and evolution would be impossible. Current definitions of life derive from statistical mechanics, physics, and chemistry of the twentieth century in which life is considered to function machine like, ignoring a central role of communication.Evolutionary relevant new nucleotide sequences now appear to have originated from social agents such as viruses, their parasitic relatives, and related RNA networks, not from errors. By applying the known features of natural languages and communication, a new twenty-first century definition of life can be reached in which communicative interactions are central to all processes of life.').should('not.be.empty');
    cy.wait(1200);
    cy.contains('Copy').click().should('be.visible');
});
it('Run spell check with wrong text', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(1) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.get('#enteredText').type('In searching for life in extraterrestrial space, it is essential to act based on an unequivocal definition of life. In the twentieth century, life was defined as cells tsat self-replsicate, metabsolize, and are open for mutations, without which genetic information would remain unchangeable, and evolution would be impossible. Current definitions of life derive from statistical mechanics, physics, and chemistry of the twentieth century in which life is considered to function machine like, ignoring a central role of communication.Evolsudtionary relsevant new nsucleotide sequences now appear to have originated from social agensts such as viruses, their parasitic relatives, and related RNA netwsorks, not from errors. By applying the known features of natural languages and communicsation, a new twenty-first century definition of life can be reached in which communicative interactions are central to all processes of life.').should('not.be.empty');
    cy.get('button[id="runSpellCheck"]').click().should('be.visible');
    cy.get('button[id="runSpellCheck"]').click().should('be.visible');
    cy.wait(4000);
    cy.get("div#enteredText a").should('be.visible');
    cy.get("div#enteredText a").each(($el, index, $list) => {
        console.log($el.text());
        cy.contains($el.text()).click().should('be.visible');
        cy.wait(1000);
        cy.get("#selectedWordSuggestions span").first().click();
        cy.wait(500);
    });
    cy.wait(500);
});
it('Text Clear from textarea', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(1) > .h-full > .relative > .absolute > div > .flex > span').click().should('have.length', 1);
    cy.get('#enteredText').type('In searching for life in extraterrestrial space, it is essential to act based on an unequivocal definition of life. In the twentieth century, life was defined as cells tsat self-replsicate, metabsolize, and are open for mutations, without which genetic information would remain unchangeable, and evolution would be impossible. Current definitions of life derive from statistical mechanics, physics, and chemistry of the twentieth century in which life is considered to function machine like, ignoring a central role of communication.Evolsudtionary relsevant new nsucleotide sequences now appear to have originated from social agensts such as viruses, their parasitic relatives, and related RNA netwsorks, not from errors. By applying the known features of natural languages and communicsation, a new twenty-first century definition of life can be reached in which communicative interactions are central to all processes of life.').should('not.be.empty');
    cy.wait(3000);
    cy.contains('Clear').click().should('be.visible');
    cy.wait(1000);
});
it('Go back on dashboard', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.wait(500);
});

it('Get tool of spell check and enter text', () => {
    cy.wait(2000);
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(1) > .h-full > .relative > .absolute > div > .flex > span').click().should('have.length', 1);
    cy.wait(500);
});
it('Submit feedback of incorrect suggestions', () => {
    cy.visit({
        route: 'dashboard'
    });
    cy.get(':nth-child(1) > .h-full > .relative > .absolute > div > .flex > span').click().should('have.length', 1);
    cy.get('#enteredText').type('In searching for life in extraterrestrial space, it is essential to act based on an unequivocal definition of life. In the twentieth century, life was defined as cells tsat self-replsicate, metabsolize, and are open for mutations, without which genetic information would remain unchangeable, and evolution would be impossible. Current definitions of life derive from statistical mechanics, physics, and chemistry of the twentieth century in which life is considered to function machine like, ignoring a central role of communication.Evolsudtionary relsevant new nsucleotide sequences now appear to have originated from social agensts such as viruses, their parasitic relatives, and related RNA netwsorks, not from errors. By applying the known features of natural languages and communicsation, a new twenty-first century definition of life can be reached in which communicative interactions are central to all processes of life.').should('not.be.empty');
    cy.get('button[id="runSpellCheck"]').click().should('be.visible');
    cy.get('button[id="runSpellCheck"]').click().should('be.visible');
    cy.wait(5000);
    cy.get("div#enteredText a").should('be.visible');
    cy.get("div#enteredText a").each(($el, index, $list) => {
        console.log($el.text());
        cy.contains($el.text()).click().should('be.visible');
        cy.wait(1000);
        cy.get(".text-sm button").first().click().should('be.visible');
        cy.get('input[name="reason"]').type('reason');
        cy.get('input[name="recommendation"]').type('recommendation');
        cy.contains('Submit Feedback').click().should('be.visible');
        cy.wait(1000);
    })
    cy.wait(500);
});