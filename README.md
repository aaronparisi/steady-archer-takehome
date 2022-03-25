# Archer

In 2 hours (or less) develop a simple UI to simulate an archer firing arrows at a target.
The target is randomly assigned a distance between 20ft and 100ft away from the archer. Add a
button that simulates the bow. Tap once to start drawing the bow string back. Tap again to
release the string and fire the arrow at the target. The longer you wait between the first and
second tap, the farther the arrow will fly. Every .1 seconds you spend drawing the string back
equates to 5 feet of distance (up to a maximum of 150 feet). So, for example, if you draw for
exactly .5 seconds, the arrow will travel 25 feet. And it’s a linear correlation, so .55 seconds =
27.5 ft
Scoring is as such if the arrow’s distance from the target falls within these ranges:

- 2-3ft = 1 point
- 1-2ft = 3 points
- 0-1ft (bullseye!) = 5 points
  After a scoring shot (i.e. one that lands within 3ft), the target is moved to a new random distance
  20-100ft away.
  Add UI to track the user’s score

# todos

- some kind of animation while we are 'waiting' for arrow to land
- fix arrow indicator off the right side of the page issue
- make click-and-drag widget
- distance indicator mode?
- moving target mode?

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
