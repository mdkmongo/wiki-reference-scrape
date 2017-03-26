import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './References.scss';

const noSpecialChars = str => str.replace(/[^a-zA-Z ]/g, " ");
const noQuotes = str => str.replace(/['"]+/g, '');

function References({references, page}) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{noSpecialChars(page)}</h1>
        <div>
          {
            references.map((r, i) => {
              return (
                <div
                  key={i}
                >
                  <p><a href={r.link} target='_blank' >{r.title}</a></p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

References.propTypes = {
};

export default withStyles(References, s);
