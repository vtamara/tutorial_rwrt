# Tutorial for https://github.com/shakacode/react-webpack-rails-tutorial/

In branches of this repository you'll find intermediate demos in the 
construction of a demo for `react_on_rails` similar to 
<https://github.com/shakacode/react-webpack-rails-tutorial/>.

(The idea of branches comes from 
<https://github.com/thoughtbot/hotwire-example-template> )

In this branch you find the complete demo.  The intermediate branches are:

* `1-classic` the classic demo, i.e just wiht rails generating almost 
   everything with scaffold and minor adjustment but without style
* `2-bootstrap` adding `shakapacker`, bootstrap and loading the SCSS of 
   bootstrap
* `3-layout` Layout with react components for Header and Footer.
* `4-simple` Components for the demo Simple React using `bootstrap-react`
* `5-i18n`  Adding messages in several languages (including spanish)
* `6-standard`  Organizing components in a standard way


# How to run this demo

## Requirements

* Ruby 2.7 or above (suggested the most recent i.e 3.1)
* PostgreSQL 9.7 or above (suggested the most recent i.e 14.2) 
  with a user that can create databases
* node 16.13 or above


## Procedure

* With the PostgreSQL create the database :
```
createdb -U pguser tutorial_rwrt
```
* Run 
```
bundle
```
* Configure PostgreSQL user and password in the application
  ```
  cp env.template .env
  $EDITOR .env
  ```
  Set user, password and if needed host option for PostgreSQL in `DB_USER`, 
  `DB_PASSWORD` and `DB_HOST` respectively.
* Populate the database with
  ```
  bin/rails db:setup
  ```
  and optionaly check that you can use it with
  ```
  bin/rails dbconsole
  ```
* Run `yarn`
* Run the example
  ```
  bin/rails s
  ```
* See results in your browser by opening http://127.0.0.1/comments


## Tests

* Run 
  ```
  CONFIG_HOSTS=www.example.com bin/rails test
  ```

# How we created this example

* Check previous steps in branch `5-i18n`

* The standard way for components used was:

  ```
  //import of external libraries/components in alphabetical order
  import PropTypes from 'prop-types'
  import React from 'react'
  
  //import of local libraries/componets in alphabetical order
  import BaseComponent from 'lib/components/BaseComponent'
  
  export default class MyComp extends BaseComponent {
    static propTypes = {
      firstProp: PropTypes.number
    }
  
    constructor(props) {
      super(props)
      //Initialize state and internal var/const
    }
  
    // Functions from here using arrow notation in order not to use bind
  
    // Lifecycle
    DidMount = () => {
    }
  
    // Event handlers and helpers
    handleClick = () => {
      // ...
    }
  
    //Finally render
    render = () => (
      <div>
      </div>
    )
  }
  ```
* However `react_on_rails` can pass the `railsContext` to functional 
  componentes as he `NavigationBar`.  That for this reason stays as 
  functional component and in this step we fix the active tab in
  the NavigationBar of the header by using the railsContext.

* Trying to increase the comment count in the NavigationBar component
  is difficult because it is rendered server side and window doesn't
  exist then it is not possible to use the usual event mechanism of
  Javascript.  Among the solutions for this scenario is Redux.

