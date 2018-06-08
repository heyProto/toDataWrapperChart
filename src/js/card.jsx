import React from 'react';
import { render } from 'react-dom';
import { all as axiosAll, get as axiosGet, spread as axiosSpread } from 'axios';

export default class toDWChart extends React.Component {
  constructor(props) {
    super(props)

    let stateVar = {
      fetchingData: true,
      dataJSON: undefined,
      optionalConfigJSON: {},
    };
    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }


    
    if (this.props.siteConfigs) {
      stateVar.siteConfigs = this.props.siteConfigs;
    }
    this.state = stateVar;
  }

  exportData() {
    return document.getElementById('protograph-div').getBoundingClientRect();
  }

  componentDidMount() {
    // get sample json data based on type i.e string or object
    if (this.state.fetchingData){
      let items_to_fetch = [
        axiosGet(this.props.dataURL)
      ];
      if (this.props.siteConfigURL) {
        items_to_fetch.push(axiosGet(this.props.siteConfigURL));
      }
      axiosAll(items_to_fetch).then(
        axiosSpread((card,site_configs) => {
          let stateVar = {
            fetchingData: false,
            dataJSON: card.data,
            siteConfigs: site_configs ? site_configs.data : this.state.siteConfigs
          };
          this.setState(stateVar);
        })
      )
    }else{
      this.componentDidUpdate();
    }
  }

  componentWillReceiveProps(){
    //Manipulation of form data to change what is shown in the card can be done here
  }
  componentDidUpdate() {

  }
  componentWillMount(){
    //Changes before rendering can be made here
  }

  parseQuery (queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }

  parseUrl(url) {
    var parser = document.createElement('a'),
      search;
    parser.href = url;
    search = this.parseQuery(parser.search);
    return {
      protocol: parser.protocol, // => "http:"
      host: parser.host,     // => "example.com:3000"
      hostnam: parser.hostname, // => "example.com"
      port: parser.port,     // => "3000"
      pathname: parser.pathname, // => "/pathname/"
      hash: parser.hash,     // => "#hash"
      searchString: parser.search,
      search: search,   // => "?search=test"
      origin: parser.origin   // => "http://example.com:3000"
    };
  }

  renderDWChart() {
    let data = this.state.dataJSON.data;
    let url = data.chart_url;
    return (
      <div className="protograph-toDWChart-chart">
        <iframe src={url} height={data[this.props.mode+"-height"]+"px"} className={this.props.mode} scrolling="no" allowTransparency="true"></iframe>
      </div>
    )
  }

  renderCol() {
    if (this.state.fetchingData){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.data;
      return (
        <div id="protograph-div" className="protograph-laptop-mode">
          <div className={`protograph-card ${this.props.mode}`}>
            <div className="protograph-toDWChart-youtube-container">{this.renderDWChart()}</div>
          </div>
        </div>
      )
    }
  }
  
  render() {
    return this.renderCol();
  }
}
