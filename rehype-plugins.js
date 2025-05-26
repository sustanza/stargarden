import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that adds a CSS class to every <img> element,
 * ensures the final HTML uses the correct `class="..."` attribute,
 * and (optionally) adds the `data-zoomable` hook for medium‑zoom.
 *
 * @param {string} className - The class name to inject (default: "markdown-img").
 * @returns {import('unified').Plugin<[], import('hast').Root>}
 */
export function imgClass(className = 'markdown-img') {
  return (tree) => {
    visit(tree, 'element', (node) => {
      const props = (node.properties ||= {});

      // --- 1) Fix stray `classname` attributes on *any* element ------------------
      if ('classname' in props) {
        const stray = props['classname'];
        delete props['classname'];

        // Append or create the canonical class property.
        if (props.class) {
          props.class += ` ${stray}`;
        } else {
          props.class = stray;
        }
      }

      // --- 2) For <img> elements, inject the requested class and data‑zoomable --
      if (node.tagName !== 'img') return;

      // Collect class tokens from possible property keys.
      const collect = (value) =>
        Array.isArray(value)
          ? value
          : typeof value === 'string'
            ? value.split(/\s+/).filter(Boolean)
            : [];

      const tokens = new Set([
        ...collect(props.class),
        ...collect(props.className),
        ...collect(props.classname),
      ]);
      tokens.add(className);

      // Write back to the canonical key `class` so the HTML serializer outputs class="..."
      props.class = Array.from(tokens).join(' ');

      // Remove alias keys to avoid invalid attributes.
      delete props.className;
      delete props.classname;

      // Optional attribute consumed by medium‑zoom. Harmless if not used.
      props['data-zoomable'] = '';
    });
  };
}