import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ToDoListReport from './ToDoListReport';
import Reset from './Reset';
import React, { Component as C } from 'react';
import { render as r } from 'react-dom';


const Content = () => (
  <main>
    <Switch>
      <Route exact path="/" component={ToDoListReport} />
      <Route path="/reset" component={Reset} />
    </Switch>
  </main>
);

const Menu = () => (
  <header>
    <ul>
      <li><Link to="/">ToDoList</Link></li>
      <li><Link to="/reset">ResetToDo</Link></li>

    </ul>
  </header>
);

const App = () => (
  <div><Menu /><Content />
  </div>);

r(
  <BrowserRouter><App /></BrowserRouter>,
  document.querySelector('.cont'),
);
