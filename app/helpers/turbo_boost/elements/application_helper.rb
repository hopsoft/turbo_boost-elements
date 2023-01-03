# frozen_string_literal: true

require_relative "../../../../lib/turbo_boost/elements/tag_builders"

module TurboBoost::Elements::ApplicationHelper
  # Returns an idiomatic path for the currently rendering template
  # i.e. How you'd pass the path to a `render partial: ...` call
  def current_partial_path
    @virtual_path.to_s.gsub("/_", "/")
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
