# Tutorial for https://github.com/shakacode/react-webpack-rails-tutorial/

In branches of this repository you'll find intermediate demos in the 
construction of a demo for `react_on_rails` similar to 
<https://github.com/shakacode/react-webpack-rails-tutorial/>.

(The idea of branches comes from 
<https://github.com/thoughtbot/hotwire-example-template> )

In this branch you find the complete demo.  The intermediate branches are:

* `1-classic` the classic demo, i.e just wiht rails generating almost 
   everything with scaffold and minor adjustment but without style
* `2-bootstrap` adding shakapacker, bootstrap and loading the SCSS of 
   bootstrap


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

* Check previous steps in branch `2-bootstrap`

```
bundle add react_on_rails
bin/rails generate react_on_rails:install
```
* Adjusting entry packs in app/javascript/packs
* From the bundle comment of the rect-webpack-rails-tutorial 
  * Copy and Adapt NavigationBar.jsx to comments/layout
  * Extract Footer from ScreenComponent to comments/layout
  * Copy more from assets/styles to assets/stylesheets
* Adjust app/views/layout/application to include 
    NavigationBar in header and Footer in footer,
    rendered by the server
* Adjust app/javascript/packs/application adding Navigator and Footer just in case
* Adjusting app/javascript/packs/server-bundle adding Navigator and Footer because they are rendered by server
