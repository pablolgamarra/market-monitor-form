✨ Features
form: add custom hooks to manage Market Monitor form state

form: create context provider for form using useMarketMonitorForm

form: define ProductFamilyInformation model and MarketMonitorFormState interface

hooks: add hooks to retrieve SharePoint list items

♻️ Refactors
models: move models from /types to /models and update to use default exports

services: restructure legacy services into /services with alias support

aliases: update tsconfig, gulpfile, and webpack config with aliases for @services, @models, @common, @hooks, and @context

enums: move enums into new /common folder

📦 Chores
eslint: disable no-unexpected-any rule

eslint: remove no-floating-promises rule

deps: add @pnp/sp, @pnp/graph, and @pnp/logging

tailwind: install and configure Tailwind CSS

npm: modify npm scripts in package.json

gulp: add custom logic in gulpfile.js and package.json for version updates

🔧 Maintenance
project: copy legacy files from /webparts/marketMonitorForm/services to new /services location
