# frozen_string_literal: true

require_relative "lib/turbo_boost/elements/version"

Gem::Specification.new do |s|
  s.name = "turbo_boost-elements"
  s.version = TurboBoost::Elements::VERSION
  s.authors = ["Nate Hopkins (hopsoft)"]
  s.email = ["natehop@gmail.com"]
  s.homepage = "https://github.com/hopsoft/turbo_boost-elements"
  s.summary = "Pre-built easy to use reactive TurboBoost elements for Rails/Hotwire apps."
  s.description = s.summary
  s.license = "MIT"

  s.metadata["homepage_uri"] = s.homepage
  s.metadata["source_code_uri"] = s.homepage
  s.metadata["changelog_uri"] = s.homepage + "/blob/main/CHANGELOG.md"

  s.files = Dir["{app,lib}/**/*", "MIT-LICENSE", "README.md"]

  s.required_ruby_version = ">= 2.7.3"

  s.add_dependency "rails", ">= 6.1"
  s.add_dependency "turbo-rails", ">= 1.1"
  s.add_dependency "turbo_boost-commands", ">= 0.0.9"

  s.add_development_dependency "magic_frozen_string_literal"
  s.add_development_dependency "minitest-reporters"
  s.add_development_dependency "pry-byebug"
  s.add_development_dependency "rake"
  s.add_development_dependency "standardrb"
end
