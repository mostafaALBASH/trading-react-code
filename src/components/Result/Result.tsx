import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './Result.scss';
import { RootState } from '../../redux/store';
import { selectAppFormArray } from '../../redux/actions';
import { ReposList, UsersList } from '../../redux/models';
import { REPO } from '../../redux/types';
const mapState = (state: RootState) => ({
  listItems: selectAppFormArray(state),
});

const mapDispatch = {};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {}
const Result: React.FC<Props> = ({ listItems }) => {
  useEffect(() => {}, []);

  const rList: ReposList[] = listItems.reposList;
  const uList: UsersList[] = listItems.usersList;
  const itype: string = listItems.itemsType;
  const isLoading: boolean = listItems.isLoading;

  return (
    <div>
      {
        <div>
          {isLoading ? (
            <h1>
              <b>Loading...</b>
            </h1>
          ) : (
            <div></div>
          )}
        </div>
      }
      {itype === REPO ? (
        <div className="cards">
          {rList ? (
            rList.map((item) => {
              return (
                <div className="item" key={item.id}>
                  <h4 className="cardTitle">{item.name}</h4>
                  <p className="itemInfo itemInfoAlign">
                    <span>
                      <b>Author: </b>
                    </span>
                    {item.owner.login}
                  </p>
                  <p className="itemInfo itemInfoAlign">
                    <span>
                      <b>Language: </b>
                    </span>
                    {item.language}
                  </p>
                  <p className="itemInfo itemInfoAlign">
                    <span>
                      <b>Stars: </b>
                    </span>
                    {item.stargazers_count}
                  </p>
                  <p className="itemInfo itemInfoAlign">
                    <span>
                      <b>Forks: </b>
                    </span>
                    {item.forks}
                  </p>
                  <p className="itemInfo itemInfoAlign">
                    <span>
                      <b>Watchers: </b>
                    </span>
                    {item.watchers}
                  </p>

                  <div className="btns">
                    <a
                      href={item.clone_url}
                      className="btn "
                    >
                      <i className=""></i> Repository
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div>API rate limit exceeded </div>
          )}
        </div>
      ) : (
        <div className="result">
          <div className="cards">
            {uList ? (
              uList.map((item) => {
                return (
                  <div className="item" key={`item_${item.id}`}>
                    <a href={item.html_url}>
                      <img
                        src={item.avatar_url}
                        alt="Project Image"
                        className="projectImg"
                      ></img>
                    </a>
                    <h4 className="cardTitle">{item.login}</h4>
                    <p className="itemInfo">{item.full_name}</p>
                    <div className="btns">
                      <a
                        href={item.html_url}
                        className="btn glyphicon glyphicon-user"
                      >
                        <i className=""></i> Profile
                      </a>
                      <a
                        href={item.repos_url}
                        className="btn "
                      >
                        <i className=""></i> Repositories
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>API rate limit exceeded</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default connector(Result);
