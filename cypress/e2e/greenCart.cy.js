/// <reference types="cypress" />
describe("Verify Brocolli Product Search and Checkout Flow ", () => {
  beforeEach(() => {
    cy.visit(" https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.url().should("include", "rahulshettyacademy");
  });
  it("should display the homepage correctly", () => {
    cy.get(".search-keyword").should("be.visible");
    cy.get(".search-keyword").type("Brocolli");
    cy.get(".product:visible").should("have.length", 1);
    cy.get(".increment").click().click();
    cy.get(".product:visible").find("button").click(); // cy.get(".product-action button").click();
    cy.get(".cart-icon").click();
    cy.get(".cart-preview:visible").contains("Brocolli").should("be.visible");
    cy.contains("PROCEED TO CHECKOUT").click(); // cy.contains("PROCEED TO CHECKOUT").should("be.visible").click();
    cy.get("tr td:nth-child(2)").should("contain.text", "Brocolli"); // cy.get("table.cartTable").contains("td", "Brocolli").should("be.visible");
    cy.wrap("FAKEPROMO").as("promoCode");
    cy.get("@promoCode").then((code) => {
      cy.get(".promoCode").type(code);
    });
    cy.get(".promoBtn").click();
    cy.get(".promoInfo", { timeout: 10000 }).should(
      "contain.text",
      "Invalid code ..!"
    );
    cy.contains("Place Order").click();
    cy.get("select").select("Armenia");
    cy.get(".chkAgree").check();
    cy.contains("Proceed").click();
    cy.get(".wrapperTwo").should("contain", "Thank you");
  });
});
