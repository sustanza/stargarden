import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import parse from 'rehype-parse';
import stringify from 'rehype-stringify';
import { imgClass } from '../rehype-plugins.js'; // adjust path

/** Helper to run a plugin and return rendered HTML */
function run(html: string, plugin: any, opts?: any) {
  return unified()
    .use(parse, { fragment: true })
    .use(plugin, opts)
    .use(stringify)
    .processSync(html)
    .toString();
}

describe('rehype plugins', () => {
  it('imgClass adds markdown-img class & data-zoomable', () => {
    const out = run('<img src="foo.jpg" />', imgClass, 'markdown-img');
    expect(out).toContain('class="markdown-img"');
    expect(out).toContain('data-zoomable');
  });

  it('imgClass converts stray classname → class', () => {
    const html = '<p><img src="x" classname="bad"></p>';
    const out = run(html, imgClass);
    expect(out).toContain('class="bad markdown-img"');
    expect(out).not.toContain('classname=');
  });
});