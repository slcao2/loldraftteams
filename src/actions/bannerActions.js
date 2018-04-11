export const ADD_BANNER = 'ADD_BANNER';
export const REMOVE_BANNER = 'REMOVE_BANNER';

export function addBanner(id, message) {
  return { type: ADD_BANNER, id, message };
}

export function removeBanner(id) {
  return { type: REMOVE_BANNER, id };
}
