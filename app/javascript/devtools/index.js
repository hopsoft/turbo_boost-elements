let tray

function enabled () {
  const tools = document.body.dataset.devtools || ''
  return tools.trim().split(' ')
}

function isEnabled (tool) {
  return enabled().includes(tool)
}

function enable (tool) {
  if (isEnabled(tool)) return
  const list = enabled()
  list.push(tool)
  document.body.dataset.devtools = list.join(' ').trim()
}

function disable (tool) {
  const list = enabled()
  const index = list.indexOf(tool)
  if (index < 0) return
  list.splice(index, 1)
  document.body.dataset.devtools = list.join(' ').trim()
}

function stop () {
  if (!tray) return
  tray
    .querySelectorAll('.devtool')
    .forEach(devtool => disable(devtool.getAttribute('name')))
  tray.remove()
  tray = null
}

function start () {
  stop()
  tray = document.createElement('div')
  tray.id = 'reflex-behaviors-devtools'
  tray.innerHTML = `
    <strong>DEVTOOLS</strong>
    <div name="toggle" class="devtool">
      <input name="toggle-checkbox" value="toggle" type="checkbox">
      <label for="toggle-checkbox">toggles<small>(trigger/target)</small></label>
    </div>
    <button data-action='close'>X</button>
  `
  document.body.appendChild(tray)
  tray
    .querySelector('button[data-action=close]')
    .addEventListener('click', () => stop())
  tray.querySelectorAll('.devtool').forEach(devtool => {
    devtool.querySelector('input').addEventListener('change', event => {
      event.target.checked
        ? enable(event.target.value)
        : disable(event.target.value)
    })
    devtool.addEventListener('click', event => {
      if (event.target.tagName.match(/input/i)) return
      event.target
        .closest('.devtool')
        .querySelector('input')
        .click()
    })
  })
}

export default {
  disable,
  enable,
  isEnabled,
  start,
  stop
}
