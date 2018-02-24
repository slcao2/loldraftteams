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
      roles: [0, 0, 0, 0, 0],
    },
  ],
  teamList: {
    teamOne: [],
    teamTwo: [],
  },
};
