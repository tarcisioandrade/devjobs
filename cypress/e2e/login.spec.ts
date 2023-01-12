describe("Login Page", () => {
  it.skip("Failed auth with incorrect info", () => {
    cy.visit("/user/login");
    cy.get("#email-input").type("example@gmail.com");
    cy.get("#password-input").type("123456456456");
    cy.get("button[type='submit']").click();
    cy.get('[data-testid="flowbite-toast"]')
      .should("be.visible")
      .contains("E-mail ou senha inválido.");
  });

  it("Successfuly auth with correct info", () => {
    cy.visit("/user/login");
    cy.get("#email-input").type("example@gmail.com");
    cy.get("#password-input").type("123456789");
    cy.get("button[type='submit']").click();

    cy.url().should("equal", "http://localhost:3000/");
  });
});
