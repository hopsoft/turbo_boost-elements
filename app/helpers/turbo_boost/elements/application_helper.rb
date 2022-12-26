# frozen_string_literal: true

require_relative "../../../../lib/turbo_boost/elements/tag_builders"

module TurboBoost::Elements::ApplicationHelper
  def current_partial_path
    path = nil
    prefix = "app/views/"
    start = 1
    while path.nil? && start < 100
      location = caller_locations(start, 1).first
      path = location.path if location.path.include?(prefix)
      start += 1
    end
    return "unknown" if path.nil?
    path[(path.index(prefix) + prefix.length), path.rindex("/")]
  end

  def method_missing(name, ...)
    prefixes = %w[toggle_]
    prefixes.each do |prefix|
      next unless name.start_with?(prefix)
      return send("#{prefix}tag_builder").public_send(name.to_s.delete_prefix(prefix), ...)
    end
    super
  end

  def respond_to_missing?(name, ...)
    prefixes = %w[toggle_]
    prefixes.each do |prefix|
      next unless name.start_with?(prefix)
      return send("#{prefix}tag_builder").respond_to_missing?(name.to_s.delete_prefix(prefix), ...)
    end
    super
  end

  private

  def toggle_tag_builder
    @toggle_tag_builder ||= TurboBoost::Elements::TagBuilders::ToggleTagsBuilder.new(self)
  end
end
