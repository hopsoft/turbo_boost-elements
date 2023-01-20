# frozen_string_literal: true

class TurboBoost::Elements::ToggleCommand < TurboBoost::Elements::ApplicationCommand
  prevent_controller_action

  def show
    sleep 2 # TODO: remove fake latency
    validate_element!

    if element.remember?
      state[element.aria.controls] = true
    else
      state.now[element.aria.controls] = true
    end

    morph id: element.morphs, html: render(element.render_options)
  end

  def hide
    sleep 2 # TODO: remove fake latency
    validate_element!
    state[element.aria.controls] = false
    morph id: element.morphs, html: render(element.render_options)
  end

  def toggle
    element.aria.expanded? ? hide : show
  end

  private

  def validate_element!
    validate_element_attributes! && validate_element_aria_attributes!
  end

  def validate_element_attributes!
    case element
    in {renders: _, morphs: _} then return true
    in {renders: _} then raise TurboBoost::Commands::InvalidElementError, "The trigger element is missing the `morphs` attribute!"
    in {morphs: _} then raise TurboBoost::Commands::InvalidElementError, "The trigger element is missing the `renders` attribute!"
    else raise TurboBoost::Commands::InvalidCommandError, "The trigger element is missing the `renders` and `moprhs` attributes!"
    end
    false
  end

  def validate_element_aria_attributes!
    case element.aria
    in {controls: _, expanded: _} then return true
    in {controls: _} then raise TurboBoost::Commands::InvalidElementError, "The trigger element is missing the `aria-expanded` attribute!"
    in {expanded: _} then raise TurboBoost::Commands::InvalidElementError, "The trigger element is missing the `aria-controls` attribute!"
    else raise TurboBoost::Commands::InvalidElementError, "The trigger element is missing the `aria-controls` and `aria-expanded` attributes!"
    end
    false
  end
end
