import { Enum } from 'enumify';

class RankedTierEnum extends Enum {}
RankedTierEnum.initEnum({
  UNRANKED: {
    shortName: 'U',
  },
  BRONZE: {
    shortName: 'B',
  },
  BRONZE_V: {
    tier: 'BRONZE',
    shortName: 'B5',
  },
  BRONZE_IV: {
    tier: 'BRONZE',
    shortName: 'B4',
  },
  BRONZE_III: {
    tier: 'BRONZE',
    shortName: 'B3',
  },
  BRONZE_II: {
    tier: 'BRONZE',
    shortName: 'B2',
  },
  BRONZE_I: {
    tier: 'BRONZE',
    shortName: 'B1',
  },
  SILVER: {
    shortName: 'S',
  },
  SILVER_V: {
    tier: 'SILVER',
    shortName: 'S5',
  },
  SILVER_IV: {
    tier: 'SILVER',
    shortName: 'S4',
  },
  SILVER_III: {
    tier: 'SILVER',
    shortName: 'S3',
  },
  SILVER_II: {
    tier: 'SILVER',
    shortName: 'S2',
  },
  SILVER_I: {
    tier: 'SILVER',
    shortName: 'S1',
  },
  GOLD: {
    shortName: 'G',
  },
  GOLD_V: {
    tier: 'GOLD',
    shortName: 'G5',
  },
  GOLD_IV: {
    tier: 'GOLD',
    shortName: 'G4',
  },
  GOLD_III: {
    tier: 'GOLD',
    shortName: 'G3',
  },
  GOLD_II: {
    tier: 'GOLD',
    shortName: 'G2',
  },
  GOLD_I: {
    tier: 'GOLD',
    shortName: 'G1',
  },
  PLATINUM: {
    shortName: 'P',
  },
  PLATINUM_V: {
    tier: 'PLATINUM',
    shortName: 'P5',
  },
  PLATINUM_IV: {
    tier: 'PLATINUM',
    shortName: 'P4',
  },
  PLATINUM_III: {
    tier: 'PLATINUM',
    shortName: 'P3',
  },
  PLATINUM_II: {
    tier: 'PLATINUM',
    shortName: 'P2',
  },
  PLATINUM_I: {
    tier: 'PLATINUM',
    shortName: 'P1',
  },
  DIAMOND: {
    shortName: 'D',
  },
  DIAMOND_V: {
    tier: 'DIAMOND',
    shortName: 'D5',
  },
  DIAMOND_IV: {
    tier: 'DIAMOND',
    shortName: 'D4',
  },
  DIAMOND_III: {
    tier: 'DIAMOND',
    shortName: 'D3',
  },
  DIAMOND_II: {
    tier: 'DIAMOND',
    shortName: 'D2',
  },
  DIAMOND_I: {
    tier: 'DIAMOND',
    shortName: 'D1',
  },
  MASTER: {
    shortName: 'M',
  },
  MASTER_I: {
    tier: 'MASTER',
    shortName: 'M1',
  },
  CHALLENGER: {
    shortName: 'C',
  },
  CHALLENGER_I: {
    tier: 'CHALLENGER',
    shortName: 'C1',
  },
});

export const getEnumFromShortName = (name) => {
  const values = Object.values(RankedTierEnum);
  const enumValue = values.find(value => value.shortName === name);
  return enumValue;
};

export const getEnumWeightValue = (value) => {
  const maxValue = RankedTierEnum.CHALLENGER_I.ordinal;
  // return value;
  // return value / maxValue;
  // return Math.exp(value) / Math.exp(maxValue);
  return Math.exp(value / maxValue);
};

export default RankedTierEnum;
