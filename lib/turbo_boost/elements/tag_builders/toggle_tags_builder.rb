# frozen_string_literal: true

require_relative "base_tag_builder"

class TurboBoost::Elements::TagBuilders::ToggleTagsBuilder < BaseTagBuilder
  def trigger_tag(
    renders:, # REQUIRED, the partial path to render
    morphs:, # REQUIRED, `dom_id` of the partial's outermost containing element
    controls:, # REQUIRED, `dom_id` of the toggle target
    assigns: {}, # `assigns` required to render the partial (i.e. instance variables)
    locals: {}, # `local_assigns` required to render the parital
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

    # target / aria
    kwargs[:aria] ||= {}
    kwargs[:aria][:controls] = controls
    kwargs[:aria][:expanded] = target_expanded?(controls)
    kwargs[:aria][:atomic] ||= true
    kwargs[:aria][:relevant] ||= "all"

    # rendering
    kwargs[:renders] = renders
    kwargs[:morphs] = morphs
    kwargs[:assigns] = dehydrate_hash(assigns).compact.to_json if assigns.present?
    kwargs[:locals] = dehydrate_hash(locals).compact.to_json if locals.present?
    kwargs[:view_stack] = view_stack.to_json if Rails.env.development?

    # misc
    kwargs[:collapse_selector] = collapse_selector
    kwargs[:focus_selector] = focus_selector
    kwargs[:remember] = !!remember

    args = kwargs.select { |_, value| value.present? }
    content_tag("turbo-boost-toggle-trigger", nil, args.transform_keys(&:dasherize), &block)
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

    args = kwargs.select { |_, value| value.present? }
    if expanded || target_expanded?(id)
      content_tag("turbo-boost-toggle-target", nil, args.transform_keys!(&:dasherize), &block)
    else
      content_tag("turbo-boost-toggle-target", nil, args.transform_keys!(&:dasherize))
    end
  end

  def target_expanded?(dom_id)
    !!turbo_boost.state[dom_id]
  end

  def target_collapsed?(dom_id)
    !target_expanded?(dom_id)
  end
end
