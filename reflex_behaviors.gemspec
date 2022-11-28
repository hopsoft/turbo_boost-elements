# frozen_string_literal: true

require_relative "lib/reflex_behaviors/version"

Gem::Specification.new do |s|
  s.name = "reflex_behaviors"
  s.version = ReflexBehaviors::VERSION
  s.authors = ["Nate Hopkins (hopsoft)"]
  s.email = ["natehop@gmail.com"]
  s.homepage = "https://github.com/hopsoft/reflex_behaviors"
  s.summary = "Pre-built easy to use reactive TurboReflex behaviors for Rails/Hotwire apps."
  s.description = s.summary
  s.license = "MIT"

  s.metadata["homepage_uri"] = s.homepage
  s.metadata["source_code_uri"] = s.homepage
  s.metadata["changelog_uri"] = s.homepage + "/blob/master/CHANGELOG.md"

  s.files = Dir["lib/**/*.rb", "app/**/*", "bin/*", "[A-Z]*"]

  s.required_ruby_version = ">= 2.7.3"

  s.add_dependency "rails", ">= 6.1"
  s.add_dependency "turbo-rails", ">= 1.1"
  s.add_dependency "turbo_ready", ">= 0.1.2"
  s.add_dependency "turbo_reflex", ">= 0.0.28"

  s.add_development_dependency "magic_frozen_string_literal"
  s.add_development_dependency "minitest-reporters"
  s.add_development_dependency "pry-byebug"
  s.add_development_dependency "rake"
  s.add_development_dependency "standardrb"
end
