# frozen_string_literal: true

class ReflexBehaviors::ToggleReflex < ReflexBehaviors::ApplicationReflex
  prevent_controller_action

  def show
    if element.remember == "true"
      state[element.aria.controls] = true
    else
      state.now[element.aria.controls] = true
    end

    morph "##{render_payload[:id]}", render(render_payload.except(:id))
  end

  def hide
    state[element.aria.controls] = false
    morph "##{render_payload[:id]}", render(render_payload.except(:id))
  end

  def toggle
    element.aria.expanded? ? hide : show
  end
end
