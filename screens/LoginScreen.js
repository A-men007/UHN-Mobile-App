import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import theme from "../styles/base"
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { Button, Switch } from "../components/buttons";
import { Form, Input } from "../components/forms";
import * as axios from 'axios';
import { SERVER_ROOT } from 'react-native-dotenv';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.initialState = {
      username: "",
      password: "",
      error: "",
      loading: false,
      rememberMe: false
    };
    this.state = this.initialState;
    this.setRememberMe = this.setRememberMe.bind(this);
    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);
  }

  setRememberMe() {
    if (this.state.rememberMe) {
      this.setState({ rememberMe: false });
    } else {
      this.setState({ rememberMe: true });
    }
  }

  onLoginButtonPress() {
    const { username, password } = this.state;
    console.log("[DEBUG] LOGIN Button pressed.");
    console.log("[DEBUG] username is " + username + ", password is " + password);

    this.setState({ loading: true });

    axios.post(SERVER_ROOT + '/login', {
      username: username,
      password: password,
    }).then(this.onLoginSuccess)
    .catch(this.onLoginFailed);
  }

  onLoginSuccess(response) {
    console.log(response);
    this.setState({loading: false});
    Actions.main();
  }

  onLoginFailed(error) {
    console.log(error);
    this.setState({loading: false});
  }

  renderLoginButtonOrSpinner() {
    return (this.state.loading) ?
      (<Spinner />) 
      :
      (<Button variant="primary" onPress={this.onLoginButtonPress}>
        login
        </Button>
      );
  }

  render() {
    let passwordInputRef = React.createRef();

    return (
      <Container>
        <Header>Hello</Header>

        <Content>
          <Form>
            <View style={styles.loginInfo}>
              <Input variant="text"
                label="Username"
                hasNext
                onChangeText={username => {
                  this.setState({ username: username });
                  console.log(this.state.username);
                }}
                onSubmitEditing={() => passwordInputRef._root.focus()}
              />
              <Input variant="text"
                label="Password"
                ref={(input) => passwordInputRef = input}
                onChangeText={password => {
                  this.setState({ password: password });
                  console.log(this.state.password);
                }}
              />
            </View>

            <View style={styles.rememberMe}>
              <Text variant="footnote">remember me</Text>
              <Switch style={styles.rememberMeSwitch} value={this.state.rememberMe} onValueChange={this.setRememberMe} />
            </View>

            <View style={styles.loginButton}>
              {this.renderLoginButtonOrSpinner()}
            </View>

            <View style={styles.signupButton}>
              <Button variant="secondary" onPress={() => Actions.signup()}>sign up</Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loginInfo: {
    flex: 0,
  },
  rememberMe: {
    flex: 2,
    flexDirection: "row",
    marginTop: theme.layout.margin,
    alignSelf: "flex-end",
  },
  rememberMeSwitch: {
    marginLeft: theme.layout.margin,
  },
  loginButton: {
    flex: 6,
  },
  signupButton: {
    flex: 2,
  }
});
