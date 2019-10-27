import React from "react";
import { Router, Scene } from "react-native-router-flux";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import LoadingScreen from "./screens/LoadingScreen";
import UsingScreen from "./screens/UsingScreen";
import RespondingScreen from "./screens/RespondingScreen";
import AlarmScreen from "./screens/AlarmScreen";
import SnoozeScreen from "./screens/SnoozeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ResourceScreen from "./screens/ResourceScreen";
import DrawerContent from "./components/drawer/DrawerContent";

export default function App() {
  return (
    <Router>
      <Scene key="root">
        <Scene key="loading"
          component={LoadingScreen}
          title="Loading"
          hideNavBar
          initial
        />
        <Scene key="auth" type="reset" hideNavBar duration={0}>
          <Scene key="login"
            component={LoginScreen}
            title="Login"
          />
          <Scene key="signup"
            component={SignupScreen}
            title="Signup"
          />
        </Scene>
        <Scene key="main" drawer type="reset" hideNavBar contentComponent={DrawerContent}>
          <Scene key="using"
            component={UsingScreen}
            title="Using"
            initial
          />
          <Scene key="responding"
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
        </Scene>
        <Scene key="alarm" type="reset" hideNavBar duration={0}>
          <Scene key="start"
            component={AlarmScreen}
            title="Alarm Start"
            initial
          />
          <Scene key="snooze"
            component={SnoozeScreen}
            title="Snooze"
          />
        </Scene>
      </Scene>
    </Router>
  );
}