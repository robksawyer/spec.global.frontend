![SpecGlobal_Logo.png](http://s23.postimg.org/4f0itpwtn/spec_global.png)

> Spec (http://spec.global) is filling a niche in the [display advertising technology landscape](http://prezi.com/katuvp2rkyk_/the-display-advertising-technology-landscape/) by providing media planning and creative agencies a platform that connects them to site and publisher inventory specifications.

This is an AngularJS application that uses a separate backend that can be found at <https://github.com/robksawyer/spec.global.backend>. Currently the frontend app contains the following features:

* Login with backend
* JWT token authentication after login
* Generic error handler which is attached to $http and $sailsSocket
* Message service to show specified messages to users

## Used components and development tools

The Spec frontend application uses following 3rd party libraries to make all this magic happen. To see all of the components used, check the `package.json` file in the root directory.

### Components 
* slush-angular (https://github.com/slushjs/slush-angular)
* AngularJS (https://github.com/angular/angular.js)
* AngularUI Router (https://github.com/angular-ui/ui-router)
* AngularUI Bootstrap (https://github.com/angular-ui/bootstrap)
* angular-moment (https://github.com/urish/angular-moment)
* Angular Bootstrap Show Errors (https://github.com/paulyoder/angular-bootstrap-show-errors)
* angular-linkify (https://github.com/scottcorgan/angular-linkify)
* angularSails (https://github.com/balderdashy/angularSails)
* Bootstrap (https://github.com/twbs/bootstrap)
* bootswatch (https://github.com/thomaspark/bootswatch/)
* Font Awesome (https://github.com/FortAwesome/Font-Awesome)
* noty - A jQuery Notification Plugin (https://github.com/needim/noty)
* Sails JavaScript Client SDK (https://github.com/balderdashy/sails.io.js)

### Development Tools
* GulpJS (http://www.gulpjs.com)
* Karma - Unit test runner (https://github.com/karma-runner/karma)
* Protractor - End to end (E2E) test runner (http://angular.github.io/protractor)
* PhantomJS - Headless WebKit scriptable with a JavaScript API (http://phantomjs.org)

Note that this list may change at any time and may not be complete.

# Run the app

If you just want to see the app in action run the following:

1. `npm install; bower install;`
2. `gulp serve`
3. Navigate to `http://localhost:3001` in your browser.
4. Start up [spec.global.backend](https://github.com/robksawyer/spec.global.backend).

# Technology Stack

## Frontend

The interface is presented via the magic of AngularJS and Bootstrap. Most of the frontend dependencies were installed with Bower via [this method](http://stackoverflow.com/a/22456574/67524). The project is also preconfigured with a number of npm helper scripts to make it easy to run the common tasks that you will need while developing:

- `sails lift` : start a local development web-server
- `npm test` : start the Karma unit test runner
- `webdriver-manager update` : install the drivers needed by Protractor (you only need to run this once)
- `webdriver-manager start` : run the Protractor end to end (E2E) tests

Configuration variables have been created throughout the app via [this method](http://stackoverflow.com/a/18274034/67524).

## Development

Before you start, you need to understand that the app is divided into two separate repositories. One handling frontend code and the other pertaining to the backend service. These can be found at:

* Frontend (https://github.com/robksawyer/spec.global.frontend)
* Backend (https://github.com/robksawyer/spec.global.backend)


To start developing in the project run:

```bash
gulp serve
```

Then head to `http://localhost:3001` in your browser.

The `serve` tasks starts a static file server, which serves the AngularJS application, and a watch task which watches
all files for changes and lints, builds and injects them into the index.html accordingly.

## Tests

To run tests run:

```bash
gulp test
```

**Or** first inject all test files into `karma.conf.js` with:

```bash
gulp karma-conf
```

Then you're able to run Karma directly. Example:

```bash
karma start --single-run
```

## Production ready build - a.k.a. dist

To make the app ready for deploy to production run:

```bash
gulp dist
```

Now there's a `./dist` folder with all scripts and stylesheets concatenated and minified, also third party libraries
installed with bower will be concatenated and minified into `vendors.min.js` and `vendors.min.css` respectively.

To run your deployment code run:

```bash
gulp production
```

Then head to `http://localhost:3000` in your browser.

## Backend

Information about the apps frontend can be found in [spec.global.backend/README.md](https://github.com/robksawyer/spec.global.backend/blob/master/README.md).

# Testing 

## Running Unit Tests

Before you start you'll need to install the testing tools globally in order to run the commands mentioned later.

`npm install -g karma-cli`

`npm install -g karma`

`npm install -g protractor`

`npm install -g phantomjs`

`webdriver-manager update --standalone` 


The grunt plugin being used assumes you have PhantomJS installed globally. Since we're using it via other grunt configs, you need to install it as an optional dependency:
```
# From your project's root directory
cd node_modules/grunt-phantom/
npm install --optional
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```
grunt.loadNpmTasks('grunt-phantom');
```

We use unit tests to ensure that the JavaScript code in our application is operating correctly. Unit tests focus on testing small isolated parts of the application. The unit tests are kept in the `/assets/test/unit` directory.

The Spec project is configured to use [Karma](https://github.com/karma-runner/karma) to run the unit tests for the application. Start Karma by running:

```
grunt test:karma
```

This will start the Karma unit test runner. Karma will read the configuration file at `test/karma.conf.js`. This configuration file tells Karma to:
 - open up a Chrome browser and connect it to Karma
 - execute all the unit tests in this browser
 - report the results of these tests in the terminal/command line window
 - watch all the project's JavaScript files and re-run the tests whenever any of these change

It is good to leave this running all the time, in the background, as it will give you immediate feedback about whether your changes pass the unit tests while you are working on the code.

### Running End to End Tests

We use End to End (E2E) tests to ensure that the application as a whole operates as expected. End to End tests are designed to test the whole client side application, in particular that the views are displaying and behaving correctly. It does this by simulating real user interaction with the real application running in the browser.

The End to End tests are kept in the `assets/test/e2e` directory.

The Spec project is configured to use [Protractor](https://github.com/angular/protractor) to run the End to End tests for the application. Protractor relies upon a set of drivers to allow it to interact with the browser. You can install these drivers by running:
```
webdriver-manager update --standalone
```
*(You should only need to do this once.)*

Since Protractor works by interacting with a running application, we need to start our web server:
```
sails lift
```

Then in a separate terminal/command line window, we can run the Protractor test scripts against the application by running:

```
webdriver-manager start
```

To run it headless via PhantomJS use the following command:

```
grunt test:protractor
```

This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser. You should leave this server running as you're developing. You can see information about the status of the server at `http://localhost:4444/wd/hub`.

Protractor will read the configuration file at `assets/test/protractor-conf.js`. This configuration tells Protractor to:
 - open up a Chrome browser and connect it to the application
 - execute all the End to End tests in this browser
 - report the results of these tests in the terminal/command line window
 - close down the browser and exit

 It is good to run the end to end tests whenever you make changes to the HTML views or want to check that the application as a whole is executing correctly. It is very common to run End to End tests before pushing a new commit of changes to a remote repository.


 # The App
The current app is running at <http://spec-global-frontend.herokuapp.com>.

# Staging 

Coming soon...
~~The current staging site is located at <http://spec-global-frontend-stage.herokuapp.com>.~~

# Deployment 

## Environment Variables

These can be tricky if you've never worked with them. Basically, our strategy is similar to what's mentioned in the post <http://stackoverflow.com/questions/21291111/sails-js-accessing-local-js-environment-settings-in-controllers>. The idea here is to add environment variables needed locally by Sails to the `config/local.js` file. All of the others are added using `heroku config:set MYVAR=''` and then used in the production code via `process.env.MYVAR`.

## General Info

Coming soon...

`git push heroku master`

## Logging 

We are currently using [Papertrail](https://papertrailapp.com/) for all of our logging purposes.
