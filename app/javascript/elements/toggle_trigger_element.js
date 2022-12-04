import ReflexElement from './reflex_element'
import ToggleDevtool from '../devtools/toggle'

//highlightRenderTarget () {
//  const { id, partial } = this.renderPayload
//  if (!id) return
//  const element = document.getElementById(id)
//  if (!element) return
//  element.dataset.partial = partial
//  element.classList.add('debug', 'toggle')
//}

export default class ToggleTriggerElement extends ReflexElement {
  connectedCallback () {
    super.connectedCallback()

    const mouseenter = () => this.devtool.show()
    const mouseleave = () => this.devtool.hide()

    document.addEventListener('reflex-behaviors:devtools-start', () => {
      this.devtool = new ToggleDevtool(this)
      this.addEventListener('mouseenter', mouseenter)
      this.addEventListener('mouseleave', mouseleave)
    })

    document.addEventListener('reflex-behaviors:devtools-stop', () => {
      this.removeEventListener('mouseenter', mouseenter)
      this.removeEventListener('mouseleave', mouseleave)
      delete this.devtool
    })
  }

  collapse () {
    try {
      this.target.remove()
      this.setAttribute('aria-expanded', false)
    } catch (error) {
      console.error('Failed to collapse toggle-trigger target!', error)
    }
  }

  get sharedViews () {
    if (!this.target) return []
    const reducer = (memo, view) => {
      if (this.target.viewStack.includes(view)) memo.push(view)
      return memo
    }
    return this.viewStack.reduce(reducer.bind(this), [])
  }

  get renderPayload () {
    if (!this.dataset.render) return {}
    return JSON.parse(this.dataset.render)
  }

  get expanded () {
    return this.getAttribute('aria-expanded') === 'true'
  }

  get controls () {
    return this.getAttribute('aria-controls')
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
