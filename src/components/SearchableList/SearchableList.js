import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import fetch from '../../core/fetch';
import s from './searchable-list.scss';

/* Functional */
const withUnderscore = (str) => str.replace(/ /g,"_");
const listings = (listings) => <ul className={s.list}>{listings.map(l => listing(l))}</ul>;
const errormsg = (error) => <p>Sorry, there was an error</p>
const loadmsg = (loading) => <p>Loading</p>
const welcomemsg = () => <p>Search for Wikipedia Pages</p>
const needData = (data = []) => !data.length > 0;
const listing = (listing) =>
  <li key={listing.title}>
    <Link to={`/references/${withUnderscore(listing.title)}`}>
      {listing.title}
    </Link>
  </li>
const fetchData = (endpoint, searchTerm = '', cb) => {
  fetch(`${endpoint}/${searchTerm}`)
    .then(response => response.json())
      .then(json => cb(json))
        .catch(e => cb(null, true));
}

class SearchableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
      loading: false,
      error: false,
      searchTerm: null,
    }
  }
  static defaultProps = {
    endpoint: '',
  }
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
  }

  /* Lifecycle Functions */
  componentDidUpdate = (prevProps, prevState) => {
    const { endpoint } = this.props;
    const { searchTerm } = this.state;
    const { handleResponse } = this;
    if (searchTerm === prevState.searchTerm) return;
    if (searchTerm === '') {
      this.setState({
        data: []
      })
      return;
    }
    this.setState({
      loading: true,
    });
    fetchData(endpoint, searchTerm, handleResponse);
  }

  /* StateChange Functions */
  handleResponse = (data, error = false) => {
    if (error) {
      this.setState({
        error: true,
        loading: false,
      })
    } else {
      this.setState({
        data: data,
        loading: false,
        error: false,
      })
    }
  }
  updateSearchTerm = (e) => {
    this.setState({
      searchTerm: e.target.value,
    })
  }

  /* Content Functions */
  renderContent = () => {
    const { data, loading, error } = this.state;
    if (error) return errormsg();
    if (loading) return loadmsg();
    if (data.length > 0) return listings(data);
    if (data.length == 0) return welcomemsg();
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <input
            className={s.input}
            type='text'
            placeholder={'Search'}
            onChange={this.updateSearchTerm}
          />
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

export default withStyles(SearchableList, s);

