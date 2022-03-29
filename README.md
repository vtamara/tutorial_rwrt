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

* Check previous steps in branch `3-layout`

* Seems that grouping components in a bundle is a recommended practice, 
  adopting with bundle comments located at `app/javascript/bundles/comments` 
  (although `hello_world` is in bundle `HelloWorld` 
  so it is not clear notation CamelCase or lowercase with underlines).

* Seems that extending new React components from 
  `lib/components/BaseComponent.jsx` is a recommended practice
  (although initally it is just React.Component).  Adopting it.

* Seems that organizing the hierarchy of components in subdirectories
  is a recommended practice. Seems benefical for very big project,
  however we prefere not to adopt in this one, but just leaving all
  the functional components in `app/javascript/bundle/comments/components`
  and the layout components in `app/javascript/bundle/comments/layout`

* We added to the view `app/views/pages/simple.html.erb`: 
  ```
  <%= react_component("CommentScreenSimple", props: {}, prerender: false) %
  ```
  And copied and adapted a hierarchy of components located at
  `app/javascript/bundles/comments/components`:
  * `CommentScreenSimple`:  handles initial fetch of comments after
     the componente is mounted (using package `axios`), submission of 
     a new comment (presenting nice animation with CSS), and in its 
     state keeps comments as `$$comments` 
     (we guess `$$` means that is a data structure managed with the 
     package `immutable` --see <https://immutable-js.com/docs/v4.0.0>).
     By the way here we could reproduce and fix the bug 
    <https://github.com/shakacode/react-webpack-rails-tutorial/issues/494>)
    * `CommentBoxSimple`: presents some notes, then a stacked form with
      the component `CommentFormStacked`, and
      then the list of comments with the component `CommentList`.
      * `CommentFormStacked`: Keeps most recent submission in state
      and handles focus after submitting new (keeps author gives focus
      to new empty text).  To reference input boxes use attribute
      `ref` special for React with functions like ReactDOM.findDomNode.
      Uses `react-bootstrap` (althoug it is not used for example by
      the component `NavigationBar`).
      * `CommentList`: Receives as props the list of comments and
        just presents them with CSS animation by using for each 
        comment the class `Comment`
        * `Comment`: presents just one comment, avoids XSS attacks
          by purifying the markdown given by the user.
          Changed `sanitize: true` of marked  (deprecated) by usage of 
          `DOMPurify` (the original tutorial needs improvement in this
          as we reported at 
          <https://github.com/shakacode/react-webpack-rails-tutorial/issues/500>).

* We had to add to `app/javascript/packs/application.js`:

```
import ReactOnRails from 'react-on-rails'

ReactOnRails.setOptions({
  traceTurbolinks: true
})

ReactOnRails.register({
  CommentScreenSimple,
  Footer,
  HelloWorld,
  NavigationBar,
})
```
  It is weird that this is required although:
  1. NavigationBar and Footer are rendered by the server (they are
     registered initiall at `app/javascript/packs/server-bundle.js`
  1. We didn't need to register other componente rendered by the client
     like `CommentBoxSimple` and its descendants.


* react-webpack-rails-tutorial uses a non-default JSON for comments,
  instead of an array it is an object with one property with name comments,
  and its value is the array of comments.
  The standard generated by the scaffold of comments is an array.
  We preferred to leave the standard array and we made the changes in
  the code that fetches the JSON.


