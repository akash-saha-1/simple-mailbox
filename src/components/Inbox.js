import React, { Component } from 'react';
import { InboxHtml } from './templates/InboxHtml';
import ModalCompose from './ModalCompose';
import ModalMessage from './ModalMessage';
import messages from '../data/messages.json';

export class Inbox extends Component {
  constructor(props) {
    super(props);
    this.markRead = this.markRead.bind(this);
    this.doShow = this.doShow.bind(this);
    this.doDelete = this.doDelete.bind(this);
    this.doFlag = this.doFlag.bind(this);
    this.toggleMark = this.toggleMark.bind(this);
    this.toggleMarkAll = this.toggleMarkAll.bind(this);
    this.deleteMarked = this.deleteMarked.bind(this);
    this.refreshMessages = this.refreshMessages.bind(this);
    this.deleteMessages = this.deleteMessages.bind(this);
    this.flagMessages = this.flagMessages.bind(this);
    this.search = this.search.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.ModalMessage = React.createRef();
    this.ModalCompose = React.createRef();
    this.state = {
      initMessages: messages,
      messages: messages,
      allSearchMessages: messages,
      selected: {},
      deleted: [],
      flagged: [],
    };
  }

  markRead(idx) {
    /* mark this message as read */
    let messages = [...this.state.messages];
    messages[idx].read = true;
    this.setState({ messages });
  }

  doShow(idx) {
    this.markRead(idx);
    this.setState({
      selected: messages[idx],
    });
    /* open message in modal */
    this.ModalMessage.current.show();
  }

  doCompose() {
    /* open compose modal */
    this.ModalCompose.current.show();
  }

  toggleMark(idx) {
    let messages = [...this.state.messages];
    messages[idx].marked = messages[idx].marked ? 0 : 1;
    this.setState({ messages });
  }

  doDelete(idx) {
    let messages = [...this.state.messages];
    let deleted = [...this.state.deleted];
    let allSearchMessages = [...this.state.allSearchMessages];
    let flagged = [...this.state.flagged];
    /* append it to deleted */
    let message = messages[idx];
    deleted.push(messages[idx]);
    allSearchMessages = allSearchMessages.filter(
      (msg) => msg.id !== message.id
    );
    flagged = flagged.filter((msg) => msg.id !== message.id);
    /* remove the message at idx */
    messages.splice(idx, 1);
    this.setState({
      messages,
      deleted,
      allSearchMessages: allSearchMessages,
      flagged,
    });
  }

  doFlag(idx) {
    let messages = [...this.state.messages];
    let flagged = [...this.state.flagged];
    if (messages[idx].read === false && messages[idx].flagged === false) {
      messages[idx].flagged = true;
      /* append it to flagged */
      flagged.push(messages[idx]);
      this.setState({ messages, flagged });
    } else {
      return false;
    }
  }

  toggleMarkAll() {
    let messages = [...this.state.messages];
    messages.map((v, k) => {
      return (v.marked = v.marked ? 0 : 1);
    });
    this.setState({ messages });
  }

  deleteMarked() {
    var self = this;
    let messages = [...this.state.messages];
    var tbd = [];
    for (var k = 0; k < messages.length; k++) {
      if (messages[k].marked === 1) {
        tbd.push(k);
      }
    }

    if (tbd.length > 0) {
      self.deleteMessages(tbd);
    }
  }

  flagMarked() {
    var self = this;
    let messages = [...this.state.messages];
    var tbd = [];
    for (var k = 0; k < messages.length; k++) {
      if (messages[k].marked === 1) {
        tbd.push(k);
      }
    }

    if (tbd.length > 0) {
      self.flagMessages(tbd);
    }
  }

  refreshMessages() {
    let initMessages = [...this.state.initMessages];
    this.setState({ messages: initMessages });
  }

  deleteMessages(arr) {
    let messages = [...this.state.messages];
    let deleted = [...this.state.deleted];
    let allSearchMessages = [...this.state.allSearchMessages];
    let flagged = [...this.state.flagged];
    for (var i = arr.length - 1; i >= 0; i--) {
      let message = messages[i];
      deleted.push(messages[i]);
      messages.splice(arr[i], 1);
      allSearchMessages = allSearchMessages.filter(
        (msg) => msg.id !== message.id
      );
      flagged = flagged.filter((msg) => msg.id !== message.id);
    }
    this.setState({
      messages,
      deleted,
      allSearchMessages: allSearchMessages,
      flagged,
    });
  }

  flagMessages(arr) {
    let messages = [...this.state.messages];
    let flagged = [...this.state.flagged];
    for (var i = arr.length - 1; i >= 0; i--) {
      flagged.push(messages[i]);
    }
    this.setState({ flagged });
  }

  search(searchText) {
    let allSearchMessages = [...this.state.allSearchMessages];
    //let messages = [...this.state.messages];
    if (searchText === '') {
      this.setState({ messages: allSearchMessages });
    } else {
      let searchMessages = allSearchMessages.filter(
        (msg) =>
          msg.from.toLowerCase().includes(searchText) ||
          msg.fromAddress.toLowerCase().includes(searchText) ||
          msg.subject.toLowerCase().includes(searchText) ||
          msg.body.toLowerCase().includes(searchText)
      );
      this.setState({ messages: searchMessages });
    }
  }

  clearSearch() {
    let allSearchMessages = [...this.state.allSearchMessages];
    this.setState({ messages: allSearchMessages });
  }

  render() {
    return (
      <div>
        <InboxHtml parent={this} />
        <ModalCompose sendTo={this.state.selected.fromAddress} />
        <ModalMessage ref={this.ModalMessage} message={this.state.selected} />
      </div>
    );
  }
}

export default Inbox;
