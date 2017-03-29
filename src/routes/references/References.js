import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './References.scss';

const noSpecialChars = str => str.replace(/[^a-zA-Z ]/g, " ");
const noQuotes = str => str.replace(/['"]+/g, '');
const maxChars = (str, length) => str.replace(new RegExp("^(.{"+length+"}[^\s]*).*"), "$1")

class References extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortByRecent: false,
    }
  }
  toggleSortBy = (event) => {
    event.preventDefault();
    this.setState({
      sortByRecent: !this.state.sortByRecent,
    })
  }
  render() {
    const { references, page, description } = this.props;
    const { sortByRecent } = this.state;
    const filteredRefs = sortByRecent ? references.slice().reverse() : references;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{noSpecialChars(page)}</h1>
          <h4>Overview:</h4>
          <p>{`${maxChars(description, 200)}...`}</p>
          <h4>References:</h4>
          <div className={s.filter}>
            <p>Sort By:</p>
            <a href="#" onClick={this.toggleSortBy} >
              <span className={!sortByRecent ? s.active : ''}>Earliest</span>
              <span>|</span>
              <span className={sortByRecent ? s.active : ''}>Most Recent</span>
            </a>
          </div>
          <div>
            {
              filteredRefs.map((r, i) => {
                return (
                  <div
                    className={i}
                  >
                    <p><a href={r.link} target='_blank' >{r.title}</a></p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

References.propTypes = {
};

export default withStyles(References, s);
