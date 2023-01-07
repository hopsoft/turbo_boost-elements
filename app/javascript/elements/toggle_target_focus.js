function deactivateAllAttributes (editor) {
  const attributes = [
    'bold',
    'bullet',
    'code',
    'heading1',
    'href',
    'italic',
    'number',
    'quote',
    'strike'
  ]
  attributes.forEach(name => editor.deactivateAttribute(name))
}

function focusTrixEditorElement (element) {
  if (element.value.length === 0) return element.focus()

  const editor = element.editor

  // move cursor to the end
  let lastRange = []
  while (
    lastRange[0] !== editor.getSelectedRange()[0] &&
    lastRange[1] !== editor.getSelectedRange()[1]
  ) {
    lastRange = editor.getSelectedRange()
    editor.moveCursorInDirection('forward')
  }

  // insert an empty char and select it
  editor.insertString(' ')
  editor.moveCursorInDirection('forward')
  editor.setSelectedRange([lastRange[1], editor.getSelectedRange()[1]])

  // deactivate all trix features for the selection
  deactivateAllAttributes(editor)

  // move cursor to end and collapse the selection
  editor.setSelectedRange([
    editor.getSelectedRange()[1],
    editor.getSelectedRange()[1]
  ])
}

function shouldRefocus (element) {
  return (
    element.closest('turbo-boost-toggle-target') &&
    element.tagName.match(/^input|textarea|trix-editor$/i)
  )
}

function refocus (element) {
  const trixEditorElement = element.closest('trix-editor')

  try {
    if (trixEditorElement) {
      focusTrixEditorElement(trixEditorElement)
    } else {
      element.focus()
      element.selectionStart = element.selectionEnd = element.value.length
    }
  } finally {
    setTimeout(
      () => element.scrollIntoView({ block: 'center', behavior: 'smooth' }),
      100
    )
  }
}

let refocusing = false
addEventListener(
  'focus',
  event => {
    if (refocusing) return
    refocusing = true

    try {
      if (shouldRefocus(document.activeElement)) {
        event.preventDefault()
        refocus(document.activeElement)
      }
    } finally {
      refocusing = false
    }
  },
  true
)
