# frozen_string_literal: true

require_relative "base_tag_builder"

class TurboBoost::Elements::TagBuilders::ToggleTagsBuilder < TurboBoost::Elements::TagBuilders::BaseTagBuilder
  def busy_tag(**kwargs, &block)
    options = kwargs.select { |_, value| value.present? }
    options.transform_keys!(&:dasherize)
    view_context.tag.public_send(:"turbo-boost", options, &block)
  end

  def trigger_tag(
    renders:, # REQUIRED, the partial path to render
    morphs:, # REQUIRED, `dom_id` of the partial's outermost containing element
    controls:, # REQUIRED, `dom_id` of the toggle target
    collapse_selector: nil, # CSS selector for other matching targets to collapse when the target is expanded
    focus_selector: nil, # CSS selector for the element to focus when the target is expanded
    method: :toggle, # method to inovke (:show, :hide, :toggle)
    disabled: false, # disable the trigger
    remember: false, # remember ephemeral UI state between requests
    **kwargs, # generic support for additional element attributes like `class` etc.
    &block # a Ruby block that emits this trigger's content
  )
    kwargs = kwargs.with_indifferent_access
    kwargs[:id] ||= "#{controls}-toggle-trigger"

    # command
    kwargs[:data] ||= {}
    kwargs[:data][:turbo_command] = "TurboBoost::Elements::ToggleCommand##{method}" unless disabled

    # aria
    kwargs[:aria] ||= {}
    kwargs[:aria][:controls] = controls # toggle target
    kwargs[:aria][:expanded] = target_expanded?(controls)
    kwargs[:aria][:atomic] ||= true
    kwargs[:aria][:relevant] ||= "all"

    # rendering
    kwargs[:renders] = renders
    kwargs[:morphs] = morphs
    kwargs[:view_stack] = view_stack.to_json if Rails.env.development?

    # misc
    kwargs[:collapse_selector] = collapse_selector
    kwargs[:focus_selector] = focus_selector
    kwargs[:remember] = !!remember

    options = kwargs.select { |_, value| value.present? }
    options.transform_keys!(&:dasherize)

    tag.public_send(:"turbo-boost-toggle-trigger", **options, &block)
  end

  def target_tag(
    id, # REQUIRED, the `dom_id` for the element
    collapse_on: [], # list of events that will collapse this target
    collapse_selector: nil, # CSS selector for other matching targets to collapse when this target is expanded
    expanded: false, # override to force expansion
    focus_selector: nil, # CSS selector for the element to focus when this target is expanded
    **kwargs, # generic support for additional element attributes like `class` etc.
    &block # a Ruby block that emits this target's content
  )
    kwargs = kwargs.with_indifferent_access
    kwargs[:id] = id
    kwargs[:collapse_on] = collapse_on.to_json if collapse_on.present?
    kwargs[:collapse_selector] = collapse_selector
    kwargs[:focus_selector] = focus_selector
    kwargs[:role] = "region"

    # aria
    kwargs[:aria] ||= {}
    kwargs[:aria][:live] ||= "polite"

    # rendering
    kwargs[:view_stack] = view_stack.to_json if Rails.env.development?

    options = kwargs.select { |_, value| value.present? }
    options.transform_keys!(&:dasherize)

    if expanded || target_expanded?(id)
      tag.public_send(:"turbo-boost-toggle-target", **options, &block)
    else
      tag.public_send(:"turbo-boost-toggle-target", **options) {}
    end
  end

  def target_expanded?(dom_id)
    !!controller_pack.state[dom_id]
  end

  def target_collapsed?(dom_id)
    !target_expanded?(dom_id)
  end
end
