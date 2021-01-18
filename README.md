# playwright-plate

A seed for you to start frontend testing with playwright, jest, testdesk decorators and allure

Special thanks to @mmisty for <https://github.com/mmisty/jest-allure2-adapter>

First of all don't forget to

```
yarn
```

This repo supports test generation based on test/**.template.ts classes.

If you create suite template classes as `export abstract class Example extends Hooks` you can then autogenerate test suites that will extend your `Example` class and contain only one overridden `abstract createContext(): Promise<Playwright.BrowserContext>` method from `Hooks`.

In this method `BrowserContext` is created either for Webkit or Chromium. Code generation is located in `lib/multiBrowserGenerator.ts`.

This is a proof of concept. Generated classes templates with `createContext()` should be moved from multiBrowserGenerator to separate files.

To generate tests classes run (`-w` - for webkit, `-c` - for chrome)

```
yarn test.generate.all
// or
yarn test.generate -wc
```

To run all tests run

```
yarn test
```

To lint code:

```
yarn lint
```

To see full report try out

```
yarn allure
```
