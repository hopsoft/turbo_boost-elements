export function template (html) {
  let template = document.createElement('template')
  template.innerHTML = html
  return template
}

export function appendHTML (html, parent) {
  parent = parent || document.body
  return parent.appendChild(template(html).content.cloneNode(true))
}
