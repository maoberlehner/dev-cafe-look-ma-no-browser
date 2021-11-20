# Look ma, no browser!

> Run the Same Test in Cypress and Jest.

Using this setup makes it possible to run the same test code in Cypress and Jest.

## Getting Started

- Run `npm install` to install all dependencies.
- Run `npm run dev` to start the Vite dev server. Make sure you can navigate to `http://localhost:3000`.
- Run `npx cypress run` to run all (currently only one) tests with Cypress in headless mode.
- Run `npx cypress open` to open the Cypress UI.
- Run `npx jest` to run all tests with Jest.

During development, you can use the mocking system based on Mock Service Worker. In `src/main.ts` you can activate the following code to use mocks for development.

```diff
   mocks.forEach(mock => queueMock(mock));

   // During development, load preconditions for the use case you are working on.
-  // await Promise.all([
-  //   (await import(`./modules/products/__specs__/preconditions`))
-  //     .productListExists({ queueMock }),
-  // ]);
+  await Promise.all([
+    (await import(`./modules/products/__specs__/preconditions`))
+      .productListExists({ queueMock }),
+  ]);

   window.appReady = true;
}
```

## The Basic Concept

Test code is decoupled from the test framework via a DSL (Domain Specific Language) and *drivers*. Currently there is a driver for Jest and als one for Cypress. But more drivers could be added or existing ones replaced. As long as the new driver implements the same methods as the existing ones, all the tests will run without any modifications.

*Preconditions* are used as an abstraction layer for API mocking. The idea is that you have specific *preconditions* for certain scenarios and you can also use them during development.

## Technologies

- [Cypress](https://www.cypress.io/)
- [Jest](https://jestjs.io/)
- [Mock Service Worker](https://mswjs.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vue.js](https://vuejs.org/)
