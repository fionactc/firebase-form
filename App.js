import React from 'react';
import { AsyncStorage, StyleSheet, View, Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Grid, Col } from 'native-base';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { getInfo, saveInfo, updateInfo } from './actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('key', (err, result)=>{
      if (result) {
        console.log('found key', result);
        this.setState({ key: result });
        this.props.getInfo(result);
      } 
    })
  }

  componentWillReceiveProps(props) {
    if (props.key) {
      this.setState({ key: props.key })
    }
    if (props.info) {
      let data = props.info;
      this.setState({
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company,
        department: data.department,
        position: data.position,
        email: data.email
      })
    }
  }

    // try {
    //   // dispatch getKey
    //   AsyncStorage.getItem('key', (err, result)=>{
    //     if (result) {
    //       this.setState({ storageKey: result })

    //       firebase.database().ref(result).once('value').then((info)=>{
    //         if (info) {
    //           console.log('Populating form...', info.val());
    //           let data = info.val();
    //           this.setState({
    //             firstName: data.firstName,
    //             lastName: data.lastName,
    //             company: data.company,
    //             department: data.department,
    //             position: data.position,
    //             email: data.email
    //           })
    //         }
    //       })
    //     }
    //   })
    // } catch(error) {
    //   console.error(error);
    // }

  onSaveClick = ()=>{
    let userId = '1';
    let data = {
      firstName: this.state.firstName || null,
      lastName: this.state.lastName || null,
      company: this.state.company || null,
      department: this.state.department || null,
      position: this.state.position || null,
      email: this.state.email || null
    }
    if (this.state.key) {
      console.log('this is key', this.state.key);
      this.props.updateInfo(data, this.state.key);
    } else {
      this.props.saveInfo(data);
    }

    // if (this.state.storageKey) {
    //   console.log('Updating...')
    //   let update = {};
    //   update[this.state.storageKey] = data;
    //   firebase.database().ref().update(update);

    // } else {
    //   console.log('Creating new...');
    //   let key = firebase.database().ref().child('users').push().key;

    //   AsyncStorage.setItem('key', key);
    //   let update = {};
    //   update[key] = data;
    //   firebase.database().ref().update(update);
    // }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header />
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>First Name</Label>
              <Input 
                onChangeText={(firstName)=> this.setState({firstName})}
                value={this.state.firstName}
              />
            </Item>

            <Item fixedLabel>
              <Label>Last Name</Label>
              <Input 
                onChangeText={(lastName)=> this.setState({lastName})}
                value={this.state.lastName}
              />
            </Item>

            <Item fixedLabel>
              <Label>Company</Label>
              <Input 
                onChangeText={(company)=> this.setState({company})}
                value={this.state.company}
              />
            </Item>

            <Item fixedLabel>
              <Label>Department</Label>
              <Input 
                onChangeText={(department)=> this.setState({department})}
                value={this.state.department}
              />
            </Item>

            <Item fixedLabel>
              <Label>Position</Label>
              <Input 
                onChangeText={(position)=> this.setState({position})}
                value={this.state.position}
              />
            </Item>

            <Item fixedLabel>
              <Label>Email</Label>
              <Input 
                onChangeText={(email)=> this.setState({email})}
                value={this.state.email}
              />
            </Item>
          </Form>
          <Grid style={{ alignItems: 'center' }}>
            <Col>
              <Button primary style={styles.button} onPress={this.onSaveClick}>
                <Text style={styles.buttonText}>Save</Text>
              </Button>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps (state) {
  console.log('this is state', state);
  return {
    key: state.key,
    info: state.info
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getInfo: (key)=> dispatch(getInfo(key)),
    saveInfo: (data) => dispatch(saveInfo(data)),
    updateInfo: (data, key) => dispatch(updateInfo(data, key))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignSelf: 'auto'
  },
  buttonText: {
    textAlign: 'center',
    width: '100%'
  }
});
