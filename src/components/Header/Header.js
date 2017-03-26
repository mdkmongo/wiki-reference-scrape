import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './header.scss';

class Header extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div>
            <Link to='/'>Search</Link>
          </div>
          <div>
            <Link to='/about'>About</Link>
            <Link to='/'>Github</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(Header, s);
