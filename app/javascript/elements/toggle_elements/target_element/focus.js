function deactivateTrixAttributes (editor) {
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
  if (element.value.length === 0) return

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
  deactivateTrixAttributes(editor)

  // move cursor to end and collapse the selection
  editor.setSelectedRange([
    editor.getSelectedRange()[1],
    editor.getSelectedRange()[1]
  ])
}

function shouldEnhanceFocus (element) {
  if (!element.tagName.match(/^input|textarea|trix-editor$/i)) return false
  const toggleTargetElement = element.closest('turbo-boost-toggle-target') || {}
  return !!toggleTargetElement.focusElement
}

function enhanceFocus (element) {
  const trixEditorElement = element.closest('trix-editor')

  try {
    if (trixEditorElement) {
      focusTrixEditorElement(trixEditorElement)
    } else {
      element.selectionStart = element.selectionEnd = element.value.length
    }
  } catch (_) {
  } finally {
    setTimeout(
      () => element.scrollIntoView({ block: 'center', behavior: 'smooth' }),
      100
    )
  }
}

addEventListener(
  'focus',
  event => {
    if (shouldEnhanceFocus(document.activeElement))
      enhanceFocus(document.activeElement)
  },
  true
)
