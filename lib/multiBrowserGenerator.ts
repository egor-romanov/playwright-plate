import { TypescriptParser } from 'typescript-parser';
import glob from 'glob';
import fs from 'fs';
import path from 'path';

const testDir = path.join(process.cwd(), 'test');
const generatedDir = path.join(testDir, 'generated');

function createSafari(clazz: string): string {
  return `async createContext(): Promise<Playwright.BrowserContext> {
    return await ${clazz}.browserSafari.newContext({ recordVideo: { dir: 'videos/', }, });
  }`;
}

function createChrome(clazz: string): string {
  return `async createContext(): Promise<Playwright.BrowserContext> {
    return await ${clazz}.browserChrome.newContext();
  }`;
}

function generateImports(clazz: string, from: string): string {
  return `import Playwright from 'playwright';
import { suite } from '@testdeck/jest';
import { ${clazz} } from '${from}';`;
}

async function generate(browser: string, generator: (clazz: string) => string) {
  const testFiles = glob.sync('**/*.template.ts', { cwd: './test', });

  const parser = new TypescriptParser();

  await testFiles.forEach(async suite => {
    console.log('[Found suite]', path.join(testDir, suite));

    const parsed = await parser.parseFile(path.join(testDir, suite), process.cwd());

    const createContext = `${generator(`${browser + parsed.declarations[0].name}`)}`;

    const code = `// Generated at ${new Date()}
${generateImports(parsed.declarations[0].name,
    path.relative(
      path.join(generatedDir,
        suite.indexOf('/') > 0 ? suite.substring(0, suite.lastIndexOf('/')) : ''),
      path.join(testDir, suite.replace('.ts', ''))
    )
  )
}

@suite
class ${browser + parsed.declarations[0].name} extends ${parsed.declarations[0].name} {
  ${createContext}
}`;

    if (path.dirname(suite) !== '.' && !fs.existsSync(path.join(generatedDir,path.dirname(suite)))) {
      fs.mkdirSync(path.join(generatedDir,path.dirname(suite)), { recursive: true, });
    }

    fs.writeFile(
      path.join(generatedDir, suite.replace('template', `${browser.toLowerCase()}.test`)),
      code,
      { flag: 'w', },
      () => {
        console.log('[Generated suite]',
          path.join(generatedDir,suite.replace('template', `${browser.toLowerCase()}.test`)));
      });
  });
}

(async function () {
  fs.rmdirSync(generatedDir, { recursive: true, });
  fs.mkdirSync(generatedDir);
  const all = process.argv.includes('-wc') || process.argv.includes('-cw');

  await Promise.all([(process.argv.includes('-w') || all) && generate('Safari', createSafari),
    (process.argv.includes('-c') || all) && generate('Chrome', createChrome),]);
}());
