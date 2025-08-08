describe('SauceDemo E2E Test Suite', () => {

  beforeEach(() => {
    // Visit and login once before all tests
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Assertion: Confirm we're on the inventory page
    cy.url().should('include', '/inventory.html');
    cy.contains('Products').should('be.visible');
  });

  it('Verifies sorting order: Z to A', () => {
    cy.get('[data-test="product-sort-container"]').select('za');

    cy.get('.inventory_item_name')
      .then($items => {
        const names = [...$items].map(el => el.innerText);
        const sorted = [...names].sort().reverse();
        expect(names).to.deep.equal(sorted);
      });
  });

  it('Verifies price sorting: High to Low', () => {
    cy.get('[data-test="product-sort-container"]').select('hilo');

    cy.get('.inventory_item_price')
      .then($prices => {
        const values = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
        const sorted = [...values].sort((a, b) => b - a);
        expect(values).to.deep.equal(sorted);
      });
  });

  it('Adds multiple items to the cart with assertion', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('.shopping_cart_badge').should('contain', '2');

    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 2);
  });

  it('Validates checkout journey with assertions', () => {
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();

    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.summary_info').should('be.visible');

    cy.get('[data-test="finish"]').click();
    cy.url().should('include', '/checkout-complete.html');
    cy.contains('Thank you for your order').should('be.visible');
  });

});
