# frozen_string_literal: true

require "turbo_boost/commands"
require_relative "version"
require_relative "../../../app/helpers/turbo_boost/elements/application_helper"

module TurboBoost::Elements
  def self.config
    Rails.application.config.turbo_boost_elements
  end

  class Engine < ::Rails::Engine
    isolate_namespace TurboBoost::Elements

    config.turbo_boost_elements = ActiveSupport::OrderedOptions.new
    config.turbo_boost_elements.precompile_assets = true

    ActiveSupport.on_load(:action_controller_base) do
      # `self` is ActionController::Base
      helper TurboBoost::Elements::ApplicationHelper
    end

    config.after_initialize do |app|
      if app.config.respond_to?(:assets) && app.config.turbo_boost_elements.precompile_assets
        app.config.assets.precompile += %w[@turbo-boost/elements.js]
      end
    end
  end
end
