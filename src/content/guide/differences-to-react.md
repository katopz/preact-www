---
name: Differences to React
permalink: '/guide/differences-to-react'
---

# Differences to React

Preact itself is not intended to be a reimplementation of React.  There are differences. Many of these differences are trivial, or can be completely removed by using [preact-compat], which is an thin layer over Preact that attempts to achieve 100% compatibility with React.

The reason Preact does not attempt to include every single feature of React is in order to remain **small** and **focussed** - otherwise it would make more sense to simply submit optimizations to the React project, which is already a very complex and well-architected codebase.

## What's Included?

- [ES6 Class Components]
    - _classes provide an expressive way to define stateful components_
- [High-Order Components]  
    - _components that return other components from `render()`, effectively wrappers_
- [Stateless Pure Functional Components]  
    - _functions that receive `props` as arguments and return JSX/VDOM_
- [Contexts]: Support for `context` was added in Preact [3.0].
    - _Context is an experimental React feature, but has been adopted by some libraries._
- [Refs]: Support for function refs was added in Preact in [4.0]. String refs are supported in `preact-compat`.
    - _Refs provide a way to refer to rendered elements and child components._
- Virtual DOM Diffing
    - _This is a given - Preact's diff is simple but effective, and **[extremely](http://developit.github.io/js-repaint-perfs/) [fast](https://localvoid.github.io/uibench/)**._
- `h()`, a more generalized version of `React.createElement` _([read: why `h()`?](http://jasonformat.com/wtf-is-jsx))_


## What's Added?

Preact actually adds a few convenient features inspired by work in the React community:

- `this.props` and `this.state` are passed to `render()` for you  
    - _You can still reference them manually. This is just cleaner, particularly when [destructuring]_
- [Linked State] updates state when inputs change automatically
- Batching of DOM updates, debounced/collated using `setTimeout(1)` _(can also use requestAnimationFrame)_
- You can just use `class` for CSS classes. `className` is still supported, but `class` is preferred.
- Setting `class` to an Object creates a String className containing the keys having truthy values.
- Component and element recycling/pooling.


## What's Missing?

- [PropType] Validation: Not everyone uses PropTypes, so they aren't part of Preact's core.
    - _**PropTypes are fully supported** in [preact-compat], or you can use them manually._
- [Children]: Not necessary in Preact.
    - _`React.Children` is fully supported in [preact-compat]._
- Synthetic Events: Preact's browser support target does not require this extra overhead.
    - _A full events implementation would mean more maintenance and performance concerns, and a larger API._


## What's Different?

There are currently a couple differences between Preact and React that are more subtle:

- `render()` accepts a third argument, which is the root node to _replace_, otherwise it appends. This may change slightly in a future version, perhaps auto-detecting that a replacement render is appropriate by inspecting the root node.
- `setState()` is asynchronous because of batching. This is intentional and does not affect the outward-facing API.


[3.0]: https://github.com/developit/preact/milestones/3.0
[4.0]: https://github.com/developit/preact/milestones/4.0
[preact-compat]: https://github.com/developit/preact-compat
[PropType]: https://github.com/developit/proptypes
[Contexts]: https://facebook.github.io/react/docs/context.html
[Refs]: https://facebook.github.io/react/docs/more-about-refs.html
[Children]: https://facebook.github.io/react/docs/top-level-api.html#react.children
[ES6 Class Components]: https://facebook.github.io/react/docs/reusable-components.html#es6-classes
[High-Order Components]: https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
[Stateless Pure Functional Components]: https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
[destructuring]: http://www.2ality.com/2015/01/es6-destructuring.html
[Linked State]: /guide/linked-state
