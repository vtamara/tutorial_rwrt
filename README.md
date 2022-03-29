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

* Check previous steps in branch `4-simple`

* We added the package `react-intl`

* From `react-webpacker-rails-tutorial` we copied `i18n` in
  `app/javascript/lib/i18n` with the files:
  * `default.js` Defines the translatable messages in an object where
     the property name is the name to use in the application with the function
     `formatMessage`, for example:
     ```
     "inputNameLabel": {
       "id": "input.name.label",
       "defaultMessage": "Name"
     },
     ```
     In each value there is an object with properties `id` and 
     `defaultMessage`.
     `id` is used in the file `translations.js`, `defaultMessage` is the
     message in the `defaultLocale` (also defined in this file). 
     We reformatted this file.
  * `translations.js` is an object with several translations (it repeats
    english). The id of each string corresponds to an id in `default.js`
  * `selectLanguage.jsx` Functional React component to select
    desired language according to the available at `translations.js`.  
    Receives the function to call once a new language is selected.

* In each component that has translatable strings:
  * Add:
    ```
    import { injectIntl } from 'react-intl';
    import { defaultMessages } from 'lib/i18n/default';
    ```
  * Add `intl` as prop whose PropTypes is:dd 
    ```
    intl: PropTypes.objectOf(PropTypes.any).isRequired,
    ...
    const {x, intl} = this.props;
    ```
  * Where needed to translate a string:
    ```
    const { formatMessage } = this.props.intl;
    ...
    formatMessage(defaultMessages.inputNameLabel)
    ```
    where `inputNameLabel` is a property name in `default.js`
  * Where it loads another component that needs i18n, add
    as attribute 
    ```
    intl={intl}
    ```
  * Remove the `export default` of the main component (e.g
    use only `class CommentFormStacked`) and at the end
    of the file transform before exporting to add `intl` with:
    ```
    export default injectIntl(CommentFormStacked);
    ```
* In the component that will handle the selector of language (should be the 
  highets in hierarchy because the `intl` object will be passed to its
  descendants), in our case `CommentScreenSimple`, besides the previous
  steps:
  * Add
    ```
    import { IntlProvider, injectIntl } from 'react-intl';
    import SelectLanguage from 'lib/i18n/selectLanguage';
    import { defaultMessages, defaultLocale } from 'lib/i18n/default';
    import { translations } from 'lib/i18n/translations';
    ```
  * Removing `export default`  from the main class and at the end 
    export the component wrapped like this:
    ```
    export default class I18nWrapper extends BaseComponent {
      constructor(props) {
        super(props);
    
        this.state = {
          locale: defaultLocale,
        };
    
        _.bindAll(this, 'handleSetLocale');
      }
    
      handleSetLocale(locale) {
        this.setState({ locale });
      }
    
      render() {
        const { locale } = this.state;
        const messages = translations[locale];
        const InjectedSimpleCommentScreen = injectIntl(CommentScreenSimple);
    
        return (
          <IntlProvider locale={locale} key={locale} messages={messages}>
            <InjectedSimpleCommentScreen
              // eslint-disable-next-line react/jsx-props-no-spreading 
              {...this.props}
              locale={locale}
              handleSetLocale={this.handleSetLocale}
            />
          </IntlProvider>
        );
      }
    }
    ```
    Note that `handleSetLocale` and `locale` should be sent through the
    descendants chain to th Component that will present component
    `SelectLanguage` (in this case `CommentBoxSimple`).

