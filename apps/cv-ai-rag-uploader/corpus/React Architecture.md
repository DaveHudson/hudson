React is primarily two things:

- A UI library to "Build encapsulated components that manage their own state" .
- An un-opinionated framework that lets you take those components and "compose them to make complex UIs"

## React the UI Library

It is hard to argue against the fact React as a UI library excels. Yet many completely bypass this super power!

## Pure Components

> "UI is a pure function of state" - Rauchg

React is all about components. When starting out in React it is often tempting to "think too big" and stuff too much imperative logic into your components.

When building components we need to think about the:

- individual reusability of components
- individual testability of components

The secret to great React architecture is to keep thinking small and whenever possible adopt [Pure UI](https://rauchg.com/2015/pure-ui). Components that given the same props always render the same output are always easy to write, test & maintain.

This is why [Component Driven Development](https://www.componentdriven.org/) is such a good foundation for React apps and [Storybook](https://storybook.js.org/) is a powerful tool to develop components that can be rendered and tested in isolation.

## React the un-opinionated framework

When it comes to "compose them to make complex UIs" React as a framework the picture is a bit murky.

### Component Composition

Every React developer should watch Michael Jackson's [Using Composition in React to Avoid "Prop Drilling"](https://www.youtube.com/watch?v=BcVAq3YFiuc) video on YouTube to understand why it is such a good approach.

<iframe width="560" height="315" src="https://www.youtube.com/embed/3XaXKiXtNjw?si=lxE073mgOOAM6GSb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

When the majority of your UI components are pure, you can easily shift them around and compose them in a manner that means you can avoid the need to write complex shared state providers or "prop drilling" of data through multiple layers of components.

Component composition is largely an under utilised super power of React because it is only really possible when the majority of your UI components are pure.

### Component side effects

The React core team kept the framework light intentionally, leaving space for the React ecosystem to innovate and fill those gaps.

This lack of opinions is one of reasons React is so successful, yet also one of its major pitfalls. Key features you'd expect to see in a framework are missing such as:

- Routing
- Data fetching
- State management
- Forms / data mutations
- Error handling

The absence of these features and clear [patterns](https://www.patterns.dev/) to follow mean that React codebases often end up a spaghetti mess.

Out of the box React offers a few tools to help us but manage more complex components but it is un-opinionated on if or how you should use them.

### Data Fetching

React provides the useEffect hook where you can fetch data but the [React useEffect documentation](https://react.dev/reference/react/useEffect#fetching-data-with-effects) immediately goes on to say:

> a "framework's data fetching will be a lot more efficient"

and

> "whilst writing fetch calls inside Effects is a popular way to fetch data ... it has significant downsides"

Those downsides are listed as:

- Effects don't run on the server
- Fetching directly in Effects makes it easy to create "network waterfalls"
- Means you don't preload or cache data
- It's not very ergonomic

So whilst offering the `useEffect` hook, React has a strong opinion that you **should not use it** to fetch data! Instead the recommendation is to:

- use your frameworks data fetching
- Or use a client side cache such as:
  - React Router 6.4+
  - React Query
  - useSWR

## Error Handling

React offers little help when something goes wrong and you need to catch and show an error message in your application UI.

The boilerplate code required to manually handle these errors in `useEffect` components is often skipped, meaning errors can silently fail or crash the entire application.

### State Management

Managing state is one of the hardest parts of a web application. React offers some [tools and concepts](https://react.dev/learn/managing-state) to help manage application state:

- The useState hook is good for managing state within a single component
- Need to share state between components, [lift up the state](https://react.dev/learn/sharing-state-between-components) is a solid pattern
- State logic getting gnarly, extract into a reducer and [share state using context](https://react.dev/learn/scaling-up-with-reducer-and-context)

All good patterns but also some powerful tools to shoot yourself in the foot with.

The lazy thing to do is stick everything in global state and make it available to any component in a hook, but doing so means you've just:

- killed the super power or React which is small pure components that have great testability by creating coupled components
- introduced a performance drag as every component gets that data, whether they need it or not
- introduced a second source of truth that you now need to keep in sync with server state
- created lots of boilerplate code you need to test & maintain
- lost agility in your codebase

> There are only really a couple of valid use cases for global state e.g. authentication. Providers if necessary should always be as close to the components that need them as possible.

### Forms / data mutations

React offers up [controlled components](https://legacy.reactjs.org/docs/forms.html#controlled-components) which let you control the value of each individual form field through React state.

This might be handy on a small 1 or 2 field form but with more complex forms you soon realise it just passed the burden of managing the entire form state to you the developer.

Invariably third party libraries such as [React Hook Form](https://react-hook-form.com) are often integrated to help handle (or increase) this complexity.

## Meta-Frameworks

Rising up to address the missing parts of React are Meta-frameworks such as NextJS & Remix.

> Many believed Create React App to be the React framework for the missing parts, it isn't and was never intended to be.

> Regardless CRA is now [legacy software](https://github.com/reactjs/react.dev/pull/5487#issuecomment-1409720741)

Meta-frameworks are the future of building React apps because they handle the missing parts of React. Yet each meta-framework comes with its own set of opinions.

Choosing the right framework starts with understanding the UX you are trying to deliver then selecting the framework that best aligns with your needs.

### Patterns

To better understand the goals of frameworks it is worth thinking in terms of [patterns](https://www.patterns.dev/). Patterns can be categorised into three main areas:

- Design patterns
- Rendering patterns
- Performance patterns

### Patterns with React Router 6.4+

React Router has recently shifted from being a simple routing library towards a meta-framework. React Router's philosophy is inherited from Remix (a client/server stack) but everything in React Router is client side rendered.

> Underpinning all of React Routers philosophy and opinions is [use the web platform](https://reactrouter.com/en/main/start/overview#web-standard-apis). The browser is really quite good, so just use those standards instead of trying to re-create everything in JavaScript and importing lots of third party modules.

### React Router Component Composition

Component composition is a key aspect of React Router. It implements this pattern through:

- [Nested Routes](https://reactrouter.com/en/main/start/overview#nested-routes)
- [Outlets](https://reactrouter.com/en/main/start/concepts#outlets)

Hierarchical routes can be created which are easily composed together by utilising the `<Outlet />` component, which is just a fancy `children` prop.

### React Router Data Loading

React Router adopts the fetch before rendering pattern. Each route can have a loader function which is resolved before the route UI is rendered.

Data fetching is cleanly split by route and provided to the UI, meaning there is no need to render loading or error states within your rendered UI.

React Router supports the Container/Presentational pattern. By keeping all data loading in the container and using good component composition side effects are minimised and our presentational components just render the props they are given.

- [Data Fetching](https://reactrouter.com/en/main/start/overview#data-loading)

### React Router Page Transitions

CSR apps look great on fast connections but slow them down and all the smaller details like loading states or making fields read only when a form is submitting are frequently ignored, in short because the are fiddly to do right.

As data is fetched before rendering (as opposed to render then fetch of useEffect api calls) it becomes trivial to hook into the Navigation state to render loading UI or even optimistically update the UI:

- [Pending UI](https://reactrouter.com/en/main/start/overview#pending-navigation-ui)
- [Skeleton UI](https://reactrouter.com/en/main/start/overview#skeleton-ui-with-suspense)
- [Busy Indicators](https://reactrouter.com/en/main/start/overview#busy-indicators)
- [Optimistic UI](https://reactrouter.com/en/main/start/overview#optimistic-ui)

### React Router State Management

Whilst you can write all your own shared context providers to manage state, React Router offers a much simpler and better way. Nested routes.

Simply by wrapping routes in a pathless route, it becomes possible to load data in the parent, share it with the child routes and always keep that data in sync with zero effort.

By nesting routes you've “lifted state” and created a “shared context provider” that automatically re-validates data. No need for useState or write a reducer, it is all done for you automatically.

### React Router Data Mutations

React Router embraces the traditional HTML `<form>` tag with uncontrolled components. The browser has some powerful in-built tools to handle forms and form data, so just use them.

- [Forms & Mutations](https://reactrouter.com/en/main/start/overview#data-mutations)

Forms can be posted to an action function which again should be housed in the container component so the side effect is in a single place.

Best of all React Router will always automatically re-validate your API data related loaders, so all your data after a mutation is kept in sync with server state.

### React Router Error Boundaries

As side effects from either fetching or mutating data are all within the route based container component, the majority of error handling can be managed by React Router.

- [Error Handling](https://reactrouter.com/en/main/start/overview#error-handling)

Each route can have an error component which gets rendered if any issues are encountered when fetching or mutating data. Errors bubble up so it is possible to have just a single ErrorBoundary for a section wrapped in a parent route or additionally an application wide error handler.

### Validation

React has no opinion on how to validate form data or JSON data from an API. Third party libraries have moved to fill this space, two of the more popular ones are:

- [Yup](https://github.com/jquense/yup)
- [Zod](https://github.com/colinhacks/zod)

Zod in particular is an excellent case of where not putting validation within the React framework has led to huge benefits and helps you manage side effects.
