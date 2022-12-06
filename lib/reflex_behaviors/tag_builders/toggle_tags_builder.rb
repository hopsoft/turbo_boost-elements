# frozen_string_literal: true

require_relative "base_tag_builder"

module ReflexBehaviors::TagBuilders
  class ToggleTagsBuilder < BaseTagBuilder
    def trigger_tag(target:, render:, action: :toggle, disabled: false, **kwargs, &block)
      kwargs = kwargs.with_indifferent_access
      kwargs[:id] ||= "#{target}-toggle-trigger"

      kwargs[:aria] ||= {}
      kwargs[:aria][:atomic] ||= true
      kwargs[:aria][:relevant] ||= "all"
      kwargs[:aria].merge!(controls: target, expanded: target_expanded?(target))

      kwargs[:data] ||= {}
      kwargs[:data][:auto_collapse] = !!kwargs[:data][:auto_collapse]
      kwargs[:data][:view_stack] = view_stack.to_json if Rails.env.development?
      kwargs[:data][:remember] = !!kwargs[:data][:remember]
      kwargs[:data][:render] = render
      kwargs[:data][:turbo_reflex] = "ReflexBehaviors::ToggleReflex##{action}" unless disabled

      content_tag("toggle-trigger", nil, kwargs, &block)
    end

    def target_tag(id, expanded: false, **kwargs, &block)
      kwargs = kwargs.with_indifferent_access
      kwargs[:id] = id
      kwargs[:role] = "region"

      kwargs[:aria] ||= {}
      kwargs[:aria][:label] ||= "Dynamic Content Region"
      kwargs[:aria][:live] ||= "polite"

      kwargs[:data] ||= {}
      kwargs[:data][:view_stack] = view_stack.to_json if Rails.env.development?

      if expanded || target_expanded?(id)
        content_tag("toggle-target", nil, kwargs, &block)
      else
        content_tag("toggle-target", nil, kwargs)
      end
    end

    def target_expanded?(target)
      !!turbo_reflex.state[target]
    end

    def target_collapsed?(target)
      !target_expanded?(target)
    end
  end
end
