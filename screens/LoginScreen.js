import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import theme from "../styles/base"
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { Button, Switch } from "../components/buttons";
import { Form, Input } from "../components/forms";
import { connect } from 'react-redux';
import { SERVER_ROOT } from 'react-native-dotenv';
import { loginHandler, setLoading } from '../store/actions';

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      rememberMe: false
    };
    this.setRememberMe = this.setRememberMe.bind(this);
    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
    this.renderLoginButtonOrSpinner = this.renderLoginButtonOrSpinner.bind(this);
  }

  setRememberMe() {
    if (this.state.rememberMe) {
      this.setState({ rememberMe: false });
    } else {
      this.setState({ rememberMe: true });
    }
  }

  onLoginButtonPress() {
    const { username, password, rememberMe } = this.state;
    console.log("[DEBUG] LOGIN Button pressed.");
    console.log("[DEBUG] username is " + username + ", password is " + password);
    this.props.setLoading(true);
    this.props.loginHandler({ username: username, password: password }, rememberMe);
  }

  renderLoginButtonOrSpinner() {
    return (this.props.auth.loading) ?
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
                onSubmitEditing={() => Actions.signup()}
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
    justifyContent: "flex-start",
  },
  signupButton: {
    flex: 3,
  }
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { loginHandler, setLoading })(LoginScreen);