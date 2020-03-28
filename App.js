import React from "react";
import { Router, Scene, Lightbox, ActionConst } from "react-native-router-flux";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import LoadingScreen from "./screens/LoadingScreen";
import UsingScreen from "./screens/UsingScreen";
import RespondingScreen from "./screens/RespondingScreen";
import AlarmScreen from "./screens/AlarmScreen";
import SnoozeScreen from "./screens/SnoozeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ResourceScreen from "./screens/ResourceScreen";
import MyRespondersScreen from "./screens/MyRespondersScreen";
import LocationScreen from './screens/LocationScreen';
import AddRespondersScreen from "./screens/AddRespondersScreen";
import RemoveRespondersScreen from "./screens/RemoveRespondersScreen";
import ResponderHelpRequestModal from "./screens/modals/ResponderHelpRequestModal";
import DirectionsScreen from "./screens/DirectionsScreen";
import DrawerContent from "./components/drawer/DrawerContent";
import Modal from "./components/popups/Modal";
import Alert from "./components/popups/Alert";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./store/reducers";

const store = createStore(reducers, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Lightbox>
          <Scene key="root">
            <Scene
              key="loading"
              component={LoadingScreen}
              title="Loading"
              hideNavBar
              initial
            />
            <Scene key="auth" type={ActionConst.REPLACE} hideNavBar>
              <Scene key="login" component={LoginScreen} title="Login" />
              <Scene key="signup" component={SignupScreen} title="Signup" />
            </Scene>
            <Scene
              key="main"
              drawer
              type={ActionConst.REPLACE}
              hideNavBar
              contentComponent={DrawerContent}
              headerMode="none"
            >
              <Scene key="using" component={UsingScreen} title="Using" initial />
              <Scene
                key="responding"
                component={RespondingScreen}
                title="Responding"
              />
              <Scene key="profile"
                component={ProfileScreen}
                title="Profile"
              />
              <Scene key="resource"
                component={ResourceScreen}
                title="Resource"
              />
              <Scene key="location"
                component={LocationScreen}
                title="Location"
              />
            </Scene>
            <Scene key="alarm" type={ActionConst.REPLACE} hideNavBar>
              <Scene
                key="start"
                component={AlarmScreen}
                title="Alarm Start"
                type={ActionConst.REPLACE}
                initial
              />
              <Scene
                key="snooze"
                component={SnoozeScreen} 
                title="Snooze"
                type={ActionConst.REPLACE}
              />
            </Scene>
            <Scene key="responders" hideNavBar>
              <Scene
                key="list"
                component={MyRespondersScreen}
                title="My Responders"
                initial
              />
              <Scene
                key="add"
                component={AddRespondersScreen}
                title="Add Responders"
              />
              <Scene
                key="remove"
                component={RemoveRespondersScreen}
                title="Remove Responders"
              />
            </Scene>
            <Scene key="assignment" type={ActionConst.REPLACE} hideNavBar>
              <Scene key="directions"
                component={DirectionsScreen}
                title="Directions"
                initial
              />
            </Scene>
          </Scene>
          <Scene
            key="responderHelpRequestModal"
            component={ResponderHelpRequestModal}
            hideNavBar
          />
          <Scene
            key="modal"
            component={Modal}
            hideNavBar
          />
          <Scene
            key="alert"
            component={Alert}
            hideNavBar
          />
        </Lightbox>
      </Router>
    </Provider>
  );
}
