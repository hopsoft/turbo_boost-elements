# frozen_string_literal: true

class TurboBoost::Elements::ToggleCommand < TurboBoost::Elements::ApplicationCommand
  prevent_controller_action

  def show
    if element.remember?
      state[element.aria.controls] = true
    else
      state.now[element.aria.controls] = true
    end

    morph id: element.morphs, html: render(element.render_options)
  end

  def hide
    state[element.aria.controls] = false
    morph id: element.morphs, html: render(element.render_options)
  end

  def toggle
    element.aria.expanded? ? hide : show
  end
end
