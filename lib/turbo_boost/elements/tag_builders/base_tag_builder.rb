# frozen_string_literal: true

class TurboBoost::Elements::TagBuilders::BaseTagBuilder
  attr_reader :controller_pack

  def initialize(view_context)
    @view_context = view_context
    @controller_pack = view_context.turbo_boost # TurboBoost::Commands::ControllerPack
  end

  def render_tag(name, loading: :eager, **kwargs, &block)
    options = kwargs.select { |_, value| value.present? }
    options.transform_keys! { |key| key.to_s.dasherize }

    loading = :eager unless loading == :lazy
    if loading == :eager
      view_context.tag.public_send(name.to_sym, **options, &block)
    else
      view_context.tag.public_send(name.to_sym, **options) {}
    end
  end

  def view_stack
    prefix = "app/views/"
    locations = caller_locations.select { |location| location.path.include?(prefix) }
    locations.each_with_object(Set.new) do |location, memo|
      memo << location.path[(location.path.index(prefix) + prefix.length)..]
    end
  end

  protected

  attr_reader :view_context
end
