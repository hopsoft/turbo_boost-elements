# frozen_string_literal: true

class TurboBoost::Elements::ToggleCommand < TurboBoost::Elements::ApplicationCommand
  prevent_controller_action

  def show
    if element.remember == "true"
      state[element.aria.controls] = true
    else
      state.now[element.aria.controls] = true
    end

    morph render(element.render_options), id: element.morphs
  end

  def hide
    state[element.aria.controls] = false
    morph render(element.render_options), id: element.morphs
  end

  def toggle
    element.aria.expanded? ? hide : show
  end
end
