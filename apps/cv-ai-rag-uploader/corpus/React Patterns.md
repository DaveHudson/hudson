---
tags:
  - react
related:
  - "[[Full Stack Engineer]]"
---

3 kinds of patterns

- design
- rendering
- performance

## Design Patterns

> Design patterns are a fundamental part of software development, as they provide typical solutions to commonly recurring problems in software design. Rather than providing specific pieces of software, design patterns are merely concepts that can be used to handle recurring themes in an optimized way.

Due to the popularity of React, design patterns have been modified, optimized, and new ones have been created in order to provide value in the current modern web development ecosystem.

React drops you off a cliff though as it has no opinions on:

- state management
- api
- forms
- error handling
- authentication

### Singleton

> Singletons are classes which can be instantiated once, and can be accessed globally. This *single instance* can be shared throughout our application, which makes Singletons great for managing global state in an application.

- [Singleton Pattern](https://www.patterns.dev/posts/singleton-pattern/)

> [!error] Singletons are actually considered an **anti-pattern**, and can (or.. *should*) be avoided in JavaScript.
> `Object.freeze(counter)` may be used to address some of the issues

### Proxy

> Instead of interacting with the target object directly, interact with the Proxy object.
>
> - new Proxy()

- [Proxy Pattern](https://www.patterns.dev/posts/proxy-pattern/)

Client side React has little use for but as frameworks shift to being full-stack there is more scope in Node based back-ends for this pattern.

### Provider

> Tonic to prop drilling. Use a shared provider to share context.

- [Provider Pattern](https://www.patterns.dev/posts/provider-pattern/)

Over use of Providers is the same as my dislike for Redux. It may be necessary in certain circumstances but when you use React Router and URL state this negates the need to create shared providers and you simply use the `useRouteLoaderData()` hook.

Beyond that it comes down to COMPONENT COMPOSITION. When done right prop drilling simply isn't a problem.

> [!SUCCESS] Ryan Florence video
>
> <iframe width="560" height="315" src="https://www.youtube.com/embed/3XaXKiXtNjw?si=Nu5FcazIlJIXmUly" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Why don't I like the provider pattern?

- It is boilerplate code that is lengthy, difficult to maintain and test
- Lazy, lets you abuse components in all sorts of ways and just pump data into them
- You've now got coupling and dependencies between components and that is bad
- Overuse leads to performance issues
- When API data is introduced it creates a second source of truth that now needs to be keet in sync with the provider data

> [!info] If you use a Provider it should be as close to the component that needs the data as possible. Global providers should be avoided.

### Prototype

> share properties among many objects of the same type

- [Prototype Pattern](https://www.patterns.dev/posts/prototype-pattern/)

> [!error] No use case for this. Anti pattern in my opinion, e.g override fetch in a third party library is often a cause of pain

### Container / Presentational

> Used in React to enforce **separation of concerns** and separate view from application logic

- [Container/Presentational Pattern](https://www.patterns.dev/posts/presentational-container-pattern/)

It can be useful as a way to ensure all data manipulation is done at the container level and any presentational components are pure components which are easy to write and test.

#### Container components

> Care about **what data** is shown

Primary function is to pass data to presentational components, which they contain.

Usually don't render any other components besides presentational components.

> [!success] This is React Router Data Router
>
> - `useLoaderData`
> - `useRouteLoaderData`
>   Get the data and pass it to the presentational components

#### Presentational components

> Care about **how data** is shown

Receives it's data through props. Stateless, pure functions, simply displays the data it receives.

This is COMPONENT DRIVEN DEVELOPMENT and Storybook, a core principle of my approach to React application development.

Presentational components receive their data from **container components**.

#### Hooks alternative

Argument is just use hooks and no need for this pattern but...

> [!error] There be 🐲
>
> - network waterfall
> - write own API error handling
> - write own API loaders in components, no longer pure dumb so harder to test

My views differ from those of patterns.dev & Abramov. They say just use hooks but it just doesn't make sense to me and React Router certainly goes against that view with its philosophy and that is the one I agree with and to get best out of React Router you should adopt.

> Just lift the state please

### Observer

> With the **observer pattern**, we can *subscribe* certain objects, the **observers**, to another object, called the **observable**. Whenever an event occurs, the observable notifies all its observers!

- [Observer Pattern](https://www.patterns.dev/posts/observer-pattern/)

It can be very useful when working with **asynchronous, event-based data**.

### Module

> As your application and codebase grow, it becomes increasingly important to keep your code maintainable and separated. The module pattern allows you to split up your code into smaller, reusable pieces.

- [Module Pattern](https://www.patterns.dev/posts/module-pattern/)

### Mixin

> A **mixin** is an object that we can use in order to add reusable functionality to another object or class, without using inheritance.

- [Mixin Pattern](https://www.patterns.dev/posts/mixin-pattern/)

> [!error] Anti pattern
> React team say hooks > HoC > mixins

### Mediator / Middleware

> The mediator pattern makes it possible for components to interact with each other through a central point: the mediator. Instead of directly talking to each other, the mediator receives the requests, and sends them forward!

- [Mediator/Middleware Pattern](https://www.patterns.dev/posts/mediator-pattern/)

More relevant in Node than frontend

### Higher Order Components

> Within our application, we often want to use the same logic in multiple components. This logic can include applying a certain styling to components, requiring authorization, or adding a global state.

- [HOC Pattern](https://www.patterns.dev/posts/hoc-pattern/)

> [!error] Anti pattern
> General preference for hooks these days instead. Authentication a potential exception

### Render Props

> A render prop is a prop on a component, the value is a function that returns a JSX element. The component itself does not render anything besides the render prop. Instead, the component simply calls the render prop, instead of implementing its own rendering logic.

- [Render Props Pattern](https://www.patterns.dev/posts/render-props-pattern/)

I hate these, you lose the pure component dumb stuff and you've introduced a ton of complexity for no good reason

> [!error] Anti pattern
> Again replaced by hooks

### Hooks

> Hooks make it possible to use React state and lifecycle methods, without having to use a ES2015 class component.

- [Hooks Pattern](https://www.patterns.dev/posts/hooks-pattern/)

> [!info] Many traditional design patterns can be replaced by Hooks.

Hooks are good but use in the right places and in the right way. I prefer to keep Component Driven Development approach with dumb pure function components where possible.

### Flyweight

> The flyweight pattern is a useful way to conserve memory when we're creating a large number of similar objects.

- [Flyweight Pattern](https://www.patterns.dev/posts/flyweight-pattern/)

### Factory

> With the factory pattern we can use **factory functions** in order to create new objects. A function is a factory function when it returns a new object without the use of the `new` keyword!

- [Factory Pattern](https://www.patterns.dev/posts/factory-pattern/)

I see little use for this in CRUD apps but has more uses in Node.

### Compound

> The **compound component pattern** allows you to create components that all work together to perform a task.

- [Compound Pattern](https://www.patterns.dev/posts/compound-pattern/)

### Command

> With the **Command Pattern**, we can *decouple* objects that execute a certain task from the object that calls the method.

- [Command Pattern](https://www.patterns.dev/posts/command-pattern/)

## 2. Rendering

> When you start architecting a new web app, one of the foundational decisions you make is - "How and where do I want to render content?". Should it be rendered on the web server, build server, on the Edge, or directly on the client? Should it be rendered all at once, partially, or progressively?

> To create great UX, we usually try to optimise our apps for user-centric metrics, such as the [Core Web Vitals (CWV)](https://web.dev/vitals/). The CWV metrics measure parameters most relevant to user experience. Optimising the CWV can help ensure a great user experience and optimal SEO for our apps.

> To create a great Developer Experience (DX) for our product/engineering teams, we have to optimise our development environments by ensuring faster build times, easy rollbacks, scalable infrastructure, and many other features that help developers succeed.

> Setting up a development environment based on these principles enables our development teams to build a great product efficiently.

### Client Side Rendering (CSR)

> In Client-Side Rendering (CSR) only the barebones HTML container for a page is rendered by the server. The logic, data fetching, templating and routing required to display content on the page is handled by JavaScript code that executes in the browser/client.

- [Client-side Rendering](https://www.patterns.dev/posts/client-side-rendering/)

Create React App (CRA) uses this approach. Today CRA is dead in the water but this approach can live on with a combination of Vite & React Router.

### Server Side Rendering (SSR)

> Server-side rendering (SSR) is one of the oldest methods of rendering web content. SSR generates the full HTML for the page content to be rendered in response to a user request. The content may include data from a datastore or external API.

- [Server-side Rendering](https://www.patterns.dev/posts/server-side-rendering/)

### Static Site Generation (SSG)

> Static rendering or static generation (SSG)delivers pre-rendered HTML content to the client that was generated when the site was built.

- [Static Rendering](https://www.patterns.dev/posts/static-rendering/)

### Incremental Static Regeneration (ISR)

> The Incremental Static Generation (iSSG) pattern was introduced as an upgrade to SSG, to help solve the dynamic data problem and help static sites scale for large amounts of frequently changing data

- [Incremental Static Generation](https://www.patterns.dev/posts/incremental-static-rendering/)

### Progressive hydration

> By progressively hydrating the application, we can delay the hydration of less important parts of the page. This way, we can reduce the amount of JavaScript we have to request in order to make the page interactive, and only hydrate the nodes once the user needs it. Progressive hydration also helps avoid the most common SSR Rehydration pitfalls where a server-rendered DOM tree gets destroyed and then immediately rebuilt.

- [Progressive Hydration](https://www.patterns.dev/posts/progressive-hydration/)

### Streaming Server Side Rendering (SSSR)

> We can reduce the Time To Interactive while still server rendering our application by *streaming server rendering* the contents of our application. Instead of generating one large HTML file containing the necessary markup for the current navigation, we can split it up into smaller chunks! Node streams allow us to stream data into the response object, which means that we can continuously send data down to the client. The moment the client receives the chunks of data, it can start rendering the contents.

- [Streaming Server-Side Rendering](https://www.patterns.dev/posts/ssr/)

### React Server Components (RSC)

> The React team are working on [zero-bundle-size React Server Components](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html), which aim to enable **modern UX with a server-driven mental model**. This is quite different to Server-side Rendering (SSR) of components and could result in significantly [smaller](https://twitter.com/sophiebits/status/1341098388062756867) client-side JavaScript bundles.

- [React Server Components](https://www.patterns.dev/posts/react-server-components/)

### Selective hydration

- [Selective Hydration](https://www.patterns.dev/posts/react-selective-hydration/)

### Islands

- [Islands Architecture](https://www.patterns.dev/posts/islands-architecture/)

> [!success] Understand what UX trying to deliver looks like then work back to technology need

## 3. Performance

> Still hard to build fast sites

### Static Import

> The `import` keyword allows us to import code that has been exported by another module. By default, all modules we're *statically importing* get added to the initial bundle.

- [Static Import](https://www.patterns.dev/posts/static-import/)

> [!error] Obviously if we keep doing this, bundle gets huge

### Dynamic Imports

> Allow us to split up components into their own bundle  and reduce the size of the initial bundle

- [Dynamic Import](https://www.patterns.dev/posts/dynamic-import/)

### Import on visibility

> Components that aren't visible on the initial page e.g. images loaded on scroll in a list. aka lazy loading

- [Import On Visibility](https://www.patterns.dev/posts/import-on-visibility/)

### Import on interaction

> Lazy-load non-critical resources when a user interacts with UI requiring it

- [Import On Interaction](https://www.patterns.dev/posts/import-on-interaction/)
  Remix gets clever with this by loading when hover over links etc, I believe this is too much for RR client side to achieve

### Route based splitting

> We can request resources that are only needed for specific routes, by adding *route-based splitting*. By combining **React Suspense** or `loadable-components` with libraries such as `react-router`, we can dynamically load components based on the current route.

- [Route Based Splitting](https://www.patterns.dev/posts/route-based/)

### Bundle splitting

> Instead of requesting one giant bundle that contains unnecessary code, we can split the bundle into multiple smaller bundles

- [Bundle Splitting](https://www.patterns.dev/posts/bundle-splitting/)

### Pushing Rendering Pre-caching Lazily (PRPL)

> The PRPL pattern focuses on four main performance considerations:
>
> - Pushing critical resources efficiently, which minimizes the amount of roundtrips to the server and reducing the loading time.
> - Rendering the initial route soon as possible to improve the user experience
> - Pre-caching assets in the background for frequently visited routes to minimize the amount of requests to the server and enable a better offline experience
> - Lazily loading routes or assets that aren’t requested as frequently

- [PRPL Pattern](https://www.patterns.dev/posts/prpl/)

Most applicable to progressive web apps where network is very poor.

### Tree shaking

> It can happen that we add code to our bundle that isn't used anywhere in our application. This piece of dead code can be eliminated in order to reduce the size of the bundle, and prevent unnecessarily loading more data! The process of eliminating dead code before adding it to our bundle, is called tree-shaking

- [Tree Shaking](https://www.patterns.dev/posts/tree-shaking/)

### Preload

>     <link rel="preload" > is a [browser optimisation](https://web.dev/uses-rel-preload/) that allows critical resources (that may be discovered late) to be requested earlier

- [Preload](https://www.patterns.dev/posts/preload/)
  I highly suspect CRA prevents us doing anything fun like this. Remix has it built in.

### Prefetch

> <link rel="prefetch"> is a browser optimisation which allows us to fetch resources that may be needed for subsequent routes or pages before they are needed.

- [Prefetch](https://www.patterns.dev/posts/prefetch/)

### Optimise third parties

- [Optimise loading third-parties](https://www.patterns.dev/posts/third-party/)

### List virtualisation

- [List Virtualization](https://www.patterns.dev/posts/virtual-lists/)

### Compressing Javascript

- [Compressing JavaScript](https://www.patterns.dev/posts/compression/)
