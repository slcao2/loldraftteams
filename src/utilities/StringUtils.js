import _ from 'lodash';

let idCounter = 0;

export const lowerCaseRemoveSpaces = string => _.replace(_.toLower(_.trim(string)), ' ', '');

export const generateId = (id) => {
  const newId = `${id}_${idCounter}`;
  idCounter += 1;
  return newId;
};
