/*
When adding same team link for player, check that every existing same team link for player does not have newly linked player as different team link.
Ex. Invalid Case
  {
    summonerName: 'r4nc0r',
    rank: 'D3',
    roles: [0.0513595166163142, 0.017522658610271902, 0.2350453172205438, 0.6235649546827795, 0.07250755287009064],
    sameTeam: ['iriserende', 'actual'],
    differentTeam: [],
  },
  {
    summonerName: 'iriserende',
    rank: 'G3',
    roles: [0.0436817472698908, 0.01014040561622465, 0.0436817472698908, 0.027301092043681748, 0.875195007800312],
    sameTeam: ['r4nc0r'],
    differentTeam: [],
  },
  {
    summonerName: 'actual',
    rank: 'G3',
    roles: [0.013628620102214651, 0.7853492333901193, 0.013628620102214651, 0.04202157864849517, 0.14537194775695628],
    sameTeam: ['r4nc0r'],
    differentTeam: ['ryan ni'],
  },
  {
    summonerName: 'ryan ni',
    rank: 'D3',
    roles: [0.474792243767313, 0.3113573407202216, 0.0853185595567867, 0.027146814404432132, 0.10138504155124654],
    sameTeam: [],
    differentTeam: ['actual'],
  },
  In this case, when I added actual, I would check if iriserende has actual as a different team link.
  Iriserende does not have a different team link so I can add actual as a same team link.
  When I try to add ryan ni as a same team link, I check iriserende and actual if they have him as a different team link.
  Since actual has ryan ni as a different team link, I can't add ryan ni as a same team link.
  This should be validated from end side, pre-PlayerMatchingService.
  PlayerMatchingService should expect perfect validated inputs.
 */

/*
For validating same pairs, sort by highest number pair.
If 4 or 2, require a solo player.
If 3, require a pair of players.
if 1 or 5, no special case needed.

A player can only have 4 same team links.

A player's sameTeam array should be the same for every player in that array.
Ex. r4nc0r has iriserende and actual in his sameTeam. Iriserende should have actual and r4nc0r and actual should have iriserende and r4nc0r.
Likewise, they should share the same differentTeam array.
 */

/*
In the PlayerMatchingService, find the highest number pair and add them to one team.
Sort them into their roles.
For each role, find the closest value to that role and add that player to the other team.
Find the next highest number pair and add it to the other team.
Repeat the above.
 */

/*
Proceed with normal PlayerMatchingService.
After teams are created, swap player from one team with the other player in the same position.
 */

const mockPlayerList = [
  {
    summonerName: 'r4nc0r',
    rank: 'D3',
    roles: [0.0513595166163142, 0.017522658610271902, 0.2350453172205438, 0.6235649546827795, 0.07250755287009064],
    sameTeam: ['iriserende', 'actual'],
    differentTeam: ['ryan ni'],
  },
  {
    summonerName: 'iriserende',
    rank: 'G3',
    roles: [0.0436817472698908, 0.01014040561622465, 0.0436817472698908, 0.027301092043681748, 0.875195007800312],
    sameTeam: ['r4nc0r', 'actual'],
    differentTeam: ['ryan ni'],
  },
  {
    summonerName: 'actual',
    rank: 'G3',
    roles: [0.013628620102214651, 0.7853492333901193, 0.013628620102214651, 0.04202157864849517, 0.14537194775695628],
    sameTeam: ['r4nc0r', 'iriserende'],
    differentTeam: ['ryan ni'],
  },
  {
    summonerName: 'whae',
    rank: 'P3',
    roles: [0.503, 0.093, 0.144, 0.157, 0.103],
    sameTeam: [],
    differentTeam: [],
  },
  {
    summonerName: 'mellowjoey',
    rank: 'D3',
    roles: [0.059892328398384924, 0.7765814266487214, 0.11641991924629878, 0.0026917900403768506, 0.04441453566621804],
    sameTeam: [],
    differentTeam: [],
  },
  {
    summonerName: 'to love',
    rank: 'D3',
    roles: [0.0410377358490566, 0.014622641509433962, 0.6023584905660377, 0.3089622641509434, 0.0330188679245283],
    sameTeam: [],
    differentTeam: [],
  },
  {
    summonerName: 'anger',
    rank: 'P3',
    roles: [0.059637912673056445, 0.051118210862619806, 0.645367412140575, 0.023429179978700747, 0.22044728434504793],
    sameTeam: [],
    differentTeam: [],
  },
  {
    summonerName: 'ryan ni',
    rank: 'D3',
    roles: [0.474792243767313, 0.3113573407202216, 0.0853185595567867, 0.027146814404432132, 0.10138504155124654],
    sameTeam: [],
    differentTeam: ['actual'],
  },
  {
    summonerName: 'bhasket',
    rank: 'P3',
    roles: [0.05984766050054407, 0.23884657236126225, 0.6169749727965179, 0.03808487486398259, 0.046245919477693145],
    sameTeam: [],
    differentTeam: [],
  },
  {
    summonerName: 'doomlord6z',
    rank: 'D3',
    roles: [0.819325328759291, 0.08633504859919955, 0.024013722126929673, 0.040022870211549454, 0.030303030303030304],
    sameTeam: [],
    differentTeam: [],
  },
];

const mirrorTeamsOnlySingleRolePlayerList = [
    
];

export default mockPlayerList;

