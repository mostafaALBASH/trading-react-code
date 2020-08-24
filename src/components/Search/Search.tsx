import React, { useCallback, useEffect } from 'react';
import './Search.css';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import {
  reposSearch,
  usersSearch,
  updateSearchTypeFlag,
  loadLookUp,
  selectAppFormArray,
  updateSearchTextItem,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { REPO, USER } from '../../redux/types';

const that = this;

const mapState = (state: RootState) => ({
  listItems: selectAppFormArray(state),
});

const mapDispatch = {
  loadLookUp,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const Search: React.FC<Props> = ({ listItems, loadLookUp }) => {
  useEffect(() => {
    loadLookUp();
  }, []);

  let itemText = listItems.itemText;
  let itemsType = listItems.itemsType;
  let itemsTypeLookup = listItems.itemsTypeLookup;
  let len =
    listItems.itemsType === USER
      ? listItems.usersList
        ? listItems.usersList.length
        : 0
      : listItems.reposList
      ? listItems.reposList.length
      : 0;

  let debounce = (func: any, wait: any) => {
    let timeout: any;
    return (...args: any) => {
      const context = that;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  };

  const selectType = (type: string, text: any) => {
    dispatch(updateSearchTypeFlag(type));
    loadLookUp();
    getvals(type, text);
  };

  const onChange = (text: string, type: any) => {
    dispatch(updateSearchTextItem(text));
    loadLookUp();
    getvals(type, text);
  };

  const dispatch = useDispatch();
  const debounceOnChange = useCallback(debounce(onChange, 50), []);

  const getvals = (itemsType: any, searchText: any) => {
    if (itemsType === REPO) {
      dispatch(reposSearch(searchText));
    } else if (itemsType === USER) {
      dispatch(usersSearch(searchText));
    }
  };

  return (
    <div>
      <div className="App">
        <div className={len === 0 ? 'center-div' : ''}>
          <div className="top-section">
            <img
              className="logo"
              src="https://pngimg.com/uploads/github/github_PNG40.png"
            ></img>
            <span>
              <span>
                <b className="brand-title">GitHub Searcher</b>
              </span>
              <div className="search-span">
                Search users or repositories below
              </div>
            </span>
          </div>
          <input
            value={itemText}
            placeholder="Start typing to search .."
            onChange={(e) => debounceOnChange(e.target.value, itemsType)}
          />

          <select
            onChange={(e) => selectType(e.target.value, itemText)}
            value={itemsType}
          >
            {itemsTypeLookup.map(function (item) {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default connector(Search);
