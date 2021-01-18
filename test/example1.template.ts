import Playwright from 'playwright';
import { test } from '@testdeck/jest';
import { Hooks } from './hooks';

export abstract class Example1 extends Hooks {
  @test
  async '[chrome] google'(): Promise<void> {
    await this.search('https://google.com/');
  }

  @test
  async '[chrome] github'(): Promise<void> {
    await this.search('https://github.com/egor-romanov/playwright-plate');
  }
}
