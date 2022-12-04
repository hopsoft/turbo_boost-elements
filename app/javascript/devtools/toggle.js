import supervisor from './supervisor'
import { appendHTML } from '../html'

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
    this.target = trigger.target

    document.addEventListener('reflex-behaviors:devtool-enable', event => {
      const { name } = event.detail
      if (name === this.name) this.addHighlight(this.trigger, 'salmon')
    })

    document.addEventListener('reflex-behaviors:devtool-disable', event => {
      const { name } = event.detail
      if (name === this.name) this.removeHighlight(this.trigger)
    })
  }

  get isEnabled () {
    return supervisor.isEnabled(this.name)
  }

  show () {
    if (!this.isEnabled) return
    this.hide()
    this.createTriggerTooltip()
    this.createTargetTooltip()
    this.addHighlight(this.target, 'lightskyblue')
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
    this.removeHighlight(this.target)
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
    if (!this.target) return

    const title = `TARGET (id: ${this.target.id})`
    const content = this.target.viewStack
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

    const coords = this.target.coordinates
    const top = Math.ceil(coords.top + coords.height + 4)
    const left = Math.ceil(coords.left)
    this.targetTooltip.style.top = `${top}px`
    this.targetTooltip.style.left = `${left}px`
  }

  addTriggerHightlight () {}

  addHighlight (element, color) {
    if (!element || element.originalStyles) return
    const { outline, outlineOffset } = element
    element.originalStyles = { outline, outlineOffset }
    element.style.outline = `solid 3px ${color}`
    element.style.outlineOffset = '-3px'
  }

  removeHighlight (element) {
    if (element && element.originalStyles) {
      for (const [key, value] of Object.entries(element.originalStyles)) {
        value ? (element.style[key] = value) : (element.style[key] = '')
      }
      delete element.originalStyles
    }
  }
}
