import React from 'react';
import PropTypes from 'prop-types';

const PlayerList = ({ banners, handleRemoveClick }) => {
  const renderBanner = banners.map(banner => (
    <li key={banner.id} className="list-group-item list-group-item-danger">
      <div className="banner-text">{banner.message}</div>
      <button type="button" className="close" onClick={event => handleRemoveClick(banner.id)} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </li>
  ));

  return (
    <ul className="list-group banners">
      {renderBanner}
    </ul>
  );
};

PlayerList.propTypes = {
  banners: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string,
  })),
  handleRemoveClick: PropTypes.func.isRequired,
};

PlayerList.defaultProps = {
  banners: [],
};

export default PlayerList;
