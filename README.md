<!-- Command Execution from the start with explanations -->
npm init -y
npm install cypress --save-dev
npx cypress open

<!-- Command Prompts for checking the version of Cypress -->
npx cypress -v
npx cypress version

<!-- Command Execution from the start without explanations -->
npx cypress open > E2E Testing > Select a browser > Start E2E Testing > From the E2E Specs select the test case

<!-- Run the test cases with headless mode and view the spec results -->
.\node_modules\.bin\cypress.cmd run

<!-- Run the specific test cases with headless mode and view the spec results -->
.\node_modules\.bin\cypress.cmd run --spec 'cypress/e2e/firsttest.cy.js'

<!-- Run the specific test cases with headed mode -->
.\node_modules\.bin\cypress.cmd run --spec 'cypress/e2e/firsttest.cy.js' --headed

<!-- Run the specific test cases with headed mode and specific browser -->
.\node_modules\.bin\cypress.cmd run --spec 'cypress/e2e/firsttest.cy.js' --headed -b chrome


<!-- Git Repository -->
1. git init
2. git add .
3. git status
4. git commit -m "Your Custom Message"
<!-- Execute the number 3 for the first time only -->
5. git branch -M master
<!-- Execute the number 4 for the first time only -->
6. git remote add origin https://github.com/TanvirHossain-eco/Saucedemo-cypress.git
7. git push -u origin master
