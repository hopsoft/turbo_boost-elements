# frozen_string_literal: true

require ReflexBehaviors::Engine.root.join("lib/reflex_behaviors/tag_builders")

module ReflexBehaviors::ApplicationHelper
  def friendly_partial_path(partial_path = nil, start: 1)
    prefix = "app/views/"
    partial_path ||= caller_locations(start, 1).first.path
    partial_path = partial_path.split(prefix).last if partial_path.include?(prefix)
    partial_path[0, partial_path.index(".") || partial_path.length].gsub(/\/_/, "/")
  end

  def current_partial_path
    friendly_partial_path start: 2
  end

  def reflex_render(**kwargs)
    kwargs[:assigns] ||= {}
    kwargs[:assigns].each { |key, val| kwargs[:assigns][key] = transportable_value(val) }
    kwargs[:locals] ||= {}
    kwargs[:locals].each { |key, val| kwargs[:locals][key] = transportable_value(val) }
    kwargs.to_json
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
    @toggle_tag_builder ||= ReflexBehaviors::TagBuilders::ToggleTagsBuilder.new(self)
  end

  def transportable_value(value)
    return value.to_s unless value.respond_to?(:to_sgid_param)
    value.try(:persisted?) ? value.to_sgid_param : nil
  end
end
