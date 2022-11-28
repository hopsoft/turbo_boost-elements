# frozen_string_literal: true

module ReflexBehaviors
  module TagBuilders
    class BaseTagBuilder
      attr_reader :view_context
      delegate :content_tag, :turbo_reflex, to: :view_context

      def initialize(view_context)
        @view_context = view_context
      end
    end
  end
end
