# frozen_string_literal: true

require "turbo_reflex"
require_relative "version"
require_relative "../../app/helpers/reflex_behaviors/application_helper"

module ReflexBehaviors
  def self.config
    Rails.application.config.reflex_behaviors
  end

  class Engine < ::Rails::Engine
    config.reflex_behaviors = ActiveSupport::OrderedOptions.new

    ActiveSupport.on_load(:action_controller) do
      try :helper, ReflexBehaviors::ApplicationHelper
    end
  end
end
