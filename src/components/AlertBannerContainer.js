import { connect } from 'react-redux';

import AlertBanner from './AlertBanner';
import { removeBanner } from '../actions/bannerActions';

const mapStateToProps = state => ({
  banners: state.visibility.banners,
});

const mapDispatchToProps = dispatch => ({
  handleRemoveClick: (banner) => {
    dispatch(removeBanner(banner));
  },
});

const AlertBannerContainer = connect(mapStateToProps, mapDispatchToProps)(AlertBanner);

export default AlertBannerContainer;
