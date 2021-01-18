import Playwright from 'playwright';
import { test } from '@testdeck/jest';
import { Hooks } from '../hooks';

export abstract  class Example2 extends Hooks {
  @test
  async '[chrome] google'(): Promise<void> {
    await this.search('https://google.com/');
  }

  @test
  async '[chrome] github'(): Promise<void> {
    await this.search('https://github.com/egor-romanov/playwright-plate');
  }

  @test
  async 'console error test'(): Promise<void> {
    const page = await this.context.newPage();
    await page.goto('data:text/html,<script>throw new Error("Test")</script>');
  }
}
