const state = {
  searchUIValue: {
    value: '',
    enabled: true,
    region: 'NA',
  },
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
  visibility: {
    banner: [],
  },
};
