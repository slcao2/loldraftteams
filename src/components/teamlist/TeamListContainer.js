import { connect } from 'react-redux';

import TeamList from './TeamList';

const mapStateToProps = state => ({
  teams: state.teamList,
});

const TeamListContainer = connect(mapStateToProps)(TeamList);

export default TeamListContainer;
