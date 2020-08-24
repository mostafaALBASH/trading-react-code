# React Typescript Redux-Persist

* Basic Techs
  * React
   * TypeScript
  * Redux
  * redux-persist
  * React-Router
* Styling
  * CSS
  * Sass

## Getting Started


```shell
git clone git@github.com:mostafaALBASH/tradeling-coding-react.git 
cd 
npm install
npm start

$ git clone https://github.com/mostafaALBASH/tradeling-coding-react.git
$ cd tradeling-coding-react
$ npm install
$ npm start
$ npm run test:watch
```

## Areas of Development

```text
.
:.
|   jest.config.js
|   package.json
|   README.md
|   tree
|   tsconfig.json
|   
public
|       favicon.ico
|       index.html
|       logo192.png
|       logo512.png
|       manifest.json
|       robots.txt
|       
src
    |   globals.d.ts
    |   index.css
    |   index.tsx
    |   react-app-env.d.ts
    |   setupTests.ts
    |   
    components
    |   App
    |   |       App.css
    |   |       App.tsx
    |   |       
    |   Result
    |   |       index.ts
    |   |       Result.scss
    |   |       Result.tsx
    |   |       
    |   Search
    |   |       index.ts
    |   |       Search.css
    |   |       Search.tsx
    |   |       
    |   __test__
    |           Search.test.tsx
    |           
    redux
            actions.ts
            models.ts
            store.ts
            test.html
            types.ts
```


in the root of project you can find `jest.config.js` adding `"test:watch": "jest --watchAll"` in `tsconfig.json` has the esModuleInterop flag enabled for compatibility with Jest 

Under the `src` folder you will find the `index.tsx` where App wrapped with `react-redux` and `react-router`.
Under the `redux` folder you will find the `store.ts` where `redux-persist, persistReducer` configured.


## App URL on Heroku

`https://immense-earth-08618.herokuapp.com/`
