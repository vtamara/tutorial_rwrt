# Tutorial for https://github.com/shakacode/react-webpack-rails-tutorial/

In branches of this repository you'll find intermediate demos in the 
construction of a demo of `react_on_rails` similar to 
<https://github.com/shakacode/react-webpack-rails-tutorial/>.

(The idea of branches comes from 
<https://github.com/thoughtbot/hotwire-example-template> )

In this branch you find the classic demo without style

# How to run this demo

## Requirements

* Ruby 2.7 or above (suggested the most recent i.e 3.1)
* PostgreSQL 9.7 or above (suggested the most recent i.e 14.2) with a user that
  can create databases


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

* First we created a rails project
```
doas gem install rails
rails new tutorial_rwrt --skip-javascript --skip-hotwire --skip-asset-pipeline --skip-action-text --skip-action-mailbox --skip-action-mailer --skip-system-test --skyp-active-storage --database=postgresql
cd tutorial_rwrt
```
* Then we created `.env` and added to `Gemfile` the line `gem 'dotenv-rails'`

* Then we changed `config/database.yml` to use the variables defined in `.env`

* Then we created the database

* Then we created migration, model, controller and simple tests with:
  ```
  bin/rails g scaffold comment author:string text:text 
  ```
* Then we changed the migration to add null:false as well as the model to
  indicate that both were mandatory

* Then we run the generated migration
  ```
  bin/rails db:migrate
  ```
* Then we adjusted views to make it more similar to the classic demo of
  <https://github.com/shakacode/react-webpack-rails-tutorial/>.

* Then we adjusted fixtures and tests
