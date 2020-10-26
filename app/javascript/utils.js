export function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

export const isString = (obj) => (typeof obj === 'string' || obj instanceof String)

export const isArray = (obj) => (obj instanceof Array)
