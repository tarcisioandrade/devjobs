const home_PO = {
  clickToAcceptModal() {
    cy.get('[data-testid="modal"]').contains("Entendi").click();
  },
};

export default home_PO;
