import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * The subset of post frontmatter we validate for smoke testing.
 * Properties are mutable here because the parser progressively assigns them
 * while reading the markdown frontmatter.
 */
interface PostFrontmatter {
  title: string;
  description: string;
  cover: string;
  date: string;
  tags: string[];
  slug?: string;
  draft?: boolean;
}

/**
 * Extracts the raw YAML frontmatter block from a markdown file.
 * @param markdownFile Absolute path to the markdown file to inspect.
 */
function getFrontmatterBlock(markdownFile: string): string {
  const raw = readFileSync(markdownFile, 'utf-8');
  const frontmatterMatch = raw.match(/^---\n([\s\S]+?)\n---/);
  if (!frontmatterMatch) {
    throw new Error(`Missing frontmatter in ${markdownFile}`);
  }
  return frontmatterMatch[1];
}

/**
 * Removes surrounding single or double quotes from a scalar value when present.
 * @param value Raw scalar extracted from the frontmatter line.
 */
function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if ((trimmed.startsWith("'") && trimmed.endsWith("'")) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

/**
 * Parses inline YAML array declarations of the form ["a", "b"].
 * @param raw Raw string containing the array literal, including brackets.
 */
function parseInlineStringArray(raw: string): string[] {
  if (!raw.startsWith('[') || !raw.endsWith(']')) {
    return [];
  }
  return raw
    .slice(1, -1)
    .split(',')
    .map(entry => stripQuotes(entry))
    .filter(entry => entry.length > 0);
}

/**
 * Parses the limited YAML shapes used in our demo content frontmatter.
 * Supports strings, booleans, ISO dates, relative paths, and string arrays.
 * @param block Raw YAML frontmatter without the surrounding markers.
 */
function parseFrontmatter(block: string): Partial<PostFrontmatter> {
  const lines = block.split('\n');
  const result: Partial<PostFrontmatter> = {};
  let activeArrayKey: 'tags' | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    if (line.startsWith('- ')) {
      if (activeArrayKey === 'tags') {
        const entries = result.tags ?? [];
        const value = stripQuotes(line.slice(2));
        if (value) {
          entries.push(value);
          result.tags = entries;
        }
      }
      continue;
    }

    activeArrayKey = null;
    const colonIndex = rawLine.indexOf(':');
    if (colonIndex === -1) {
      continue;
    }

    const key = rawLine.slice(0, colonIndex).trim();
    const remainder = rawLine.slice(colonIndex + 1).trim();
    const scalar = stripQuotes(remainder);

    switch (key) {
      case 'title':
        if (scalar) result.title = scalar;
        break;
      case 'description':
        if (scalar) result.description = scalar;
        break;
      case 'cover':
        if (scalar) result.cover = scalar;
        break;
      case 'date':
        if (scalar) result.date = scalar;
        break;
      case 'slug':
        if (scalar) result.slug = scalar;
        break;
      case 'draft':
        if (scalar === 'true') {
          result.draft = true;
        } else if (scalar === 'false') {
          result.draft = false;
        }
        break;
      case 'tags':
        if (!remainder) {
          activeArrayKey = 'tags';
          result.tags = [];
          break;
        }
        if (remainder.startsWith('[') && remainder.endsWith(']')) {
          result.tags = parseInlineStringArray(remainder);
        } else if (scalar) {
          result.tags = [scalar];
        }
        break;
      default:
        break;
    }
  }

  return result;
}

describe('content collections smoke test', () => {
  const postsRoot = resolve(process.cwd(), 'src/content/posts');
  const postDirectories = readdirSync(postsRoot).filter(entry => statSync(join(postsRoot, entry)).isDirectory());

  it('keeps each sample post wired with metadata and assets', () => {
    expect(postDirectories.length).toBeGreaterThan(0);

    const discoveredSlugs = new Set<string>();

    for (const directory of postDirectories) {
      const markdownPath = join(postsRoot, directory, 'index.md');
      expect(existsSync(markdownPath)).toBe(true);

      const frontmatter = parseFrontmatter(getFrontmatterBlock(markdownPath));

      expect(frontmatter.title, `${directory} is missing a title`).toBeTruthy();
      expect(frontmatter.description, `${directory} is missing a description`).toBeTruthy();
      expect(frontmatter.date, `${directory} is missing a date`).toBeTruthy();
      expect(frontmatter.cover, `${directory} is missing a cover reference`).toBeTruthy();
      expect(frontmatter.tags, `${directory} is missing tags`).toBeDefined();

      const coverPath = join(postsRoot, directory, String(frontmatter.cover));
      expect(existsSync(coverPath)).toBe(true);

      const parsedDate = Date.parse(String(frontmatter.date));
      expect(Number.isNaN(parsedDate)).toBe(false);

      expect(String(frontmatter.description).length).toBeLessThanOrEqual(160);

      const tags = frontmatter.tags ?? [];
      expect(Array.isArray(tags)).toBe(true);
      expect(tags.length).toBeGreaterThan(0);

      const canonicalSlug = typeof frontmatter.slug === 'string' ? frontmatter.slug : directory;
      expect(canonicalSlug).toMatch(/^[a-z0-9-]+$/);
      discoveredSlugs.add(canonicalSlug);
    }

    expect(discoveredSlugs.size).toBe(postDirectories.length);
  });
});
