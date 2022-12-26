import {
  appendHTML,
  addHighlight,
  coordinates,
  removeHighlight
} from '../utils/dom'
import supervisor from './supervisor'

let activeToggle

document.addEventListener('turbo-boost:devtools-start', () =>
  supervisor.register('toggle', 'toggles<small>(trigger/target)</small>')
)

function appendTooltip (title, subtitle, content, options = {}) {
  let { backgroundColor, color, position } = options
  color = color || 'white'
  position = position || 'top'
  return appendHTML(`
    <turbo-boost-devool-tooltip position="${position}" background-color="${backgroundColor}" color="${color}">
      <div slot='title'>${title}</div>
      <div slot='subtitle'>${subtitle}</div>
      ${content}
    </turbo-boost-devool-tooltip>
  `)
}

export default class ToggleDevtool {
  constructor (triggerElement) {
    this.name = 'toggle'
    this.command = triggerElement.dataset.turboCommand
    this.triggerElement = triggerElement // SEE: app/javascript/elements/toggle_trigger_element.js
    this.targetElement = triggerElement.targetElement // SEE: app/javascript/elements/toggle_target_element.js
    this.morphElement = triggerElement.morphElement

    document.addEventListener('turbo-boost:devtool-enable', event => {
      const { name } = event.detail
      if (name === this.name) {
        addHighlight(this.triggerElement, {
          outline: '3px dashed blueviolet',
          outlineOffset: '2px'
        })
      }
    })

    document.addEventListener('turbo-boost:devtool-disable', event => {
      const { name } = event.detail
      if (name === this.name) removeHighlight(this.triggerElement)
    })

    let hideTimeout
    const debouncedHide = () => {
      clearTimeout(hideTimeout)
      hideTimeout = setTimeout(this.hide(true), 25)
    }

    addEventListener('click', event => {
      if (event.target.closest('turbo-boost-devool-tooltip')) return
      debouncedHide()
    })

    addEventListener('turbo:load', debouncedHide)
    addEventListener('turbo-frame:load', debouncedHide)
    addEventListener(TurboBoost.Commands.events.success, debouncedHide)
    addEventListener(TurboBoost.Commands.events.finish, debouncedHide)
  }

  get enabled () {
    return supervisor.enabled(this.name)
  }

  show () {
    if (!this.enabled) return
    if (activeToggle === this) return
    activeToggle = this
    this.hide()

    addHighlight(this.targetElement, {
      outline: '3px dashed darkcyan',
      outlineOffset: '-2px'
    })

    addHighlight(this.triggerElement.morphElement, {
      outline: '3px dashed chocolate',
      outlineOffset: '3px'
    })

    const morphTooltip = this.createMorphTooltip()
    const targetTooltip = this.createTargetTooltip()
    this.createTriggerTooltip(targetTooltip, morphTooltip)

    document
      .querySelectorAll('.leader-line')
      .forEach(el => (el.style.zIndex = 100000))

    const data = {
      morph: {
        partial: this.triggerElement.renders,
        id: this.triggerElement.morphs,
        status: this.morphElement ? 'OK' : 'Not Found'
      },
      trigger: { partial: null, id: null, status: 'Not Found' },
      target: { partial: null, id: null, status: 'Not Found' }
    }

    if (this.triggerElement) {
      data.trigger = {
        partial: this.triggerElement.partial,
        id: this.triggerElement.id,
        status: 'OK'
      }
      data.target.id = this.triggerElement.controls
    }

    if (this.targetElement)
      data.target = {
        partial: this.targetElement.partial,
        id: this.targetElement.id,
        status: 'OK'
      }

    console.table(data)
  }

  hide (clearActiveToggle) {
    document.querySelectorAll('.leader-line').forEach(el => el.remove())
    document
      .querySelectorAll('turbo-boost-devool-tooltip')
      .forEach(el => el.remove())

    document.querySelectorAll('[data-turbo-boost-highlight]').forEach(el => {
      if (!el.tagName.match(/turbo-boost-toggle-trigger/i)) removeHighlight(el)
    })

    if (clearActiveToggle) activeToggle = null
  }

