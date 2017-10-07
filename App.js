import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, StyleSheet, View, Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Grid, Col } from 'native-base';
import { getInfo, saveInfo, updateInfo } from './actions';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { key: '' }
  }

  componentDidMount() {
    AsyncStorage.getItem('key', (err, result)=>{
      if (result) {
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
    if (this.state.key) 
      this.props.updateInfo(data, this.state.key);
    else 
      this.props.saveInfo(data);
    
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
