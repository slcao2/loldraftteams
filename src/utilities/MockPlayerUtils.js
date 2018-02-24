const DUPLICATE_PLAYER = 'DUPLICATE_PLAYER';

const generateMockPlayer = (name, rank, roles) => ({
  summonerName: name,
  rank,
  roles,
});

const generateDuplicatePlayers = (name, rank, roles, iterations) => {
  const playerList = [];
  for (let i = 0; i < iterations; i += 1) {
    playerList.push(generateMockPlayer(name + i, rank, roles));
  }
  return playerList;
};

const generateListOfPlayers = (action, name, rank, roles, iterations) => {
  switch (action) {
    case DUPLICATE_PLAYER:
      return generateDuplicatePlayers(name, rank, roles, iterations);
    default:
      return [];
  }
};

export { generateMockPlayer, generateListOfPlayers, DUPLICATE_PLAYER };
