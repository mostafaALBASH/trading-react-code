import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import {
  CREATE_REQUEST,
  LOAD_REPOS,
  LOAD_USERS,
  UPDATE_FLAG,
  LOAD_SELECT_OPTIONS,
  UPDATE_TEXT_ITEM,
  SET_LOADING,
  REPO,
  USER,
} from './types';
import {
  CreateRequestAction,
  LoadReposAction,
  LoadUsersAction,
  UpdateFlagAction,
  UserEventsState,
  LoadSelectOptions,
  UpdateTextItem,
  SetRequestLoading,
} from './models';
import { stat } from 'fs';

const options = { 
  method: 'get', 
  headers: new Headers({
    'Authorization': 'fc80ef422b16c93290ff1b5eda3f6b7e7eb12ebf'
  })
}

export const reposSearch = (
  query: string
): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  CreateRequestAction | LoadReposAction | SetRequestLoading
> => async (dispatch) => {
  dispatch({
    type: CREATE_REQUEST,
  });

  if (query.length > 2) {
    dispatch({
      type: SET_LOADING,
      payload: { isLoading: true },
    });

    fetch(
      `https://api.github.com/search/repositories?q=${query}`,options
    )
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: LOAD_REPOS,
          payload: { reposList: res.items },
        })
      )
      .then(() => {
        dispatch({
          type: SET_LOADING,
          payload: { isLoading: false },
        });
      });
  } else {
    dispatch({
      type: LOAD_REPOS,
      payload: { reposList: [] },
    });
  }
};

export const usersSearch = (
  query: string
): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  CreateRequestAction | LoadUsersAction
> => async (dispatch) => { 
  dispatch({
    type: CREATE_REQUEST,
  });

  if (query.length > 2) {
    fetch(
      `https://api.github.com/search/users?q=${query}&sort=stars&order=desc`,options
    )
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: LOAD_USERS,
          payload: { usersList: res.items },
        })
      )
      .then(() => {});
  } else {
    dispatch({
      type: LOAD_USERS,
      payload: { usersList: [] },
    });
  }
};

export const setLoading = (
  isLoading: boolean
): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  SetRequestLoading
> => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: { isLoading },
  });
};

export const updateSearchTypeFlag = (
  itemsType: string
): ThunkAction<Promise<void>, RootState, undefined, UpdateFlagAction> => async (
  dispatch
) => {
  dispatch({
    type: UPDATE_FLAG,
    payload: { itemsType },
  });
};

export const updateSearchTextItem = (
  itemText: string
): ThunkAction<Promise<void>, RootState, undefined, UpdateTextItem> => async (
  dispatch
) => {
  dispatch({
    type: UPDATE_TEXT_ITEM,
    payload: { itemText },
  });
};

const selectAppFormState = (rootState: RootState) => rootState.appForm;

export const selectAppFormArray = (rootState: RootState) => {
  const state = selectAppFormState(rootState);
  return {
    ...state,
    listItems: {
      reposList: state.reposList,
      usersList: state.usersList,
      itemsType: state.itemsType,
      itemText: state.itemText,
      itemsTypeLookup: state.itemsTypeLookup,
      isLoading: state.isLoading,
    },
  };
};

const initialState: UserEventsState = {
  isLoading: false,
  itemText: '',
  reposList: [],
  usersList: [],
  itemsType: USER,
  itemsTypeLookup: [REPO, USER],
};

export const loadLookUp = (): ThunkAction<
  void,
  RootState,
  undefined,
  LoadSelectOptions
> => async (dispatch, getState) => {
  dispatch({
    type: LOAD_SELECT_OPTIONS,
  });
};

const appFormReducer = (
  state: UserEventsState = initialState,
  action:
    | LoadReposAction
    | LoadUsersAction
    | UpdateFlagAction
    | LoadSelectOptions
    | UpdateTextItem
    | SetRequestLoading
) => {
  switch (action.type) {
    case LOAD_REPOS:
      const { reposList } = action.payload;
      return {
        ...state,
        reposList,
      };

    case LOAD_USERS:
      const { usersList } = action.payload;
      return {
        ...state,
        usersList,
      };

    case UPDATE_FLAG:
      const { itemsType } = action.payload;
      return {
        ...state,
        itemsType,
      };
    case LOAD_SELECT_OPTIONS:
      return {
        ...state,
      };

    case UPDATE_TEXT_ITEM:
      const { itemText } = action.payload;
      return {
        ...state,
        itemText,
      };
    case SET_LOADING:
      const { isLoading } = action.payload;
      return {
        ...state,
        isLoading,
      };

    default:
      return state;
  }
};

export default appFormReducer; 
