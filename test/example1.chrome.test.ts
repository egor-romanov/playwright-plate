import { suite, test } from '@testdeck/jest';
import { Hooks } from './hooks';

@suite
class Suite1 extends Hooks {
  @test
  async '[chrome] google'() {
    await this.search('https://google.com/');
  }

  @test
  async '[chrome] github'() {
    await this.search('https://github.com/egor-romanov/playwright-plate');
  }
}
