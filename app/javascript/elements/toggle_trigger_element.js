import ReflexElement from './reflex_element'

export default class ToggleTriggerElement extends ReflexElement {
  collapse () {
    try {
      this.target.remove()
      this.setAttribute('aria-expanded', false)
    } catch (error) {
      console.error('Failed to collapse toggle-trigger target!', error)
    }
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
    const selector =
      'toggle-trigger[aria-controls][aria-expanded="true"][data-auto-collapse="true"]'
    document.querySelectorAll(selector).forEach(trigger => trigger.collapse())
  })
})
