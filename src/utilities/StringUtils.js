import _ from 'lodash';

export const lowerCaseRemoveSpaces = string => _.replace(_.toLower(_.trim(string)), ' ', '');
