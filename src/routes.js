import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AbsenceManager from './pages/AbsenceManager';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ AbsenceManager } />
      </Switch>
    </BrowserRouter>
  );
}
