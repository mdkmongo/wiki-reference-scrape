/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SearchableList from '../../components/SearchableList';
import s from './Home.scss';

function Home() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <SearchableList
          endpoint='wiki-api/search'
        />
      </div>
    </div>
  );
}

Home.propTypes = {
};

export default withStyles(Home, s);