  createMorphTooltip () {
    if (!this.triggerElement.morphs)
      return console.debug(
        `Unable to create the morph tooltip! No element matches the DOM id: '${this.triggerElement.morphs}'`
      )

    const title = 'PARTIAL'
    const subtitle = `
      id: ${this.triggerElement.morphs || 'unknown'}<br>
      partial: ${this.triggerElement.renders || 'unknown'}
    `
    const content = '<div slot="content"></div>'
    const tooltip = appendTooltip(title, subtitle, content, {
      backgroundColor: 'lightyellow',
      color: 'chocolate'
    })

    const coords = coordinates(this.morphElement)
    const top = Math.ceil(
      coords.top + coords.height / 2 - tooltip.offsetHeight / 2
    )
    const left = Math.ceil(coords.left + coords.width + 100)
    tooltip.style.top = `${top}px`
    tooltip.style.left = `${left}px`

    tooltip.line = new LeaderLine(tooltip, this.morphElement, {
      ...this.leaderLineOptions,
      color: 'chocolate'
    })

    tooltip.drag = new PlainDraggable(tooltip)
    return tooltip
  }

  createTargetTooltip () {
    if (!this.targetElement)
      return console.debug(
        `Unable to create the target tooltip! No element matches the DOM id: '${this.triggerElement.controls}'`
      )

    const title = 'TARGET'
    const subtitle = `
      id: ${this.targetElement.id}<br>
      labeled by: ${this.targetElement.labeledBy}
    `
    const content = this.targetElement.viewStack
      .reverse()
      .map((view, index) => {
        return this.triggerElement.sharedViews.includes(view)
          ? `<div slot="content-top">${index + 1}. ${view}</div>`
          : `<div slot="content-bottom">${index + 1}. ${view}</div>`
      }, this)
      .join('')

    const tooltip = appendTooltip(title, subtitle, content, {
      backgroundColor: 'lightcyan',
      color: 'darkcyan',
      position: 'bottom'
    })

    const coords = coordinates(this.targetElement)
    const top = Math.ceil(coords.top + tooltip.offsetHeight)
    const left = Math.ceil(coords.left + coords.width + tooltip.offsetWidth / 3)
    tooltip.style.top = `${top}px`
    tooltip.style.left = `${left}px`

    tooltip.line = new LeaderLine(tooltip, this.targetElement, {
      ...this.leaderLineOptions,
      color: 'darkcyan'
    })

    tooltip.drag = new PlainDraggable(tooltip)
    return tooltip
  }

  createTriggerTooltip (targetTooltip, morphTooltip) {
    if (!this.triggerElement) return
    const title = 'TRIGGER'
    const subtitle = `
      id: ${this.triggerElement.id}<br>
      controls: ${this.triggerElement.controls}
    `
    const content = this.triggerElement.viewStack
      .reverse()
      .map((view, index) => {
        return this.triggerElement.sharedViews.includes(view)
          ? `<div slot="content-top">${index + 1}. ${view}</div>`
          : `<div slot="content-bottom">${index + 1}. ${view}</div>`
      }, this)
      .join('')

    const tooltip = appendTooltip(title, subtitle, content, {
      backgroundColor: 'lavender',
      color: 'blueviolet'
    })

    const coords = coordinates(this.triggerElement)
    const top = Math.ceil(coords.top - tooltip.offsetHeight * 2)
    const left = Math.ceil(coords.left + coords.width + tooltip.offsetWidth / 3)
    tooltip.style.top = `${top}px`
    tooltip.style.left = `${left}px`

    tooltip.line = new LeaderLine(this.triggerElement, tooltip, {
      ...this.leaderLineOptions,
      color: 'blueviolet'
    })

    if (targetTooltip) {
      tooltip.lineToTarget = new LeaderLine(tooltip, targetTooltip, {
        ...this.leaderLineOptions,
        color: 'blueviolet',
        middleLabel: 'toggles',
        size: 2.1
      })

      targetTooltip.drag.onMove = () => {
        targetTooltip.line.position()
        tooltip.lineToTarget.position()
        tooltip.lineToRendering.position()
      }
    }

    if (morphTooltip) {
      tooltip.lineToRendering = new LeaderLine(tooltip, morphTooltip, {
        ...this.leaderLineOptions,
        color: 'blueviolet',
        middleLabel: 'renders and morphs',
        size: 2.1
      })

      morphTooltip.drag.onMove = () => {
        morphTooltip.line.position()
        if (tooltip.lineToTarget) tooltip.lineToTarget.position()
        tooltip.lineToRendering.position()
      }
    }

    tooltip.drag = new PlainDraggable(tooltip)
    tooltip.drag.onMove = () => {
      console.log('nate', tooltip.line)
      tooltip.line.position()
      if (tooltip.lineToTarget) tooltip.lineToTarget.position()
      if (tooltip.lineToRendering) tooltip.lineToRendering.position()
    }

    return tooltip
  }

  get leaderLineOptions () {
    return {
      dash: { animation: true },
      dropShadow: { opacity: 0.3 },
      endPlug: 'arrow3',
      endPlugSize: 1.7,
      size: 3,
      startPlug: 'disc',
      startPlugSize: 1
    }
  }
}
