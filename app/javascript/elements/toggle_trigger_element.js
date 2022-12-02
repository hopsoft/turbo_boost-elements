import ReflexElement from './reflex_element'
import devtools from '../devtools'

export default class ToggleTriggerElement extends ReflexElement {
  constructor () {
    super()

    this.addEventListener('mouseenter', event => {
      if (devtools.isEnabled('toggle')) {
        clearTimeout(this.mouseLeaveTimeout)
        event.target.target.classList.add('debug')
        event.target.showDebugTooltips()
      }
    })

    this.addEventListener('mouseleave', event => {
      if (devtools.isEnabled('toggle')) {
        clearTimeout(this.mouseLeaveTimeout)
        this.mouseLeaveTimeout = setTimeout(() => {
          event.target.target.classList.remove('debug')
          document
            .querySelectorAll('.reflex-behaviors-tooltip')
            .forEach(tooltip => tooltip.remove())
        }, 250)
      }
    })
  }

  showDebugTooltips () {
    const sharedViewPath = this.sharedViewPath
    let shared = false
    let title = `controls: ${this.controls}`
    let body = this.viewStack.map(path => {
      shared = shared || path === sharedViewPath
      return `<div class='${shared ? 'shared' : null}'>${path}<div>`
    })
    devtools.tooltip(this, title, body.join(''), 'trigger', 'top')

    shared = false
    title = `id: ${this.target.id}`
    body = this.target.viewStack.map(path => {
      shared = shared || path === sharedViewPath
      return `<div class='${shared ? 'shared' : null}'>${path}<div>`
    })
    devtools.tooltip(this.target, title, body.join(''), 'target', 'bottom')
  }

  collapse () {
    try {
      this.target.remove()
      this.setAttribute('aria-expanded', false)
    } catch (error) {
      console.error('Failed to collapse toggle-trigger target!', error)
    }
  }

  get sharedViewPath () {
    const targetViewStack = this.target.viewStack
    return this.viewStack.find(path => targetViewStack.includes(path))
  }

  get controls () {
    return this.getAttribute('aria-controls')
  }

  get expanded () {
    return this.getAttribute('aria-expanded') === 'true'
  }

  get target () {
    return document.getElementById(this.controls)
  }

  get active () {
    return this.getAttribute('data-active') === 'true'
  }

  set active (value) {
    this.setAttribute('data-active', !!value)
  }
}

addEventListener(
  TurboReflex.events.start,
  event => (event.target.active = true)
)
addEventListener(
  TurboReflex.events.success,
  event => (event.target.active = false)
)
addEventListener(
  TurboReflex.events.finish,
  event => (event.target.active = false)
)

addEventListener('click', event => {
  setTimeout(() => {
    document
      .querySelectorAll(
        'toggle-trigger[aria-controls][aria-expanded="true"][data-auto-collapse="true"]'
      )
      .forEach(trigger => trigger.collapse())
  })
})
