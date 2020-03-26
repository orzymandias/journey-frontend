import React, { useState } from "react";
import Mission from "./pages/Mission";
import MissionOverview from "./pages/MissionOverview";
import Playground from "./pages/Playground";
import NavBar2 from "./NavBar/NavBar2";
import AssessmentContainer from "./assessment/mockAssessmentContainer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SideBarContextProvider } from "./NavBar/SideBarContext";
import { StoreProvider } from "./Store";

function App() {
  return (
    <CssBaseline>
      <SideBarContextProvider>
        <StoreProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={NavBar2} />
              <Route exact path="/mission" component={MissionOverview} />
              <Route path="/mission/:missionID/:page" component={Mission} />
              <Route path="/playground" component={Playground} />
              <Route path="/assessment" component={AssessmentContainer} />
            </Switch>
          </BrowserRouter>
        </StoreProvider>
      </SideBarContextProvider>
    </CssBaseline>
  );
}

export default App;
