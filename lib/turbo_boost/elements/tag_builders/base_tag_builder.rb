# frozen_string_literal: true

class TurboBoost::Elements::TagBuilders::BaseTagBuilder
  attr_reader :view_context
  delegate :content_tag, :turbo_boost, to: :view_context

  def initialize(view_context)
    @view_context = view_context
  end

  def view_stack
    prefix = "app/views/"
    locations = caller_locations.select { |location| location.path.include?(prefix) }
    locations.each_with_object(Set.new) do |location, memo|
      memo << location.path[(location.path.index(prefix) + prefix.length)..]
    end
  end
end
