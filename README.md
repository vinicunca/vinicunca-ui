# Vinicunca

## Introduction

Vinicunca is an atomic Vue UI Library with the concept of BYOAC (Bring Your Own Atomic CSS). The main goal is to accommodate a design system of a product, and [Headless UI](https://headlessui.dev) inspired the idea.

This library is built on top of these amazing packages:

- ⚡️ [Vue](https://github.com/vuejs/vue-next), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.

- 😃 [Pure CSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons) - use any icon as a single class.

- ✅ [Vitest](http://vitest.dev/) for unit testing and [Cypress](https://www.cypress.io/) for component testing

- 🦾 [TypeScript](https://www.typescriptlang.org/)

## Why another UI Library?

Whenever we build a product, we will reach for a UI library with a set of styles or themes, so we don't have to worry about how the components should look. But sometimes, there are a lot of CSS selectors that are not used and can cause a penalty performance for the users (this is based on my experience, and I might be wrong).

There are many UI libraries built on top of Vue, and all of them are amazing! But I couldn't find the "one" suitable for me in terms of the developer experience. Most of them are still using mixins, Vue's options API, and no typescript support. While some are already using TS and composition API, there are still missing components that haven't been implemented.

So after a lot of researches, I decided to steal the source code from [Vuetify](vuetifyjs.com) and [PrimeVue](https://www.primefaces.org/primevue/) shamelessly. Kudos to them for maintaining an amazing open-source ecosystem.

My intention was not to compete with them, but it is the learning process. For example, managing `z-indexes` across the app, input masks, dialogs, popover content, and many more. Although this has been one of my ambition in the last few years, it might be get discontinued in the future.

## Installation (WIP)

This is still an early stage and there are a lot of things that needs to be done.
The plan is to develop a list of components that can be referred [here](https://github.com/praburangki/vinicunca/issues).

The hardest part is how to publish this as a package and create the documentation. I'm very excited to get this done!