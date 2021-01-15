import { suite, test } from '@testdeck/jest';
import { Hooks } from './hooks';

@suite
class Suite2 extends Hooks {
  @test
  async '[chrome] google'(): Promise<void> {
    await this.search('https://google.com/');
  }

  @test
  async '[chrome] github'(): Promise<void> {
    await this.search('https://github.com/egor-romanov/playwright-plate');
  }
}
