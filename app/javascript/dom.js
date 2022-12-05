export function template (html) {
  let template = document.createElement('template')
  template.innerHTML = html
  return template
}

export function appendHTML (html, parent) {
  parent = parent || document.body
  return parent.appendChild(template(html).content.cloneNode(true))
}

export function addHighlight (element, options = {}) {
  if (!element) return
  let { color, offset, width } = options
  color = color || 'red'
  offset = offset || '0px'
  width = width || '3px'
  const { display, outline, outlineOffset } = element.style
  element.originalStyles = element.originalStyles || {
    display,
    outline,
    outlineOffset
  }
  //element.style.display = 'inline-block'
  element.style.outline = `dotted ${width} ${color}`
  element.style.outlineOffset = offset
}

export function removeHighlight (element) {
  if (element && element.originalStyles) {
    for (const [key, value] of Object.entries(element.originalStyles)) {
      value ? (element.style[key] = value) : (element.style[key] = '')
    }
    delete element.originalStyles
  }
}
