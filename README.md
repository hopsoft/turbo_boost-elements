<p align="center">
  <h1 align="center">
    Welcome to Reflex Behaviors 👋
  </h1>
  <p align="center">
    <a href="http://blog.codinghorror.com/the-best-code-is-no-code-at-all/">
      <img alt="Lines of Code" src="https://img.shields.io/badge/loc-968-47d299.svg" />
    </a>
    <a href="https://codeclimate.com/github/hopsoft/reflex_behaviors/maintainability">
      <img src="https://api.codeclimate.com/v1/badges/7aac6daed3e4032e292e/maintainability" />
    </a>
    <a href="https://rubygems.org/gems/reflex_behaviors">
      <img alt="GEM Version" src="https://img.shields.io/gem/v/reflex_behaviors?color=168AFE&include_prereleases&logo=ruby&logoColor=FE1616">
    </a>
    <a href="https://rubygems.org/gems/reflex_behaviors">
      <img alt="GEM Downloads" src="https://img.shields.io/gem/dt/reflex_behaviors?color=168AFE&logo=ruby&logoColor=FE1616">
    </a>
    <a href="https://github.com/testdouble/standard">
      <img alt="Ruby Style" src="https://img.shields.io/badge/style-standard-168AFE?logo=ruby&logoColor=FE1616" />
    </a>
    <a href="https://www.npmjs.com/package/reflex_behaviors">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/reflex_behaviors?color=168AFE&logo=npm">
    </a>
    <a href="https://www.npmjs.com/package/reflex_behaviors">
      <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/reflex_behaviors?color=168AFE&logo=npm">
    </a>
    <a href="https://bundlephobia.com/package/reflex_behaviors@">
      <img alt="NPM Bundle Size" src="https://img.shields.io/bundlephobia/minzip/reflex_behaviors?label=bundle%20size&logo=npm&color=47d299">
    </a>
    <a href="https://github.com/sheerun/prettier-standard">
      <img alt="JavaScript Style" src="https://img.shields.io/badge/style-prettier--standard-168AFE?logo=javascript&logoColor=f4e137" />
    </a>
    <a href="https://github.com/hopsoft/reflex_behaviors/actions/workflows/tests.yml">
      <img alt="Tests" src="https://github.com/hopsoft/reflex_behaviors/actions/workflows/tests.yml/badge.svg" />
    </a>
    <a href="https://twitter.com/hopsoft">
      <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/hopsoft?logo=twitter&style=social">
    </a>
  </p>
</p>

Pre-built easy to use reactive TurboReflex behaviors for Rails/Hotwire apps.

<!-- Tocer[start]: Auto-generated, don't remove. -->

## Table of Contents

  - [Sponsors](#sponsors)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [Setup](#setup)
  - [Behaviors](#behaviors)
    - [Toggle](#toggle)
      - [Tag Helpers](#tag-helpers)
  - [Releasing](#releasing)
  - [License](#license)

<!-- Tocer[finish]: Auto-generated, don't remove. -->

## Sponsors

<p align="center">
  <em>Proudly sponsored by</em>
</p>
<p align="center">
  <a href="https://www.clickfunnels.com?utm_source=hopsoft&utm_medium=open-source&utm_campaign=reflex_behaviors">
    <img src="https://images.clickfunnel.com/uploads/digital_asset/file/176632/clickfunnels-dark-logo.svg" width="575" />
  </a>
</p>

## Dependencies

- [ruby](https://www.ruby-lang.org/) `>=2.7.3`
- [rails](https://rubygems.org/gems/rails) `>=6.1`
- [turbo-rails](https://rubygems.org/gems/turbo-rails) `>=1.1`
- [@hotwired/turbo](https://yarnpkg.com/package/@hotwired/turbo) `>=7.2.0`
- [@hotwired/turbo-rails](https://yarnpkg.com/package/@hotwired/turbo-rails) `>=7.2.0`
- [turbo_ready](https://github.com/hopsoft/turbo_ready) `>=0.1.2`
- [turbo_reflex](https://github.com/hopsoft/turbo_reflex) `>=0.0.28`

## Installation

Be sure to install the same version for each libary.

```sh
bundle add "reflex_behaviors --version VERSION"
yarn add "reflex_behaviors@VERSION --exact"
```

## Setup

Import and intialize ReflexBehaviors in your application.

```diff
# Gemfile
+gem "reflex_behaviors", "~> VERSION"
```

```diff
# package.json
"dependencies": {
  "@hotwired/turbo-rails": ">=7.2",
+  "reflex_behaviors": "^VERSION"
```

```diff
# app/javascript/application.js
import '@hotwired/turbo-rails'
+import 'reflex_behaviors' // automatically imports and sets up both TurboReady and TurboReflex
```

## Behaviors

### Toggle

Toggle content via conditional rendering.

This example will re-render the `post` partial and toggle the `form` section.

```erb
<!-- app/views/posts/_post.html.erb -->
<%= tag.div id: dom_id(post) do %>
  <!-- content -->

  <%= toggle_trigger_tag target: dom_id(post, :form),
    render: reflex_render(id: dom_id(post), partial: current_partial_path, locals: local_assigns, assigns: { post: @post }) do %>
    <% if toggle_target_collapsed?  dom_id(post, :form) %>
      <%= link_to "Edit Post Inline", request.path %>
    <% else %>
      <%= link_to "Cancel Editing Post", request.path %>
    <% end %>
  <% end %>

  <%= toggle_target_tag dom_id(post, :form) do %>
    <%= render "posts/form", post: post %>
  <% end %>

  <!-- content -->
<% end %>
```

#### Tag Helpers

- `toggle_trigger_tag(target:, render:, auto_collapse: false, disabled: false, aria: {}, data: {}, **kwargs, &block)`

    - `target` - **REQUIRED**, the DOM id of the target
    - `render` - **REQUIRED**, a payload that indicates what the reflex should render
    - `block` - **REQUIRED**, the block of HTML to render inside the trigger container element
    - `disabled` - `[false]`, indicates if the trigger should be disabled
    - `aria` - `[{}]`, the desired ARIA payload, sensible defaults are automatically applied
    - `data` - `[{}]`, the desired dataset payload, sensible defaults are automatically applied

        - `auto_collapse` - `[false]`, indicates if the toggled content automatically collapses when the user clicks outside
        - `remember` - [false], indicates if the toggled state should be remembered across requests

    - `kwargs` - generic support for additional element attributes like `class` etc.

- `toggle_target_tag(id, expanded: false, **kwargs, &block)`

    - `id` - **REQUIRED**, the DOM id of the target
    - `block` - **REQUIRED**, the block of HTML to render inside the trigger container element
    - `expanded` - [false] override that indicates whether or not the target is expanded
    - `kwargs` - generic support for additional element attributes like `class` etc.

## Releasing

1. Run `yarn` and `bundle` to pick up the latest
1. Bump version number at `lib/reflex_behaviors/version.rb`. Pre-release versions use `.preN`
1. Run `rake build` and `yarn build`
1. Run `bin/standardize`
1. Commit and push changes to GitHub
1. Run `rake release`
1. Run `yarn publish --no-git-tag-version`
1. Yarn will prompt you for the new version. Pre-release versions use `-preN`
1. Commit and push changes to GitHub
1. Create a new release on GitHub ([here](https://github.com/hopsoft/reflex_behaviors/releases)) and generate the changelog for the stable release for it

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
