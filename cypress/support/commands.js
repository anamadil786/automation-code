// cypress/support/e2e.ts
/* eslint-disable no-undef */
function loginViaAAD(username, password) {

  // Check if already logged in
  cy.visit(Cypress.env('BASE_URL'));
  cy.get('.btn-google').click();

  cy.origin('login.microsoftonline.com', { args: { username } }, ({ username }) => {
    cy.get('input[type="email"]').type(username, { log: false });
    cy.get('input[type="submit"]').click();
  });

  cy.origin('login.microsoftonline.com', { args: { password } }, ({ password }) => {
    cy.get('input[type="password"]').type(password, { log: false });
    cy.get('input[type="submit"]').click();
    cy.wait(30000); // Adjust the wait time as needed
    cy.get('input[value="Yes"]').click();
  });
}


Cypress.Commands.add('loginWithSSO', (username =Cypress.env('username'), password=Cypress.env('password')) => {
  cy.session(
    `aad-${username}`,
    () => {
      const log = Cypress.log({
        displayName: 'Azure Active Directory Login',
        message: [`🔐 Authenticating | ${username}`],
        // @ts-ignore
        autoEnd: false,
      })

      log.snapshot('before')
      // here you need to write logic for the login 
      loginViaAAD(username, password)

      log.snapshot('after')
      log.end()
    },
    {
      validate: () => {
        // this is a very basic form of session validation for this demo.
        // depending on your needs, something more verbose might be needed
        cy.visit(Cypress.env('BASE_URL'));
        cy.get('.btn-google').click();
      },
    }
  )
})