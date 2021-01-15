import Playwright from 'playwright';
import { suite, test } from '@testdeck/jest';
import { Hooks } from './hooks';

@suite
class Suite2 extends Hooks {
  async before(): Promise<void> {
    this.browser = await Playwright.webkit.launch({ headless: false, });

    console.log('Hooks.before');
  }

  @test
  async '[webkit] google'() {
    await this.search('https://google.com/');
  }

  @test
  async '[webkit] github'() {
    await this.search('https://github.com/egor-romanov/playwright-plate');
  }
}
