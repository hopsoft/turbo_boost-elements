import ReflexElement from './reflex_element'

export default class ToggleTriggerElement extends ReflexElement {
  constructor () {
    super()

    this.addEventListener('mouseenter', event => {
      if (document.body.classList.contains('debug-toggles')) {
        clearTimeout(this.mouseLeaveTimeout)
        event.target.target.classList.add('debug')
        event.target.showDebugTooltips()
      }
    })

    this.addEventListener('mouseleave', event => {
      if (document.body.classList.contains('debug-toggles')) {
        clearTimeout(this.mouseLeaveTimeout)
        this.mouseLeaveTimeout = setTimeout(() => {
          event.target.target.classList.remove('debug')
          document
            .querySelectorAll('.reflex-behavior-tooltip')
            .forEach(tooltip => tooltip.remove())
        }, 300)
      }
    })
  }

  showDebugTooltips () {
    const triggerCoords = this.coordinates
    const targetCoords = this.target.coordinates
    const sharedViewPath = this.sharedViewPath

    let shared = false
    let tooltip = document.createElement('div')
    tooltip.classList.add('reflex-behavior-tooltip', 'trigger')
    let html = `<strong>controls: ${this.controls}</strong><hr>`
    this.viewStack.forEach(path => {
      shared = shared || path === sharedViewPath
      html += `<div class='${shared ? 'shared' : null}'>${path}<div>`
    })
    tooltip.innerHTML = html
    document.body.appendChild(tooltip)
    tooltip.style.top = `${triggerCoords.top - tooltip.offsetHeight - 5}px`
    tooltip.style.left = `${triggerCoords.left + 4}px`

    shared = false
    tooltip = document.createElement('div')
    tooltip.classList.add('reflex-behavior-tooltip', 'target')
    html = `<strong>id: ${this.target.id}</strong><hr>`
    this.target.viewStack.forEach(path => {
      shared = shared || path === sharedViewPath
      html += `<div class='${shared ? 'shared' : null}'>${path}<div>`
    })
    tooltip.innerHTML = html
    document.body.appendChild(tooltip)
    tooltip.style.top = `${targetCoords.top + targetCoords.height + 5}px`
    tooltip.style.left = `${targetCoords.left + 4}px`
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
    document
      .querySelectorAll('.reflex-behavior-tooltip')
      .forEach(tooltip => tooltip.remove())
  }, 250)
})
