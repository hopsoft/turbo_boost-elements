# frozen_string_literal: true

# Reflexes are executed via a before_action in the Rails controller lifecycle.
# They have access to the following methods and properties.
#
# * dom_id ...................... The Rails dom_id helper
# * dom_id_selector ............. Returns a CSS selector for a dom_id
# * controller .................. The Rails controller processing the HTTP request
# * element ..................... A struct that represents the DOM element that triggered the reflex
# * morph ....................... Appends a Turbo Stream to morph a DOM element
# * params ...................... Reflex specific params (frame_id, element, etc.)
# * render ...................... Renders Rails templates, partials, etc. (doesn't halt controller request handling)
# * render_response ............. Renders a full controller response
# * renderer .................... An ActionController::Renderer
# * prevent_controller_action ... Prevents the rails controller/action from running (i.e. the reflex handles the response entirely)
# * turbo_stream ................ A Turbo Stream TagBuilder
# * turbo_streams ............... A list of Turbo Streams to append to the response (also aliased as streams)
# * state ....................... An object that stores ephemeral `state`
#
class ReflexBehaviors::ApplicationReflex < TurboReflex::Base
  protected

  def render_payload
    return {} if element.renders.blank?
    @render_payload ||= {partial: idomatic_partial_path(element.renders)}.tap do |payload|
      if element.assigns.present?
        payload[:assigns] = JSON.parse(element.assigns)
        payload[:assigns].each { |key, value| payload[:assigns][key] = hydrate_value(value) }
      end
      if element.locals.present?
        payload[:locals] = JSON.parse(element.locals)
        payload[:locals].each { |key, value| payload[:locals][key] = hydrate_value(value) }
      end
    end.deep_symbolize_keys
  end

  private

  def hydrate_value(value)
    hydrated = begin
      GlobalID::Locator.locate_signed(value)
    rescue
      value
    end
    hydrated.blank? ? nil : hydrated
  end

  def idomatic_partial_path(partial_path)
    partial_path.to_s.gsub("/_", "/").split(".").first
  end
end
