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
    cy.exec('php artisan manage:user ' + email + ' ' + password + ' ' + 1);
    cy.visit('labs-login');
});
it('Welcome at Global Cactus Landing Page', () => {
    cy.wait(200);
});
it('Select tool of hubble and enter text', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(2) > .h-full > .relative > .absolute > div > .flex > span').click().should('have.length', 1);
    cy.wait(500);
});
it('Run hubble with correct text', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(2) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.wait(500);
    cy.get('#enteredText').focus().should('have.class', 'py-4').type('In searching for life in extraterrestrial space, it is essential to act based on an unequivocal definition of life. In the twentieth century, life was defined as cells that self-replicate, metabolize, and are open to mutations.');
    cy.wait(1000);
    cy.get('#letsHubbleIt').trigger("click").should('be.visible');
    cy.wait(500)
    cy.get('button[id="letsHubbleIt"]').click({
        force: true
    }).should('be.visible');
    cy.wait(20000);
});
it('Run hubble with Generate sample and Apply correct suggestions', () => {
    var listingCount;
    var count;
    cy.visit('dashboard');
    cy.get(':nth-child(2) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.wait(500)
    cy.get('#generateSampleText').click();
    cy.wait(500)
    cy.get('#letsHubbleIt').trigger("click").should('be.visible');
    cy.wait(500)
    cy.get('button[id="letsHubbleIt"]').click().should('be.visible');
    cy.wait(20000);
    cy.get("div#enteredText a").first().should('be.visible');
    cy.get("div#enteredText a").each(($el, index, $list) => {
        cy.contains($el.text()).click({ force: true }).should('be.visible');
        cy.wait(1000);
        cy.contains("Apply").first().click({ force: true });
        cy.wait(1000);
        count = index + 1;
    });
    cy.get('div#enteredText')
        .find('a')
        .then(listing => {
            listingCount = Cypress.$(listing).length;
            cy.wrap({ Success: listingCount }).its('Success').should('eq', count);
        });
    cy.wait(1000);
});
it('Run hubble with Generate sample, Accept All and Undo All', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(2) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.wait(500)
    cy.get('#generateSampleText').click();
    cy.wait(500)
    cy.get('#letsHubbleIt').trigger("click").should('be.visible');
    cy.wait(500)
    cy.get('button[id="letsHubbleIt"]').click().should('be.visible');
    cy.wait(20000);
    cy.contains("Accept All").first().click({ force: true });
    cy.wait(1000);
    cy.contains("Undo All").first().click({ force: true });
    cy.wait(1000);
});
it('Run hubble with incorrect text and Decline suggestions', () => {
    var listingCount, count;
    cy.visit('dashboard');
    cy.get(':nth-child(2) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.wait(500);
    cy.get('#enteredText').focus().should('have.class', 'py-4').type('In searching for life in extraterrestrial space, it is essential to act based on an unequivocal definition of life. In the twentieth century, life was defined as cells tsat self-replsicate, metabsolize, and are open for mutations, without which genetic information would remain unchangeable, and evolution would be impossible.');
    cy.wait(1000);
    cy.get('#letsHubbleIt').trigger("click").should('be.visible');
    cy.wait(500)
    cy.get('button[id="letsHubbleIt"]').click().should('be.visible');
    cy.wait(20000);
    cy.get("div#enteredText a").first().should('be.visible');
    cy.get("div#enteredText a").each(($el, index, $list) => {
        cy.contains($el.text()).click({ force: true }).should('be.visible');
        cy.wait(2000);
        cy.contains("Decline").first().click();
        cy.wait(1000);
        count = index + 1;
    });
    cy.get('div#enteredText')
        .find('a')
        .then(listing => {
            listingCount = Cypress.$(listing).length;
            cy.wrap({ Success: listingCount }).its('Success').should('eq', count);
        });
    cy.wait(1000);
});
it('Submit feedback of Report inaccurate', () => {
    var listingCount, count;
    cy.visit('dashboard');
    cy.get(':nth-child(2) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.wait(500);
    cy.get('#enteredText').focus().should('have.class', 'py-4').type('In searching for life in extraterrestrial space, it is essential to act based on an unequivocal definition of life. In the twentieth century, life was defined as cells tsat self-replsicate, metabsolize, and are open for mutations, without which genetic information would remain unchangeable, and evolution would be impossible.');
    cy.wait(1000);
    cy.get('#letsHubbleIt').trigger("click").should('be.visible');
    cy.wait(500)
    cy.get('button[id="letsHubbleIt"]').click().should('be.visible');
    cy.wait(20000);
    cy.get("div#enteredText a").first().should('be.visible');
    cy.get("div#enteredText a").each(($el, index, $list) => {
        cy.contains($el.text()).click({ force: true }).should('be.visible');
        cy.wait(2000);
        cy.contains("Report inaccurate").first().click();
        cy.get('input[name="reason"]').type('reason');
        cy.get('input[name="recommendation"]').type('recommendation');
        cy.contains('Submit Feedback').click().should('be.visible');
        cy.wait(2000);
        count = index + 1
    });
    cy.get('div#enteredText')
        .find('a')
        .then(listing => {
            listingCount = Cypress.$(listing).length;
            cy.wrap({ Success: listingCount }).its('Success').should('eq', count);
        });
    cy.wait(1000);
});
it('Run hubble without Recommended Prefs and with Suppression Type Regular', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(2) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.wait(500);
    cy.contains("Recommended Prefs").first().click();
    cy.wait(200);
    cy.get('#enteredText').focus().should('have.class', 'py-4').type('In searching for life in extraterrestrial space, it is essential to act based on an unequivocal definition of life. In the twentieth century, life was defined as cells tsat self-replsicate, metabsolize, and are open for mutations, without which genetic information would remain unchangeable, and evolution would be impossible.');
    cy.wait(1000);
    cy.get('#letsHubbleIt').trigger("click").should('be.visible');
    cy.wait(500)
    cy.get('button[id="letsHubbleIt"]').click().should('be.visible');
    cy.wait(20000);
});
it('Run hubble without Recommended Prefs and with Suppression Type Lite', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(2) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.wait(500);
    cy.contains("Recommended Prefs").first().click();
    cy.wait(200);
    cy.contains("Lite").first().click();
    cy.wait(200);
    cy.get('#enteredText').focus().should('have.class', 'py-4').type('Abstract: As a key factor to the organizational success, high - performance work systems(HPWS) has significant effects on employees’ attitudes and behaviors.This may be caused by the fact that conifers also had different PM removal ability, PM removal ability of some conifers are also lower than other type of species(Song et al.2015, Sgrigna et al.2020).To the above mixture was added anhydrous toluene(5.0 mL).Food production has been realized to consume 60 % of the global water withdrawal.For example, many countries in Africa still have limited access to electricity, such as Burundi(7.6 % ), Congo Democratic Republic(17.1 % ), Malawi(11 % ) to name a few, according to the World Bank(2020).In the case of the developing countries, on the other hand, the policy aim is increasing household electricity use to improve lighting conditions and facilitating home production activities, consistent with targets of the 7 th Sustainable Development Goal.The remainder of the our paper continues in the following order. I am the best.');
    cy.wait(1000);
    cy.get('#letsHubbleIt').trigger("click").should('be.visible');
    cy.wait(500)
    cy.get('button[id="letsHubbleIt"]').click().should('be.visible');
    cy.wait(25000);
});
it('Run hubble without Recommended Prefs and without Chunk Edits Suppression', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(2) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.wait(500);
    cy.contains("Recommended Prefs").first().click();
    cy.wait(200);
    cy.contains("Chunk Edits Suppression").first().click();
    cy.wait(200);
    cy.get('#enteredText').focus().should('have.class', 'py-4').type('In searching for life in extraterrestrial space, it is essential to act based on an unequivocal definition of life. In the twentieth century, life was defined as cells tsat self-replsicate, metabsolize, and are open for mutations, without which genetic information would remain unchangeable, and evolution would be impossible.');
    cy.wait(1000);
    cy.get('#letsHubbleIt').trigger("click").should('be.visible');
    cy.wait(500)
    cy.get('button[id="letsHubbleIt"]').click().should('be.visible');
    cy.wait(20000);
});
it('Run hubble with Recommended Prefs, Model Gemini, language US, Chunk Edits Suppression and Suppression Type Lite', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(2) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.wait(500);
    cy.contains("Select Language").first().click();
    cy.wait(200);
    cy.contains("Lite").first().click();
    cy.wait(200);
    cy.get('#enteredText').focus().should('have.class', 'py-4').type('For the difference of gender, females showed conservative/safer than males in Q_50 and Q_64.');
    cy.wait(1000);
    cy.get('#letsHubbleIt').trigger("click").should('be.visible');
    cy.wait(500)
    cy.get('button[id="letsHubbleIt"]').click().should('be.visible');
    cy.wait(20000);
});
it('Run hubble without Recommended Prefs, Model Phoenix, language US, Chunk Edits Suppression and Suppression Type Lite', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(2) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.wait(500);
    cy.contains("Phoenix (1st Gen)").first().click();
    cy.wait(200);
    cy.contains("Select Language").first().click();
    cy.wait(200);
    cy.contains("Lite").first().click();
    cy.wait(200);
    cy.get('#enteredText').focus().should('have.class', 'py-4').type('For the difference of gender, females showed conservative/safer than males in Q_50 and Q_64.');
    cy.wait(1000);
    cy.get('#letsHubbleIt').trigger("click").should('be.visible');
    cy.wait(500)
    cy.get('button[id="letsHubbleIt"]').click().should('be.visible');
    cy.wait(20000);
});
it('Run hubble without Recommended Prefs, Model Lynx, language US, Chunk Edits Suppression and Suppression Type Lite', () => {
    cy.visit('dashboard');
    cy.get(':nth-child(2) > .h-full > .relative > .absolute > div > .flex > span').click();
    cy.wait(500);
    cy.contains("Lynx (3rd Gen)").first().click();
    cy.wait(200);
    cy.contains("Select Language").first().click();
    cy.wait(200);
    cy.contains("Lite").first().click();
    cy.wait(200);
    cy.get('#enteredText').focus().should('have.class', 'py-4').type('For the difference of gender, females showed conservative/safer than males in Q_50 and Q_64.');
    cy.wait(1000);
    cy.get('#letsHubbleIt').trigger("click").should('be.visible');
    cy.wait(500)
    cy.get('button[id="letsHubbleIt"]').click().should('be.visible');
    cy.wait(20000);
});