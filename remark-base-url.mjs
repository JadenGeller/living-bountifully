import { visit } from 'unist-util-visit';

export function remarkBaseUrl(options = {}) {
  const base = options.base || '';

  return (tree) => {
    visit(tree, 'image', (node) => {
      if (node.url && node.url.startsWith('/') && !node.url.startsWith('//')) {
        node.url = base + node.url;
      }
    });
  };
}
