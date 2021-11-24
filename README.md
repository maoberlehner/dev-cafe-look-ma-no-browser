# Look ma, no browser!

# What?

- Very, very simple e commerce app.
- Built on top of Vue 3 and TypeScript.
- Built without looking at the browser!

## Why?

1. It's a challenge!
2. It's a demonstration of TDD.

## TDD

🔴 Red
🟢 Green
🔄 Refactor

## Disclaimer

Live Is Life! This talk unfortunately not :(

We'll do this fast!

1. It's kinda the point.
2. Keep it short(ish).

## What have we learned?

- TDD is fast!
- TDD allows us to refactor our code with confidence.

> Let's uninstall our browsers and **practice TDD!**

## README

> Run the Same Test in Cypress and Jest.

Using this setup makes it possible to run the same test code in Cypress and Jest.

### Getting Started

- Run `npm install` to install all dependencies.
- Run `npm run dev` to start the Vite dev server. Make sure you can navigate to `http://localhost:3000`.
- Run `npx cypress run` to run all (currently only one) tests with Cypress in headless mode.
- Run `npx cypress open` to open the Cypress UI.
- Run `npx jest` to run all tests with Jest.

During development, you can use the mocking system based on Mock Service Worker. In `src/main.ts` you can activate the following code to use mocks for development.

```diff
   mocks.forEach(mock => queueApiMock(mock));

   // During development, load preconditions for the use case you are working on.
-  // await Promise.all([
-  //   (await import(`./modules/product/__test__/product-preconditions`))
-  //     .listExists(makeStrategy({ queueApiMock })),
-  // ]);
+  await Promise.all([
+    (await import(`./modules/product/__test__/product-preconditions`))
+      .listExists(makeStrategy({ queueApiMock })),
+  ]);

   window.appReady = true;
}
```

### The Basic Concept

Test code is decoupled from the test framework via a DSL (Domain Specific Language) and *drivers*. Currently there is a driver for Jest and als one for Cypress. But more drivers could be added or existing ones replaced. As long as the new driver implements the same methods as the existing ones, all the tests will run without any modifications.

*Preconditions* are used as an abstraction layer for API mocking. The idea is that you have specific *preconditions* for certain scenarios and you can also use them during development.

### Technologies

- [Cypress](https://www.cypress.io/)
- [Jest](https://jestjs.io/)
- [Mock Service Worker](https://mswjs.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vue.js](https://vuejs.org/)
