describe("Signup Page", () => {
  before(() => cy.fixture("user").then((user) => (this.user = user)));

  it("Failed sign with email already cadastred", () => {
    cy.visit("/user/signup");
    cy.get("#name-input").type("Admin");
    cy.get("#surname-input").type("Admin");
    cy.get("#email-input").type("example@gmail.com");
    cy.get("#password-input").type("123456789");
    cy.get("#confirmPassword-input").type("123456789");
    cy.get("#accept").check();
    cy.get("button[type='submit']").click();

    cy.get('[data-testid="flowbite-toast"]')
      .should("be.visible")
      .contains("Este e-mail já foi utilizado.");
  });

  it("Failed signup with differents passwords", () => {
    cy.visit("/user/signup");
    cy.get("#name-input").type("Admin");
    cy.get("#surname-input").type("Admin");
    cy.get("#email-input").type(this.user.signup.email);
    cy.get("#password-input").type(this.user.signup.password);
    cy.get("#confirmPassword-input").type("1234567891011");
    cy.get("#accept").check();
    cy.get("button[type='submit']").click();

    cy.get("#filled_error_help").should("have.text", "As senhas não batem.");
  });

  it("Successfuly signup", () => {
    cy.visit("/user/signup");
    cy.get("#name-input").type("Admin");
    cy.get("#surname-input").type("Admin");
    cy.get("#email-input").type(this.user.signup.email);
    cy.get("#password-input").type(this.user.signup.password);
    cy.get("#confirmPassword-input").type(this.user.signup.password);
    cy.get("#accept").check();
    cy.get("button[type='submit']").click();

    cy.url().should("equal", "http://localhost:3000/user/profile");
  });
});
