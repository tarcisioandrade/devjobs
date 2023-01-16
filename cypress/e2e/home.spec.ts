describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Alert Modal has showing", () => {
    cy.get('[data-testid="modal"]').should("be.visible");
  });

  it("Renders all jobs disponible", () => {
    cy.get('[data-testid="modal"]').should("be.visible");
    cy.get('[data-testid="modal"]').find("button > span").click();
    cy.get("[data-testid='job-card']").should("have.length", 5);
  });

  it("Testing filters", () => {
    cy.get('[data-testid="modal"]').should("be.visible");
    cy.get('[data-testid="modal"]').find("button > span").click();
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
});
