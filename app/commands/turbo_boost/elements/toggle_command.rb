# frozen_string_literal: true

class TurboBoost::Elements::ToggleCommand < TurboBoost::Elements::ApplicationCommand
  prevent_controller_action

  def show
    return unless valid_element?

    if element.remember?
      state[element.aria.controls] = true
    else
      state.now[element.aria.controls] = true
    end

    morph id: element.morphs, html: render(element.render_options)
  end

  def hide
    return unless valid_element?
    state[element.aria.controls] = false
    morph id: element.morphs, html: render(element.render_options)
  end

  def toggle
    return unless valid_element?
    element.aria.expanded? ? hide : show
  end

  private

  def element_errors
    @element_errors ||= Set.new
  end

  def valid_element?
    valid = validate_element_attributes && validate_element_aria_attributes
    element_errors.each { |error| streams << turbo_stream.invoke("console.error", args: [error]) }
    valid
  end

  def validate_element_attributes
    case element
    in {renders: _, morphs: _} then return true
    in {renders: _} then element_errors << "The trigger element is missing the `morphs` attribute!"
    in {morphs: _} then element_errors << "The trigger element is missing the `renders` attribute!"
    else element_errors << "The trigger element is missing the `renders` and `moprhs` attributes!"
    end
    false
  end

  def validate_element_aria_attributes
    case element.aria
    in {controls: _, expanded: _} then return true
    in {controls: _} then element_errors << "The trigger element is missing the `aria-expanded` attribute!"
    in {expanded: _} then element_errors << "The trigger element is missing the `aria-controls` attribute!"
    else element_errors << "The trigger element is missing the `aria-controls` and `aria-expanded` attributes!"
    end
    false
  end
end
