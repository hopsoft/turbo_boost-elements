const addedDependencies = []

function addScript (src, integrity) {
  if (document.querySelector(`[src='${src}']`)) return

  if (addedDependencies.includes(src)) return
  addedDependencies.push(src)

  const script = document.createElement('script')
  script.setAttribute('src', src)
  script.setAttribute('crossorigin', 'anonymous')
  script.setAttribute('referrerpolicy', 'no-referrer')
  if (integrity) script.setAttribute('integrity', integrity)
  document.head.appendChild(script)
}

function removeScript (src) {
  if (!addedDependencies.includes(src)) return
  addedDependencies.splice(addedDependencies.indexOf(src), 1)

  const el = document.querySelector(`script[src='${src}']`)
  if (el) el.remove()
}

export function addLeaderLineDependency () {
  addScript(
    'https://cdnjs.cloudflare.com/ajax/libs/leader-line/1.0.7/leader-line.min.js',
    'sha512-0dNdzMjpT6pJdFGF1DwybFCfm3K/lzHhxaMXC/92J9/DZujHlqYFqmhTOAoD0o+LkeEsVK2ar/ESs7/Q2B6wJg=='
  )
}

export function removeLeaderLineDependency () {
  removeScript(
    'https://cdnjs.cloudflare.com/ajax/libs/leader-line/1.0.7/leader-line.min.js'
  )
}

export function addPlainDraggableDependency () {
  addScript(
    'https://cdn.jsdelivr.net/npm/plain-draggable@2.5.14/plain-draggable.min.js'
  )
}

export function removePlainDraggableDependency () {
  removeScript(
    'https://cdn.jsdelivr.net/npm/plain-draggable@2.5.14/plain-draggable.min.js'
  )
}
