import { appendHTML, addHighlight, removeHighlight } from './dom'
import supervisor from './supervisor'

document.addEventListener('reflex-behaviors:devtools-start', () =>
  supervisor.register('toggle', 'toggles<small>(trigger/target)</small>')
)

const triggerTooltipId = 'toggle-trigger-tooltip'
const targetTooltipId = 'toggle-target-tooltip'

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

    document.addEventListener('reflex-behaviors:devtool-enable', event => {
      const { name } = event.detail
      if (name === this.name)
        addHighlight(this.trigger, { color: 'red', offset: '2px' })
    })

    document.addEventListener('reflex-behaviors:devtool-disable', event => {
      const { name } = event.detail
      if (name === this.name) removeHighlight(this.trigger)
    })

    document.addEventListener('click', event => {
      if (event.target.closest('reflex-behaviors-devools-tooltip')) return
      this.hide()
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
    addHighlight(this.target, { color: 'blue', offset: '-2px' })

    let renderingPartial = this.trigger ? this.trigger.renderingPartial : null
    renderingPartial =
      renderingPartial || (this.target ? this.target.renderingPartial : null)

    let renderingElement = this.trigger ? this.trigger.renderingElement : null
    renderingElement =
      renderingElement || (this.target ? this.target.renderingElement : null)

    addHighlight(renderingElement, {
      color: 'turquoise',
      offset: '4px',
      width: '4px'
    })

    const data = {
      rendering: { partial: null, id: null },
      trigger: { partial: null, id: null },
      target: { partial: null, id: null }
    }

    if (renderingPartial) data.rendering.partial = renderingPartial
    if (renderingElement) data.rendering.id = renderingElement.id

    if (this.trigger)
      data.trigger = { partial: this.trigger.partial, id: this.trigger.id }

    if (this.target)
      data.target = { partial: this.target.partial, id: this.target.id }
    else if (this.trigger)
      data.target.id = `No element matches the targeted DOM id: ${this.trigger.controls}`

    console.table(data)
  }

  hide () {
    let renderingElement = this.trigger ? this.trigger.renderingElement : null
    renderingElement =
      renderingElement || (this.target ? this.target.renderingElement : null)

    this.destroyTriggerTooltip()
    this.destroyTargetTooltip()
    removeHighlight(this.target)
    removeHighlight(renderingElement)
    this.cleanup()
  }

  cleanup () {
    document
      .querySelectorAll('reflex-behaviors-devools-tooltip')
      .forEach(el => el.remove())

    document
      .querySelectorAll('[data-reflex-behaviors-highlight]')
      .forEach(el => {
        if (!el.tagName.match(/toggle-trigger/i)) removeHighlight(el)
      })
  }

  createTriggerTooltip () {
    if (!this.trigger) return
    const title = `TRIGGER (targets: ${this.trigger.controls})`
    const content = this.trigger.viewStack
      .map(view => {
        return this.trigger.sharedViews.includes(view)
          ? `<div slot="emphasis">${view}</div>`
          : `<div slot="normal">${view}</div>`
      }, this)
      .join('')

    this.triggerTooltip = appendTooltip(triggerTooltipId, title, content, {
      backgroundColor: 'pink',
      emphaisColor: 'darkred'
    })

    const coords = this.trigger.coordinates
    const top = Math.ceil(coords.top - this.triggerTooltip.offsetHeight - 14)
    const left = Math.ceil(coords.left - 15)
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
    if (!this.target.viewStack) return

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
    const top = Math.ceil(coords.top + coords.height + 12)
    const left = Math.ceil(coords.left - 15)
    this.targetTooltip.style.top = `${top}px`
    this.targetTooltip.style.left = `${left}px`
  }

  destroyTargetTooltip () {
    if (!this.targetTooltip) return
    this.targetTooltip.remove()
    delete this.targetTooltip
  }
}
