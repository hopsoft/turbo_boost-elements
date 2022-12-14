# frozen_string_literal: true

class ReflexBehaviors::ToggleReflex < ReflexBehaviors::ApplicationReflex
  prevent_controller_action

  def show
    if element.remember == "true"
      state[element.aria.controls] = true
    else
      state.now[element.aria.controls] = true
    end

    morph "##{element.morphs}", render(render_payload)
  end

  def hide
    state[element.aria.controls] = false
    morph "##{element.morphs}", render(render_payload)
  end

  def toggle
    element.aria.expanded? ? hide : show
  end
end
