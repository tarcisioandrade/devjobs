import home_PO from "../support/pageObject/home_PO";

describe("Homepage", () => {
  beforeEach(() => cy.visit("/"));

  it("Alert Modal has showing", () => {
    cy.get('[data-testid="modal"]').should("be.visible");
  });

  it("Renders all jobs disponible", () => {
    home_PO.clickToAcceptModal();
    cy.get("[data-testid='job-card']").should("have.length", 5);
  });

  it("Testing filters", () => {
    home_PO.clickToAcceptModal();
    cy.get("#search").type("desenvolv");
    cy.get("button[type='submit']").click();
    cy.get("[data-testid='job-card']").should("have.length", 4);
    cy.get("#inputSearchFilter").click();
    cy.get("#inputSearchFilter").type("Typescript");
    cy.get("div[title='typescript']").click();
    cy.get("[data-testid='job-card']").should("have.length", 2);
    cy.get("#tipo").select("Junior");
    cy.get("[data-testid='job-card']").should("have.length", 1);
    cy.get("#clear-filters").click();
    cy.get("#local").select("SP");
    cy.get("[data-testid='job-card']").should("have.length", 3);
    cy.get("#contract").select("PJ");
    cy.get("[data-testid='job-card']").should("have.length", 1);
    cy.get("#clear-filters").click();
    cy.get("#model").select("hibrido");
    cy.get("[data-testid='job-card']").should("have.length", 1);
  });

  it("Should no length message if dont have data with filters value", () => {
    home_PO.clickToAcceptModal();

    cy.get("#contract").select("Temporário");

    cy.get("[data-testid='no-results-message']").should("be.visible");
  });

  it("Should error message in status 500 api response", async () => {
    cy.intercept("GET", "**/api/job?offset=6", {
      statusCode: 500,
    });

    home_PO.clickToAcceptModal();

    cy.get("[data-testid='error-request-message']").should("be.visible");
  });
});
