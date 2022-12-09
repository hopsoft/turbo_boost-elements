const added = []

const dependencies = {
  LeaderLine: {
    src:
      'https://cdnjs.cloudflare.com/ajax/libs/leader-line/1.0.7/leader-line.min.js',
    integrity:
      'sha512-0dNdzMjpT6pJdFGF1DwybFCfm3K/lzHhxaMXC/92J9/DZujHlqYFqmhTOAoD0o+LkeEsVK2ar/ESs7/Q2B6wJg==',
    global: 'LeaderLine'
  },

  PlainDraggable: {
    src:
      'https://cdn.jsdelivr.net/npm/plain-draggable@2.5.14/plain-draggable.min.js',
    global: 'PlainDraggable'
  }
}

function exists (dependency) {
  if (dependency.global && self[dependency.global]) return true
  if (document.querySelector(`[src='${dependency.src}']`)) return true
  return added.includes(dependency)
}

function add (dependency) {
  if (exists(dependency)) return
  added.push(dependency)

  const { src, integrity } = dependency
  const script = document.createElement('script')
  script.setAttribute('src', src)
  script.setAttribute('crossorigin', 'anonymous')
  script.setAttribute('referrerpolicy', 'no-referrer')
  if (integrity) script.setAttribute('integrity', integrity)
  document.head.appendChild(script)
}

function remove (dependency) {
  if (!added.includes(dependency)) return
  added.splice(added.indexOf(dependency), 1)

  const { src } = dependency
  const el = document.querySelector(`script[src='${src}']`)
  if (el) el.remove()
  if (dependency.global && self[dependency.global])
    self[dependency.global] = null
}

function removeAll () {
  ;[...added].forEach(dependency => remove(dependency))
}

export default { ...dependencies, add, remove, removeAll }
