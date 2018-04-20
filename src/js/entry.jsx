import React from 'react';
import ReactDOM from 'react-dom';
import './entry.css';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        entries: []
    };
  }
  componentDidMount(){
    this.doParse();
  }
  doParse(){
    var self = this;
    let Parser = require('rss-parser');
    let parser = new Parser();
    var promise = new Promise((resolve,reject)=>{
      parser.parseURL('http://crossorigin.me/http://rss.cnn.com/rss/cnn_topstories.rss').then(e=>{
        this.entries = e.items;
        resolve(this.entries);
        self.setState({entries:this.entries});
      })
    });
    return promise;
  }
  render() {
      var entries = this.state.entries.map((entry,v)=>{
        console.log(entry);
        return (<div key={v} className="entry">
        <h1>{entry.title}</h1>
        {entry.contentSnippet}
        <a href={entry.link}>{entry.link}</a>
        </div>);
      });
    return <div>{entries}</div>;
  }
}
var allEntries = new Array(10).fill(10);
ReactDOM.render(<Entry entries={allEntries}/>, document.getElementById('entry'));
