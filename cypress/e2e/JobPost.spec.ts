describe("JobPost Page", () => {
  beforeEach(() => {
    cy.setCookie("token", Cypress.env("token"));
    cy.visit("/user/jobpost");
  });

  it("Job Postage", () => {
    Cypress.config({ defaultCommandTimeout: 10000 });
    
    cy.get("#company_name").type("Company Name Example");
    cy.get("#title_job").type("Title Job Example");
    cy.get("#company_email").type("email@example.com");
    cy.get("#model").select("remoto");
    cy.get("#location").select("BA");
    cy.get("#contract").select("clt");
    cy.get("#type").select("pleno");
    cy.get("#inputSearchFilter").click();
    cy.get("#inputSearchFilter").type("Typescript");
    cy.get("div[title='typescript']").click();
    cy.get("button[type='submit']").click();

    cy.url().should("contain", "/jobsposted");
  });
});
