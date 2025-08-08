describe('SauceDemo E2E Workflow', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
        cy.contains('Products').should('be.visible');
    });

    afterEach(() => {
        // Optional: Add any cleanup or teardown logic here
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link')
            .should('be.visible')
            .click();
        cy.url().should('include', '/');
    });

    it('Step 1: Verify Sorting Order Z-A', () => {
        cy.get('.product_sort_container').select('za');
        cy.get('.inventory_item_name')
        .then($items => {
            const names = [...$items].map(el => el.innerText);
            const sorted = [...names].sort().reverse();
            // Assertion
            expect(names).to.deep.equal(sorted);
        });
    });

    it('Step 2: Verify Price Sorting High-Low', () => {
        cy.get('.product_sort_container').select('hilo');
        cy.get('.inventory_item_price')
        .then($prices => {
            const values = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
            const sorted = [...values].sort((a, b) => b - a);
            // Assertion
            expect(values).to.deep.equal(sorted);
        });
    });

    it('Step 3: Add Multiple Items to Cart', () => {
        
        // Add two items to the cart
        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();

        // Assert cart badge count
        cy.get('.shopping_cart_badge')
            .should('be.visible')
            .and('have.text', '2');

        // Navigate to cart page
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        // Assert total number of items in the cart
        cy.get('.cart_item').should('have.length', 2);

        // Assert specific product names in the cart
        cy.get('.inventory_item_name').then($items => {
            const itemNames = [...$items].map(el => el.innerText);
            expect(itemNames).to.include.members([
                'Sauce Labs Fleece Jacket',
                'Test.allTheThings() T-Shirt (Red)'
                ]);
            });
    });

    it('Step 4: Validate Checkout Journey', () => {
        // Navigate to cart page
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        // cy.get('.cart_item').then($items => {
        //     if ($items.length === 0) {
        //         cy.log('Cart is empty, redirecting to shopping page');
        //         cy.get('[data-test="continue-shopping"]').click();
        //         cy.url().should('include', '/inventory.html');
        //     } else {
        //         cy.log('Cart has products');
        //     }
        // });

        // // Ensure there are items in the cart or add them if not
        // cy.get('.cart_item').then($items => {
        //     if ($items.length === 0) {
        //         cy.get('[data-test="continue-shopping"]').click();
        //         cy.url().should('include', '/inventory.html');

        //         // Add 2 specific items
        //         cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        //         cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();

        //         // Go back to cart
        //         cy.get('.shopping_cart_link').click();
        //     }
        // });
        // Add 2 specific items
        cy.get('[data-test="continue-shopping"]').click();
        cy.url().should('include', '/inventory.html');
        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
        cy.get('.shopping_cart_link').click();
        // Proceed to checkout
        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', 'checkout-step-one');
        cy.get('.title').should('have.text', 'Checkout: Your Information');
        // Fill in checkout information
        cy.get('[data-test="firstName"]').type('Tanvir');
        cy.get('[data-test="lastName"]').type('Sharif');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();

        // Step two of checkout
        cy.url().should('include', 'checkout-step-two');
        cy.get('.title').should('have.text', 'Checkout: Overview');
        cy.get('.summary_total_label').should('contain.text', '$');

        // Finish checkout
        cy.get('[data-test="finish"]').click();

        // Assert successful order completion
        cy.url().should('include', 'checkout-complete');
        cy.get('.complete-header')
            .should('be.visible')
            .and('have.text', 'Thank you for your order!');
        cy.get('.complete-text')
            .should('contain.text', 'Your order has been dispatched');

        // Return to products and logout
        // cy.get('[data-test="back-to-products"]').click();
        // cy.url().should('include', '/inventory.html');

        // cy.get('#react-burger-menu-btn').click();
        // cy.get('#logout_sidebar_link').should('be.visible').click();
        // cy.url().should('include', '/');

    });

});