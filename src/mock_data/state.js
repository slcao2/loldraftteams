const state = {
  searchUIValue: '',
  searchRequest: [
    {
      isFetching: false,
      value: '',
      error: '',
    },
  ],
  playerList: [
    {
      summonerName: '',
      rank: '',
      roleValues: [0, 0, 0, 0, 0],
    },
  ],
  teamList: {
    teamOne: [],
    teamTwo: [],
  },
};
