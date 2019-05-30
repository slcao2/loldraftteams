import React from 'react';
import PropTypes from 'prop-types';

const SearchHistory = ({
  handleBlur, handleFocus, handleRemoveClick, handleTextClick, historyList, region,
}) => {
  const renderHistory = historyList.map(historyItem => (
    <li key={historyItem} className="list-group-item search-history-item">
      <div className="prefix-icon"><i className="fa fa-times fa-lg" aria-hidden="true" onClick={event => (handleRemoveClick(historyItem))} /></div>
      <div className="search-text" role="button" onClick={event => (handleTextClick(historyItem, region))}>{ historyItem }</div>
    </li>
  ));

  return (
    <ul
      className="list-group search-history-list"
      onFocus={event => handleFocus()}
      onBlur={event => handleBlur()}
      tabIndex="0"
    >
      { renderHistory }
    </ul>
  );
};

SearchHistory.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
  handleTextClick: PropTypes.func.isRequired,
  historyList: PropTypes.arrayOf(PropTypes.string),
  region: PropTypes.string,
};

SearchHistory.defaultProps = {
  historyList: [],
  region: 'NA',
};

export default SearchHistory;
