import { SET_LOCATION, SET_NALOXONE_AVAILABILITY } from "../actions/Types"

/**
 * TODO: save both "userLocation" and "deviceLastLocation" for emergency purposes
 * deviceLastLocation might need to be updated at intervals
 * (need to be decided when or how often if running in the back)
 */

const initialState = {
  location: {
    coords: {
      lat: 0,
      lng: 0,
    },
    note: ''
  },
  naloxoneAvailability: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, location: action.data.location };
    case SET_NALOXONE_AVAILABILITY:
      return { ...state, naloxoneAvailability: action.data.naloxoneAvailability };
    default:
      return state;
  }
}