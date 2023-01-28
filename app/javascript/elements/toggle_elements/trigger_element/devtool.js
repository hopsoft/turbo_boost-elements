// Icons courtesy of https://feathericons.com/
import {
  appendHTML,
  addHighlight,
  coordinates,
  removeHighlight
} from '../../../utils/dom'
import supervisor from '../../../devtools/supervisor'

let activeToggle

document.addEventListener('turbo-boost:devtools-start', () =>
  supervisor.register('toggle', 'toggles')
)

function appendTooltip (title, subtitle, content, options = {}) {
  let { backgroundColor, color, position } = options
  color = color || 'white'
  position = position || 'top'
  return appendHTML(`
    <turbo-boost-devtool-tooltip position="${position}" background-color="${backgroundColor}" color="${color}">
      <div slot='title'>${title}</div>
      <div slot='subtitle'>${subtitle}</div>
      ${content}
    </turbo-boost-devtool-tooltip>
  `)
}

export default class Devtool {
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
      hideTimeout = setTimeout(this.hide({ active: false }), 25)
    }

    addEventListener('click', event => {
      if (event.target.closest('turbo-boost-devtool-tooltip')) return
      debouncedHide()
    })

    addEventListener('resize', () => {
      if (this.active) {
        this.hide({ active: false })
        this.show()
      }
    })

    addEventListener('turbo:load', debouncedHide)
    addEventListener('turbo-frame:load', debouncedHide)
    addEventListener(TurboBoost.Commands.events.success, debouncedHide)
    addEventListener(TurboBoost.Commands.events.finish, debouncedHide)
  }

  get enabled () {
    return supervisor.enabled(this.name)
  }

  get active () {
    return activeToggle === this
  }

  set active (value) {
    if (value) activeToggle = this
    else activeToggle = null
  }

  show () {
    if (!this.enabled) return
    if (this.active) return
    this.active = true
    this.hide({ active: true })

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
        dom_id: this.targetElement.id,
        status: 'OK'
      }

    console.table(data)
  }

  hide ({ active: active = false }) {
    document.querySelectorAll('.leader-line').forEach(el => el.remove())
    document
      .querySelectorAll('turbo-boost-devtool-tooltip')
      .forEach(el => el.remove())

    document.querySelectorAll('[data-turbo-boost-highlight]').forEach(el => {
      if (!el.tagName.match(/turbo-boost-toggle-trigger/i)) removeHighlight(el)
    })

    this.active = active
  }

  createMorphTooltip () {
    if (!this.triggerElement.morphs)
      return console.debug(
        `Unable to create the morph tooltip! No element matches the DOM id: '${this.triggerElement.morphs}'`
      )

    const title = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
      RENDERING
    `
    const subtitle = `
      <b>partial</b>: ${this.triggerElement.renders || 'unknown'}<br>
      <b>morphs</b>: ${this.triggerElement.morphs || 'unknown'}<br>
    `
    const content = `
      <div slot="content-top" style="font-size:85%; font-style:italic; font-weight:100;">
        The <b>TRIGGER</b> toggles the <b>TARGET</b> then renders the partial &amp; morphs the element.<br>
      </div>
    `
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

    const title = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
      TARGET
    `
    const subtitle = `
      <b>id</b>: ${this.targetElement.id}<br>
      <b>aria-labeled-by</b>: ${this.targetElement.labeledBy}<br>
    `
    let content = this.targetElement.viewStack
      .reverse()
      .map((view, index) => {
        return this.triggerElement.sharedViews.includes(view)
          ? `<div slot="content">${index + 1}. ${view}</div>`
          : `<div slot="content-bottom">${index + 1}. ${view}</div>`
      }, this)
      .join('')

    content = `
      <div slot="content-top">
        <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        <b>View Stack</b>
      </div>
      ${content}
    `

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
    const title = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display:inline;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      TRIGGER
    `
    const subtitle = `
      <b>id</b>: ${this.triggerElement.id}<br>
      <b>aria-controls</b>: ${this.triggerElement.controls}<br>
      <b>aria-expanded</b>: ${this.triggerElement.expanded}<br>
      <b>remember</b>: ${this.triggerElement.remember}<br>
    `
    let content = this.triggerElement.viewStack
      .reverse()
      .map((view, index) => {
        return this.triggerElement.sharedViews.includes(view)
          ? `<div slot="content">${index + 1}. ${view}</div>`
          : `<div slot="content-bottom">${index + 1}. ${view}</div>`
      }, this)
      .join('')

    content = `
      <div slot="content-top">
        <svg xmlns="http://www.w3.org/2000/svg" style="display:inline-block;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        <b>View Stack</b>
      </div>
      ${content}
    `

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
        middleLabel: 'renders & morphs',
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
