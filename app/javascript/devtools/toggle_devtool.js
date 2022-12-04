import devtools from './index'

function removeTooltips () {
  const ids = ['toggle-trigger-tooltip', 'toggle-target-tooltip']
  ids.forEach(id => {
    const el = document.getElementById(id)
    if (el) el.remove()
  })
}

addEventListener('click', removeTooltips)

export default class ToggleDevtool {
  constructor (trigger) {
    this.name = 'toggle'
    this.trigger = trigger
  }

  show () {
    if (!devtools.isEnabled(this.name)) return
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
    const views = this.trigger.viewStack.map(view => {
      return this.trigger.sharedViews.includes(view)
        ? `<div slot="emphasis">${view}</div>`
        : `<div slot="normal">${view}</div>`
    }, this)

    this.trigger.appendHTML(`
      <reflex-tooltip id="toggle-trigger-tooltip" background-color="salmon" color="white" emphasis-color="darkred">
        <div slot='title'>targets: ${this.trigger.controls}</div>
        ${views.join('')}
      </reflex-tooltip>
    `)

    this.triggerTooltip = document.getElementById('toggle-trigger-tooltip')
    const coords = this.trigger.coordinates
    const top = Math.ceil(coords.top - this.triggerTooltip.offsetHeight - 5)
    const left = Math.ceil(coords.left)
    this.triggerTooltip.style.top = `${top}px`
    this.triggerTooltip.style.left = `${left}px`
  }

  createTargetTooltip () {
    if (!this.trigger.target) return

    const views = this.trigger.target.viewStack.map(view => {
      return this.trigger.sharedViews.includes(view)
        ? `<div slot="emphasis">${view}</div>`
        : `<div slot="normal">${view}</div>`
    }, this)

    this.trigger.appendHTML(`
      <reflex-tooltip id="toggle-target-tooltip" background-color="lightskyblue" color="white" emphasis-color="blue" position="bottom">
        <div slot='title'>id: ${this.trigger.target.id}</div>
        ${views.join('')}
      </reflex-tooltip>
    `)

    this.targetTooltip = document.getElementById('toggle-target-tooltip')
    const coords = this.trigger.target.coordinates
    const top = Math.ceil(coords.top + coords.height + 4)
    const left = Math.ceil(coords.left)
    this.targetTooltip.style.top = `${top}px`
    this.targetTooltip.style.left = `${left}px`
  }
}
