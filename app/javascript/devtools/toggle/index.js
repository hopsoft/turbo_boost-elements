import supervisor from '../supervisor'
import { appendHTML } from '../../html'

document.addEventListener('reflex-behaviors:devtools-start', () =>
  supervisor.register('toggle', 'toggles<small>(trigger/target)</small>')
)

const triggerTooltipId = 'toggle-trigger-tooltip'
const targetTooltipId = 'toggle-target-tooltip'

addEventListener('click', removeTooltips)

function removeTooltips () {
  const ids = [triggerTooltipId, targetTooltipId]
  ids.forEach(id => {
    const el = document.getElementById(id)
    if (el) el.remove()
  })
}

function appendTooltip (id, title, content, options = {}) {
  let { backgroundColor, color, emphaisColor, position } = options
  color = color || 'white'
  position = position || 'top'

  appendHTML(`
    <reflex-behaviors-devools-tooltip id="${id}" position="${position}" background-color="${backgroundColor}" color="${color}" emphasis-color="${emphaisColor}">
      <div slot='title'>${title}</div>
      ${content}
    </reflex-behaviors-devools-tooltip>
  `)
  return document.getElementById(id)
}

export default class ToggleDevtool {
  constructor (trigger) {
    this.name = 'toggle'
    this.trigger = trigger
  }

  show () {
    if (!this.isEnabled) return
    this.hide()
    this.createTriggerTooltip()
    this.createTargetTooltip()
  }

  hide () {
    if (this.triggerTooltip) {
      this.triggerTooltip.remove()
      delete this.triggerTooltip
    }
    if (this.targetTooltip) {
      this.targetTooltip.remove()
      delete this.targetTooltip
    }
  }

  createTriggerTooltip () {
    const title = `TRIGGER (targets: ${this.trigger.controls})`
    const content = this.trigger.viewStack
      .map(view => {
        return this.trigger.sharedViews.includes(view)
          ? `<div slot="emphasis">${view}</div>`
          : `<div slot="normal">${view}</div>`
      }, this)
      .join('')

    this.triggerTooltip = appendTooltip(triggerTooltipId, title, content, {
      backgroundColor: 'salmon',
      emphaisColor: 'darkred'
    })

    const coords = this.trigger.coordinates
    const top = Math.ceil(coords.top - this.triggerTooltip.offsetHeight - 5)
    const left = Math.ceil(coords.left)
    this.triggerTooltip.style.top = `${top}px`
    this.triggerTooltip.style.left = `${left}px`
  }

  createTargetTooltip () {
    if (!this.trigger.target) return

    const title = `TARGET (id: ${this.trigger.target.id})`
    const content = this.trigger.target.viewStack
      .map(view => {
        return this.trigger.sharedViews.includes(view)
          ? `<div slot="emphasis">${view}</div>`
          : `<div slot="normal">${view}</div>`
      }, this)
      .join('')

    this.targetTooltip = appendTooltip(targetTooltipId, title, content, {
      backgroundColor: 'lightskyblue',
      emphaisColor: 'blue',
      position: 'bottom'
    })

    const coords = this.trigger.target.coordinates
    const top = Math.ceil(coords.top + coords.height + 4)
    const left = Math.ceil(coords.left)
    this.targetTooltip.style.top = `${top}px`
    this.targetTooltip.style.left = `${left}px`
  }

  //highlightTrigger () {
  //this.trigger.style.outline = 'solid 1px darkred'
  //}

  //hightlightTarget () {
  //this.trigger.style.outline = 'solid 1px blue'
  //}

  get isEnabled () {
    return supervisor.isEnabled(this.name)
  }
}
