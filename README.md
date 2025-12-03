# React Assessment

## Overview

The goal of this assessment is to evaluate not only your React and Typescript experience, but also your frontend design UI/UX abilities and the quality of code that you write. This assessment is designed for candidates with several years of React/Next.js experience and should take approximately 1-3 days to complete.

The assessment involves creating a data analytics dashboard which displays data from an API using charts and tables. The dashboard must support adding/updating data and demonstrate modern React patterns including custom hooks, proper error handling, and state management.

There are detailed instructions included on what's required for the assessment (e.g. specific NPM packages to use, etc.) but you have creative freedom in all other areas as long as the requirements are met.

All requirements and instructions for the assessment should be self-explanatory, if there is anything that you're uncertain of then attempt to complete it using your best judgement and ensuring that the requirements are being met.

## What You'll Be Demonstrating

This assessment evaluates the key technologies and patterns you'll use in the actual role:

**Core Technologies:**

- Next.js 14+ (App Router or Pages Router - your choice)
- TypeScript with strict typing
- AG Grid for complex data tables
- Chart libraries (ApexCharts/Flowbite Charts)
- Form validation and state management
- Custom React hooks
- Browser storage APIs

**Key Skills:**

- Data analytics dashboard development
- Form validation and data entry
- Error handling and loading states
- Code organization and reusability
- Testing React applications
- UI/UX design and polish

## Requirements

1. Your solution must be implemented using Typescript and Next.js 14+ (React). You may use either the **App Router** or **Pages Router** - whichever you are most comfortable with. If using App Router, all components can be client-side components (use `'use client'` directive as needed) - server components are not required. You may use whatever tools you prefer (e.g. yarn, npm) for installing packages and running your application.

