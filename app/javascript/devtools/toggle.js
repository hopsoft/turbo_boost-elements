import { appendHTML, addHighlight, removeHighlight } from '../dom'
import supervisor from './supervisor'

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
    this.reflex = trigger.dataset.turboReflex
    this.trigger = trigger
    this.target = trigger.target
    this.renderingPartial = trigger.renderingPartial
    this.renderingElement = trigger.renderingElement
    this.renderingElementId = this.renderingElement
      ? this.renderingElement.id
      : null

    document.addEventListener('reflex-behaviors:devtool-enable', event => {
      const { name } = event.detail
      if (name === this.name)
        addHighlight(this.trigger, { color: 'salmon', offset: '2px' })
    })

    document.addEventListener('reflex-behaviors:devtool-disable', event => {
      const { name } = event.detail
      if (name === this.name) removeHighlight(this.trigger)
    })
  }

  get enabled () {
    return supervisor.enabled(this.name)
  }

  show () {
    if (!this.enabled) return
    this.hide()
    this.createTriggerTooltip()
    this.createTargetTooltip()
    addHighlight(this.target, { color: 'lightskyblue', offset: '-2px' })
    addHighlight(this.renderingElement, {
      color: 'lime',
      offset: '4px'
    })

    console.table({
      trigger: { id: this.trigger.id, partial: this.trigger.partial },
      target: { id: this.target.id, partial: this.target.partial },
      [this.reflex]: {
        id: this.renderingElementId,
        partial: this.renderingPartial
      }
    })
  }

  hide () {
    this.destroyTriggerTooltip()
    this.destroyTargetTooltip()
    removeHighlight(this.target)
    removeHighlight(this.renderingElement)
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

  destroyTriggerTooltip () {
    if (!this.triggerTooltip) return
    this.triggerTooltip.remove()
    delete this.triggerTooltip
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

  destroyTargetTooltip () {
    if (!this.targetTooltip) return
    this.targetTooltip.remove()
    delete this.targetTooltip
  }
}
