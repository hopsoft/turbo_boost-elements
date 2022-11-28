# frozen_string_literal: true

require_relative "base_tag_builder"

module ReflexBehaviors::TagBuilders
  class ToggleTagsBuilder < BaseTagBuilder
    def target_tag(id, expanded: false, **kwargs, &block)
      return unless expanded || target_expanded?(id)

      kwargs = kwargs.with_indifferent_access
      kwargs[:id] = id
      kwargs[:role] = "region"
      kwargs[:aria] ||= {}
      kwargs[:aria] = target_aria(**kwargs[:aria])

      content_tag("toggle-target", nil, kwargs, &block)
    end

    def trigger_tag(target:, render:, disabled: false, aria: {}, data: {remember: false, auto_collapse: false}, **kwargs, &block)
      kwargs = kwargs.with_indifferent_access
      kwargs[:id] ||= "#{target}-toggle-trigger"
      kwargs[:aria] = trigger_aria(controls: target, expanded: target_expanded?(target), **aria)
      kwargs[:data] = trigger_data(render: render, disabled: disabled, **data)

      content_tag("toggle-trigger", nil, kwargs, &block)
    end

    def target_expanded?(target)
      !!turbo_reflex.state[target]
    end

    def target_collapsed?(target)
      !target_expanded?(target)
    end

    private

    def trigger_aria(controls:, expanded:, **kwargs)
      kwargs = kwargs.with_indifferent_access
      kwargs[:atomic] ||= true
      kwargs[:relevant] ||= "all"
      kwargs.merge(controls: controls, expanded: !!expanded)
    end

    def trigger_data(render:, disabled: false, remember: false, auto_collapse: false, **kwargs)
      kwargs = kwargs.with_indifferent_access
      kwargs.merge(
        turbo_reflex: disabled ? nil : "ReflexBehaviors::ToggleReflex#toggle",
        render: render,
        remember: !!remember,
        auto_collapse: !!auto_collapse
      )
    end

    def target_aria(**kwargs)
      kwargs = kwargs.with_indifferent_access
      kwargs[:label] ||= "Dynamic Content Region"
      kwargs[:live] ||= "polite"
      kwargs
    end
  end
end
