## Architectural Review of Admin Panel

Admin Panel was a Create React App (CRA) client side rendered React application that contained a lot of overly-complex code built up over rapid iterations of start-up life.

It wasn't feasible to throw away the codebase from a live system supporting thousands of end users and start from scratch, so a refactoring approach was needed.

I undertook a holistic view of the Admin Panel within the larger Peppy architecture and put in place a transition plan away from Create React App towards a meta-framework such as Remix or Next.js.

The initial phase of this plan leaned heavily on the philosophy of React Router and in term much of the Remix philosophy.

Refactor the existing codebase using the patterns of React Router led to a clear vision on how to :

- manage application state / context
- handle forms & form validation
- handle api loading & form actions

## UX

The user experience of Admin Panel was extremely poor. The UI was implemented in a rush and implemented design patterns that were confusing to the user.

I led the overhaul of a fresh approach to the overall design of the user interface and improved the UX of many of the newer features developed within Admin Panel.

## Design System / Component Driven Development

The existing design / UI was made up of Material UI components that were driving the architecture into a more complex direction than necessary, particularly around managing styles and handling user input via forms and rendering table data.

I led the adoption of a Component Driven Development approach using Storybook to create a design system of UI components. The new UI components were developed using Tailwind CSS, phasing out the older Material UI. The majority of UI rendering started to use dumb components that rendered exactly the same everything, with side effects from API calls lifted to the page level and managed using React Router.

## Testing

A core part of my role at Peppy was take a system that had zero tests and introduce a high level of test coverage to provide confidence that refactoring changes being made would not break the system.

My approach to this was two fold:

- Component tests
- End-to-end tests

All new UI components written in Storybook had associated tests written in Jest or Cypress Component Tests.

Additionally I wrote Cypress end-to-end tests for the majority of the admin panel.

I integrated all of these tests into the GitHub Continuous Integration pipeline so that they ran on every Pull Request and merge of the `dev` branch into `main`.

## API Review

Peppy Admin Panel integrated with an API that was also utilised in the Peppy Mobile Apps.

Often what the Admin Panel and Mobile app required were different. This meant often needing to call multiple API endpoints from the client side within Admin Panel.

In order to optimise our API calls and improve the speed, rendering and responsiveness of the Admin Panel I analysed a large number the Peppy API endpoints and listed recommendations for improvement.

A number of these API improvements were made during feature development. In particular around the Questionnaire endpoints.

## Peppy Core

Peppy utilised TypeScript and sharing types across the entire stack was important in terms of ensuring quality. Admin Panel lagged behind with integration of Types. I led the tightening up of the contract between the front-end and the API, ensuring that data loading at the page or form level implemented the TypeScript types and DTOs shared by the API.

In doing so I paired Zod schemas with the new TypeScript Satisfies feature to ensure form data and API data returned was valid against the our types and interfaces.

## Error Logging & Performance

To improve insight into application errors and performance issues I aided the integration and improvement of the Sentry setup. This included integrating with Sentry Session Replay, allowing a redacted UI replay of user sessions. This provide invaluable in finding and fixing numerous bugs & user issues.
