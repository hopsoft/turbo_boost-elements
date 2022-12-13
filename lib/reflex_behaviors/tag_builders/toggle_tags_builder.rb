# frozen_string_literal: true

require_relative "base_tag_builder"

module ReflexBehaviors::TagBuilders
  class ToggleTagsBuilder < BaseTagBuilder
    def trigger_tag(target:, render:, action: :toggle, disabled: false, **kwargs, &block)
      kwargs = kwargs.with_indifferent_access
      kwargs[:id] ||= "#{target}-toggle-trigger"

      kwargs[:data] ||= {}
      kwargs[:data][:turbo_reflex] = "ReflexBehaviors::ToggleReflex##{action}" unless disabled

      kwargs[:aria] ||= {}
      kwargs[:aria][:atomic] ||= true
      kwargs[:aria][:controls] = target
      kwargs[:aria][:expanded] = target_expanded?(target)
      kwargs[:aria][:relevant] ||= "all"

      kwargs[:auto_collapse] = !!kwargs[:auto_collapse]
      kwargs[:remember] = !!kwargs[:remember]
      kwargs[:render] = render
      kwargs[:view_stack] = view_stack.to_json if Rails.env.development?

      kwargs.transform_keys!(&:dasherize)
      content_tag("toggle-trigger", nil, kwargs, &block)
    end

    def target_tag(id, expanded: false, **kwargs, &block)
      kwargs = kwargs.with_indifferent_access
      kwargs[:id] = id
      kwargs[:role] = "region"

      kwargs[:aria] ||= {}
      kwargs[:aria][:label] ||= "Dynamic Content Region"
      kwargs[:aria][:live] ||= "polite"

      kwargs[:view_stack] = view_stack.to_json if Rails.env.development?

      kwargs.transform_keys!(&:dasherize)
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
