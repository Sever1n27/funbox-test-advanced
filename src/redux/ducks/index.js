import { createSelector } from 'reselect';

// Actions
export const moduleName = 'main';
const ADD_POINT = `${moduleName}/ADD_POINT`;
const REMOVE_POINT = `${moduleName}/REMOVE_POINT`;
const REORDER_LIST = `${moduleName}/REORDER_LIST`;
const CHANGE_POINT = `${moduleName}/CHANGE_POINT`;

// Reducer
const initialState = {
  points: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POINT:
      return {
        ...state,
        points: [...state.points, action.payload.point]
      };
    case REMOVE_POINT:
      return {
        ...state,
        points: action.payload.points
      };
    case CHANGE_POINT:
      return {
        ...state,
        points: action.payload.points
      };
    case REORDER_LIST:
      return {
        ...state,
        points: action.payload.points
      };
    default:
      return state;
  }
}

// Action Creators

export function addPoint(point) {
  return {
    type: ADD_POINT,
    payload: {
      point
    }
  };
}

export function removePoint(points) {
  return {
    type: REMOVE_POINT,
    payload: {
      points
    }
  };
}

export function reorderList(points) {
  return {
    type: REORDER_LIST,
    payload: {
      points
    }
  };
}

export function changePoint(points) {
  return {
    type: CHANGE_POINT,
    payload: {
      points
    }
  };
}

// Thunks

export function newPoint(point) {
  return dispatch => {
    dispatch(addPoint(point));
  };
}

export function customizePoint(point, index) {
  return (dispatch, getState) => {
    const { points } = getState().main;
    dispatch(changePoint(Object.assign([], points, { [index]: point })));
  };
}

export function deletePoint(point) {
  return (dispatch, getState) => {
    const { points } = getState().main;
    dispatch(removePoint(points.filter(item => item.name !== point)));
  };
}

export function newOrder(from, to) {
  return (dispatch, getState) => {
    const { points } = getState().main;
    const newArray = Array.from(points);
    const cutOut = newArray.splice(from, 1)[0];
    newArray.splice(to, 0, cutOut);
    dispatch(reorderList(newArray));
  };
}

// Selectors

export const pointsSelector = createSelector(
  state => state[moduleName].points,
  points => points
);
