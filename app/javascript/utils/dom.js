export function template (html) {
  let template = document.createElement('template')
  template.innerHTML = html
  return template
}

export function appendHTML (html, parent) {
  parent = parent || document.body
  const clone = template(html).content.cloneNode(true)
  const child = clone.querySelector('*')
  return parent.appendChild(child)
}

export function addHighlight (element, options = {}) {
  if (!element) return
  removeHighlight(element)
  let { outline, outlineOffset } = options

  outline = outline || 'dashed 3px red'
  outlineOffset = outlineOffset || '0px'

  element.originalStyles = element.originalStyles || {
    display: element.style.display,
    minHeight: element.style.minHeight,
    minWidth: element.style.minWidth,
    outline: element.style.outline,
    outlineOffset: element.style.outlineOffset
  }

  if (
    getComputedStyle(element).display.match(/^inline$/i) &&
    element.offsetWidth === 0 &&
    element.offsetHeight === 0
  ) {
    element.style.display = 'inline-block'
    element.style.minHeight = '2px'
    element.style.minWidth = '2px'
  }
  element.style.outline = outline
  element.style.outlineOffset = outlineOffset
  element.dataset.reflexBehaviorsHighlight = true
}

export function removeHighlight (element) {
  if (!element) return
  if (element.originalStyles) {
    for (const [key, value] of Object.entries(element.originalStyles))
      value ? (element.style[key] = value) : (element.style[key] = '')
    delete element.originalStyles
  }
  delete element.dataset.reflexBehaviorsHighlight
}

export function coordinates (element) {
  if (!element) return {}
  const rect = element.getBoundingClientRect()
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: element.offsetWidth,
    height: element.offsetHeight
  }
}
