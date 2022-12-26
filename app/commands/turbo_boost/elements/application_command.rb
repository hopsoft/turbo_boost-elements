# frozen_string_literal: true

class TurboBoost::Elements::ApplicationCommand < TurboBoost::Commands::Command
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
