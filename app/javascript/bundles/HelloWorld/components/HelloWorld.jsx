import PropTypes from 'prop-types';
import React, { useState } from 'react';
import style from './HelloWorld.module.css';

export default class HelloWorld {

  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  constructor(props) {
    const [name, setName] = useState(props.name);
  }

  render = () => (
    <div>
      <h3>Hello, {name}!</h3>
      <hr />
      <form>
        <label className={style.bright} htmlFor="name">
          Say hello to:
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </form>
    </div>
  );

};

