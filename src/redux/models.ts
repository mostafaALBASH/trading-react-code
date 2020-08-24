import { Action } from 'redux';
import {
  CREATE_REQUEST,
  LOAD_REPOS,
  LOAD_USERS,
  UPDATE_FLAG,
  LOAD_SELECT_OPTIONS,
  UPDATE_TEXT_ITEM,
  SET_LOADING
} from './types';

export interface CreateRequestAction extends Action<typeof CREATE_REQUEST> {}
export interface LoadReposAction extends Action<typeof LOAD_REPOS> {
  payload: {
    reposList: ReposList[];
  };
}
export interface LoadUsersAction extends Action<typeof LOAD_USERS> {
  payload: {
    usersList: UsersList[];
  };
}

export interface UpdateFlagAction extends Action<typeof UPDATE_FLAG> {
  payload: {
    itemsType: string;
  };
}

export interface SetRequestLoading extends Action<typeof SET_LOADING> {
  payload: {
    isLoading: boolean;
  };
}

export interface UpdateTextItem extends Action<typeof UPDATE_TEXT_ITEM> {
    payload: {
        itemText: string;
    };
  }

export interface LoadSelectOptions extends Action<typeof LOAD_SELECT_OPTIONS> {}

export interface UserEventsState {
  reposList: ReposList[];
  itemText:string;
  itemsType: string;
  usersList: UsersList[];
  itemsTypeLookup: string[];
  isLoading:boolean;
}
export interface ReposList {
  id: number;
  name: string;
  full_name: string;
  clone_url: string;
  stargazers_count: string;
  forks: number;
  open_issues: number;
  watchers: number;
  owner:Owner;
  language: string;
}
export interface Owner {
  login:string;
}
export interface UsersList {
  id: number;
  avatar_url: string;
  login: string;
  full_name: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  starred_url: string;
  repos_url: string;
}
