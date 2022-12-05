export default class DevtoolElement extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = this.html
    this.labelElement.addEventListener('click', event => {
      event.preventDefault()
      this.toggle()
    })
    this.checkboxElement.addEventListener('change', event =>
      this.dispatchEvent(new CustomEvent('change', { bubbles: true }))
    )
  }

  toggle () {
    this.checked ? this.uncheck() : this.check()
  }

  check () {
    this.checkboxElement.checked = true
    this.dispatchEvent(new CustomEvent('change', { bubbles: true }))
  }

  uncheck () {
    this.checkboxElement.checked = false
    this.dispatchEvent(new CustomEvent('change', { bubbles: true }))
  }

  get name () {
    return this.getAttribute('name')
  }

  get checked () {
    return this.checkboxElement.checked
  }

  get checkboxElement () {
    return this.shadowRoot.querySelector('input')
  }

  get labelElement () {
    return this.shadowRoot.querySelector('label')
  }

  get html () {
    return `
      <style>${this.stylesheet}</style>
      <div>
        <input name="checkbox" type="checkbox">
        <label for="checkbox"><slot name="label"></slot></label>
      </div>
    `
  }

  get stylesheet () {
    return `
      div {
        display: flex;
      }
    `
  }
}
