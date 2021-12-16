// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

beforeEach(() => {

  // setup request intercepts

  cy.intercept("GET", "http://localhost:3000/api/startups", (req) => {
    req.reply({
      statusCode: 200, // default
      fixture: "startups.json",
    });
  }).as("getStartups");

  cy.intercept("GET", "http://localhost:3000/api/startups/1", (req) => {
    req.reply({
      statusCode: 200, // default
      fixture: "Startups/startup-dto.json",
    });
  }).as("getStartupById");

  cy.intercept("PUT", `http://localhost:3000/api/startups/1`, (req) => {
    req.reply({
      statusCode: 200, // default
      body: {},
    });
  }).as("updateStartup");

  cy.intercept(
    "PUT",
    `http://localhost:3000/api/objectives?projectId=1`,
    (req) => {
      req.reply({
        statusCode: 200, // default
      });
    }
  ).as("updateObjectives");
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
