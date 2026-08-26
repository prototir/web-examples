import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const ignored = new Set(['.git', '.github', 'tools']);
const examples = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !ignored.has(entry.name))
  .map((entry) => entry.name)
  .sort();

assert.deepEqual(examples, ['sdk-playground', 'starter', 'three-starter']);
for (const name of examples) {
  const directory = join(root, name);
  const manifestPath = join(directory, 'prototir.json');
  assert.ok(existsSync(manifestPath), `${name} is missing prototir.json`);
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.runtime?.engine, 'web', `${name} must declare the Web runtime`);
  assert.equal(manifest.runtime?.profile, 'standard', `${name} must use the standard profile`);
  assert.ok(existsSync(join(directory, manifest.entry ?? 'index.html')), `${name} entry is missing`);
  assert.ok(existsSync(join(directory, 'README.md')), `${name} is missing its README`);
}

console.log(`Validated ${examples.length} Web examples.`);