2. Your project must use the [flowbite-react](https://github.com/themesberg/flowbite-react) NPM package (Flowbite is based on Tailwind). You may install any other supporting packages you like, but your React components must be implemented when possible using Flowbite. For more details on Flowbite, the list of components, etc. please see the following:

   - https://flowbite-react.com/docs/guides/nextjs
   - https://flowbite-react.com/docs/components/accordion

3. It's recommended to use Flowbite Charts, there is not a React specific package for it, you may choose to use the native (HTML) Flowbite Charts or use the Apex Charts npm package, see the following:

   - https://flowbite.com/docs/plugins/charts/
   - https://apexcharts.com/react-chart-demos/

4. Your solution should also attempt to match the design aesthetics of Lawbrokr to the extent that is possible. See the following in Figma, which includes reference material for the Lawbrok design aesthetics as well as a few samples of existing Lawbrokr pages.

   - https://www.figma.com/design/gTUUqi6fBA7hrW98C93KPV/Untitled?node-id=0-1&t=AZFPtU4pKtKh8EBM-1

   You may apply theming to the Flowbite components or utilize your own Tailwind components when necessary in order to more closely match the Lawbrokr aesthetic. You may find more details on theming at the following:

   - https://flowbite.com/docs/customize/theming/

5. You must use the [ag-grid-react](https://www.npmjs.com/package/ag-grid-react) as well as the [ag-grid-community](https://www.npmjs.com/package/ag-grid-community) NPM packages for displaying the tables for data. While Flowbite provides a basic table, we want to assess your ability to use AG Grid as it's a very powerful table solution for displaying analytics.

6. For displaying localized times in the dashboard you may use an NPM package such as luxon, moment, or an equivalent of your choice.

7. The assessment is purely a React/Typescript frontend application, your project should not need a backend, database (even external such as Firebase) or API in order to function, it should be completely functional just running in the browser.

8. **Hosting is not required** - your application only needs to run locally. However, if you prefer to deploy it to a hosting platform like Vercel, Netlify, or similar, that's perfectly acceptable and you may include the live URL in your submission.

9. You must implement at least **1 custom hook** that demonstrate code reusability. Examples include hooks for managing localStorage, form state, data fetching, or any other reusable logic. Your custom hooks should be properly typed with TypeScript.

10. Implement **error handling** in your application. This includes:

    - Error boundaries for catching React component errors
    - Graceful handling of API failures
    - User-friendly error messages displayed in the UI

11. Implement **state management** using either Zustand, React Context API, Redux, or another state management solution of your choice. The state should be typed and demonstrate understanding of state management patterns for larger applications.

12. Include at least **3 unit tests** using Jest and React Testing Library. Test should cover some aspect of critical functionality such as the 5-field matching algorithm, form validation, or custom hooks. This demonstrates your ability to write testable code.

13. Demonstrate awareness of **performance optimization** by implementing at least one of the following:

    - Proper use of `useMemo` or `useCallback` where appropriate
    - React.memo for component memoization
    - Code splitting or lazy loading for routes/components
    - Optimized re-renders

14. After you've completed the assessment include a brief README.md that explains how to install the dependencies, run your application, and run the tests. You may assume that applications such as npm, yarn, etc. are already installed, simply provide the instructions specific to running your application.

15. As you are working on the project ensure that you are using git. You do not need to create branches, but need to demonstrate that you have experience with git and follow good commit practices.

16. Finally, create a brief video using Loom (or an equivalent tool) sharing a screen recording demonstrating your application and showing all of the functionality that you've implemented in the dashboard.

## Submission Instructions

1. Create a git repository for your assessment, You may either create your git repo and push your changes to your own private repo (e.g. GitHub) or keep all your git commits local.

2. Once you've completed the assessment either push your changes to your own git repo or create a zip file of your assessment.

3. If using GitHub send an invite to your repository to the GitHub username **jonathan-lawbrokr** or send a zip file of your assessment. If submitting a zip file make sure to archive the whole folder (remove node_modules first), which includes your git history.

4. Share with us a link to a short screen recording (Loom, etc.) demonstrating your completed assessment.

## Assessment Instructions

1. You will be creating a simple dashboard for data analytics and analysis. The dashboard will fetch data from external APIs which will have instructions provided below. Your dashboard must have components implemented using the flowbite-react and the other NPM package as outlined in the requirements.

2. Your dashboard needs to contain a time-series chart. The following API endpoint must be used to fetch the historical Bitcoin price at 1d intervals for the past 30 days: https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=30

   - The data is returned in an array format to reduce the payload size of having key/values
   - The first array entry is the time (epoch)
   - The fifth entry is the close price
   - You need to plot time as the x-axis and the close price on the y-axis
   - See the following for more details: https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints#klinecandlestick-data

3. Your dashboard needs to contain a second chart. This time the chart is a scatterplot to analyze the trend between daily Bitcoin volume and the percent difference between the high and low price.

   - See the following examples for scatterplot ideas to visualize your data: https://apexcharts.com/react-chart-demos/scatter-charts
   - The following API request will fetch the daily Bitcoin data for the past six months: https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=180
   - Use a scatterplot and plot on the x-axis the volume and on the y-axis the percentage difference between the high and low price

4. Your dashboard needs to have a table to display data that is fetched from an API. However, we want to only fetch this data once (on initial page load) and then store the results in our browser's storage and manipulate it there without making further requests to the API.

   - Use the following API to return fake data, you must use this exact API request so that you have the expected data names and types returned: https://fakerapi.it/api/v2/custom?_quantity=10&company=company_name&country=country&state=state&city=city&zipcode=postcode&employees=counter&revenue=number&website=website&sales_rep=first_name&last_contacted=date&purchased=boolean&notes=text
   - This data should only be fetched once on page load or if you trigger a data reset manually
   - You must use the ag-grid-react NPM package to display this data
   - Implement error handling if the API request fails

5. Now add support for adding new data directly to the existing data in the browser's storage. Add a button for adding new data "Add Entry" and implement a form where a new entry can be added. Your form must have all of the following:

   - Each of the fields for the table with the correct types for each field
   - All form fields are required except notes (which can be at the end of the form)
   - You must have validation for all applicable form fields. For example employees must be a number, last contacted should have an easy to use datepicker (can use flowbite-datepicker NPM package), zipcode must have validation to ensure it's a valid USA zip code format only (both short and long zipcode formats), website should be a valid url, etc.
   - You may use NPM packages to assist with the form validation (e.g., Zod, Yup, or React Hook Form)
   - Display clear, user-friendly error messages for validation failures

6. There's one twist, when adding a new entry we want to instead have it update an existing entry instead if any 5 of the form fields except for last contacted and notes (they can be exluded) are the same. You must implement your own algorithm that after adding a new entry will first check if any 5 of the form fields (exlcuding last contacted and notes) match an existing entry, if so then the existing entry is updated and overwritten with all of the data entered in the form.

For added clarity, suppose the following is the JSON representation of a new entry that is to be added:

```json
{
  "city": "Loiusville",
  "company": "Lakin-Rosenbaum",
  "country": "French Polynesia",
  "employees": 6,
  "last_contacted": "1998-11-18",
  "notes": "Mouse replied rather impatiently: 'any shrimp could have been changed in the sand with wooden spades, then a row of lamps hanging from the change: and Alice was more than that, if you please!.",
  "purchased": true,
  "revenue": 5709368,
  "sales_rep": "Nina",
  "state": "Kentucky",
  "website": "larson.com",
  "zipcode": "63665-7148"
}
```

If at least 5 of these fields (ignore last_contacted and notes) such as city, sales_rep, state, website, zipcode match an existing entry then the entire contents of this new entry should instead update the existing entry.

7. After submitting the form and either adding a new entry or updating an existing entry when returning to the main dashboard page the changes should automatically be updated in the ag-grid table.

8. For convenience when implementing your solution you can add support (e.g. a button) to reset the browser storage and reload the table data from the API. The data is expected to persist across a hard page reload. Add a confirmation dialog before resetting to prevent accidental data loss.

## Tips

1. **Frontend Design and UI/UX Excellence**: Using different libraries for charts, tables, etc. it can be difficult to have a cohesive UI. Ensuring that everything appears cohesive and taking time to do additional styling to ensure that the frontend looks polished will make your assessment stand out. Pay special attention to:

   - Ensuring the provided Lawbrokr aesthetics and branding from Figma are matched when possible
   - Consistent spacing, colors, and typography
   - Mobile responsiveness (bonus)
   - Clear visual hierarchy and information architecture

2. **Code Quality and Architecture**: We will be evaluating the quality of your code, not just in terms of the organization but also the elegance of your solutions. Focus on:

   - Proper TypeScript typing (avoid `any` types)
   - Clean separation of concerns (components, hooks, utilities, types)
   - Consistent file and folder structure
   - Comments where logic is complex (e.g., the 5-field matching algorithm)

3. **Modern React Patterns**: Demonstrate your understanding of modern React best practices:

   - Implement custom hooks for shared logic
   - Proper composition and component hierarchy
   - Appropriate use of React hooks (useState, useEffect, useMemo, useCallback)
   - Proper understanding of Next.js routing (App Router or Pages Router)

4. **Code Organization and Reusability**: Your components, hooks, and utilities should be implemented such that they are reusable and could be used in other parts of a larger application.

5. **Testing Strategy**: While only 3 tests are required, structure your code to be testable:

   - Pure functions for business logic (easier to test)
   - Separation of concerns (UI vs logic)
   - Testable custom hooks

6. **Documentation**: Your README should be clear and provide instructions on how to install the dependencies and instructions on how to run the local dev server and run the tests.

7. **Git Commits**: Use git and have meaningful commit messages that describe your changes.

## Bonus Features (Optional)

If you complete all the requirements and want to go above and beyond, consider implementing any of these bonus features:

1. **Data Visualization Enhancements**: Add tooltips, zoom capabilities, or interactive elements to the charts

2. **Storybook**: Set up Storybook for component development and documentation

3. **Advanced Form Features**: Instead of having one large form for all of the fields, make it a multi-step form with the following:

   - Multi-step form with progress indicator
   - Auto-save draft to localStorage
   - Address autocomplete (for city, state, country, zipcode) such as using react-google-autocomplete package

4. **Real-time Validation**: As the user types in the form, show not just validation errors but also suggestions (e.g., suggest valid URL format, suggest US state codes)

5. **Advanced Table Features**:

   - Column reordering and resizing with persistence
   - Custom column visibility controls
   - Pagination for large datasets

6. **Comprehensive Test Coverage**: Go beyond 3 tests and aim for >70% code coverage

**Note: These are truly optional. Focus on completing the core requirements with high quality before attempting any bonus features.**

## Frequently Asked Questions

**Q: Should I use App Router or Pages Router?**
A: Either is fine - use whichever you're most comfortable with. There's no preference and you won't be penalized for choosing one over the other. If you're equally comfortable with both, Pages Router may be slightly simpler for a client-side-only application, but App Router is also perfectly acceptable.

**Q: Can I use a different state management library than the ones mentioned?**
A: Yes, you can use Redux, Jotai, or any other state management library you prefer, as long as you demonstrate proper state management patterns.

**Q: Do I need to implement responsive design for mobile?**
A: While not strictly required, making the dashboard responsive is a bonus that will be viewed favorably. At minimum, ensure the application works well on desktop screens (1920x1080 and 1366x768).

**Q: Can I use a UI component library other than Flowbite?**
A: No, Flowbite is required as specified in the requirements. However, you can supplement it with custom components based on Tailwind V4 when necessary.

**Q: How many tests do I really need?**
A: Only 3 unit tests are required. The purpose is to demonstrate your experience writing tests with quality over quantity. Focus on testing critical logic like the 5-field matching algorithm, form validation, or custom hooks.

**Q: Should I implement authentication or user accounts?**
A: No, this is explicitly stated as a client-side only application. No authentication needed.

**Q: How detailed should my Loom video be?**
A: Keep it concise (under 10 minutes). Walk through the main features, show the code organization briefly, demonstrate the form validation, and explain any interesting technical decisions you made.

**Q: Can I use AI coding assistants (GitHub Copilot, etc.)?**
A: Yes, but the use of AI assistants should be used in a limited manner, as a tool as part of your normal development workflow and **NOT** contributing the bulk of your work contributed for this assessment. You must ensure you understand all the code in your submission as we will discuss it in technical interviews.

**Q: Do I need to deploy/host the application?**
A: No, deployment is not required. The application only needs to run locally on your machine (`npm run dev` or equivalent). However, if you prefer to deploy it to Vercel, Netlify, or a similar platform and include a live demo URL with your submission, that's perfectly acceptable but entirely optional.
