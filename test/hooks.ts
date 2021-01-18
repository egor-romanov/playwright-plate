import Playwright, { Page, selectors }  from 'playwright';
import { attach, attachment, JasmineAllureReporter, step, log } from '../jest-custom-reporter';
import { ContentType } from 'allure-js-commons';

export abstract class Hooks extends JasmineAllureReporter {
  context: Playwright.BrowserContext;
  static browserSafari: Playwright.WebKitBrowser;
  static browserChrome: Playwright.ChromiumBrowser;

  static async before(): Promise<void> {
    await selectors.register('name', this.createNameEngine);
    this.browserChrome = await Playwright.chromium.launch({ headless: true, });
    this.browserSafari = await Playwright.webkit.launch({ headless: true, });

    console.log('Before all');
  }

  static async after(): Promise<void> {
    await this.browserChrome.close();
    await this.browserSafari.close();

    console.log('After all');
  }

  // Abstract method to specify browser context, could be created from browserSafari | browserChrome
  abstract createContext(): Promise<Playwright.BrowserContext>;

  async before(): Promise<void> {
    this.context = await this.createContext();
    this.context.on('page', page => {
      page.on('pageerror', exception => {
        log('Console error', `Uncaught exception: "${exception}"`);
        throw exception;
      });
    });

    log('Before each');
  }

  async after(): Promise<void> {
    await this.context.close();

    log('After each');
  }

  async search(link: string): Promise<void> {
    const page = await this.context.newPage();

    await this.goTo(page, link);

    await this.searchQuery(page);

    await this.pageLoaded(page);

    log('Success', 'All Done!');
  }

  static createNameEngine: () => SelectorEngine =  () => ({
    // Creates a selector that matches given target when queried at the root.
    // Can return undefined if unable to create one.
    // create(root: HTMLElement, target: HTMLElement) {
    //   return root.querySelector(target.tagName) === target ? target.tagName : undefined;
    // },

    // Returns the first element matching given selector in the root's subtree.
    query(root: HTMLElement, selector: string): HTMLElement {
      return root.querySelector(`[name=${selector}]`);
    },

    // Returns all elements matching given selector in the root's subtree.
    queryAll(root: HTMLElement, selector: string): Array<HTMLElement> {
      return Array.from(root.querySelectorAll(`[name=${selector}]`));
    },
  });

  @step('searchQuery')
  private async searchQuery(page: Playwright.Page): Promise<void> {
    await page.fill('name=q', 'lol');
    attach('form field', await page.screenshot(), ContentType.PNG);

    await page.press('name=q', 'Enter');
    await this.screenshot(page);
  }

  @attachment('screenshot', ContentType.PNG)
  async screenshot(page: Page): Promise<Buffer> {
    const buffer = await page.screenshot();

    return buffer;
  }

  @step('go to')
  private async goTo(page: Playwright.Page, link: string): Promise<void> {
    await page.goto(link);
    await this.screenshot(page);
  }

  @step('page loaded')
  private async pageLoaded(page: Playwright.Page): Promise<void> {
    await reporter.step('pageLoaded', async () => {
      await page.waitForLoadState('networkidle');
      await this.screenshot(page);
    });
  }
}

export type SelectorEngine = {
  query(root: HTMLElement, selector: string): HTMLElement | null;

  queryAll(root: HTMLElement, selector: string): HTMLElement[];
};
