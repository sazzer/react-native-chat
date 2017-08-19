import React from 'react';
import { StyleSheet, Text, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import { Constants } from 'expo';

export default class ChatView extends React.Component {
  constructor(props) {
    super(props);

    this.handleSendMessage = this.onSendMessage.bind(this);
  }


  onSendMessage(e) {
    this.props.onSendMessage(e.nativeEvent.text);
    this.refs.input.clear();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <FlatList data={ this.props.messages } 
                  renderItem={ this.renderItem } 
                  style={ styles.messages }
                  ref="messages" />

        <TextInput autoFocus
                   keyboardType="default" 
                   returnKeyType="done"
                   enablesReturnKeyAutomatically
                   style={ styles.input }
                   blurOnSubmit={ false }
                   onSubmitEditing={ this.handleSendMessage }
                   ref="input"
                   />
      </KeyboardAvoidingView>
    );
  }

  renderItem({item}) {
    const action = item.action;
    const name = item.name;

    if (action == 'join') {
        return <Text style={ styles.joinPart }>{ name } has joined</Text>;
    } else if (action == 'part') {
        return <Text style={ styles.joinPart }>{ name } has left</Text>;
    } else if (action == 'message') {
        return <Text>{ name }: { item.message }</Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight
  },
  messages: {
    alignSelf: 'stretch'
  },
  input: {
    alignSelf: 'stretch'
  },
  joinPart: {
    fontStyle: 'italic'
  }
});


