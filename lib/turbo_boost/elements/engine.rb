# frozen_string_literal: true

require "turbo_boost-commands"
require_relative "version"
require_relative "../../../app/helpers/turbo_boost/elements/application_helper"

module TurboBoost::Elements
  def self.config
    Rails.application.config.turbo_boost_elements
  end

  class Engine < ::Rails::Engine
    config.turbo_boost_elements = ActiveSupport::OrderedOptions.new

    ActiveSupport.on_load(:action_controller) do
      try :helper, TurboBoost::Elements::ApplicationHelper
    end
  end
end
