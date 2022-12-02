# frozen_string_literal: true

require_relative "version"

module ReflexBehaviors
  def self.config
    Rails.application.config.reflex_behaviors
  end

  class Engine < ::Rails::Engine
    config.assets.precompile << "reflex_behaviors_manifest.js"
    config.reflex_behaviors = ActiveSupport::OrderedOptions.new

    ActiveSupport.on_load(:action_controller) do
      try :helper, ReflexBehaviors::ApplicationHelper
    end
  end
end
