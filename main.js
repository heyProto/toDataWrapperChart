import React from 'react';
import { render } from 'react-dom';
import Card from './src/js/card.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toDWChart = function() {
    this.cardType = 'DWChart';
}

ProtoGraph.Card.toDWChart.prototype.init = function(options) {
    this.options = options;
}

ProtoGraph.Card.toDWChart.prototype.getData = function(data) {
    return this.containerInstance.exportData();
}

ProtoGraph.Card.toDWChart.prototype.renderCol4 = function(data) {
    this.mode = 'col4';
    this.render();
}
ProtoGraph.Card.toDWChart.prototype.renderCol7 = function(data) {
    this.mode = 'col7';
    this.render();
}
ProtoGraph.Card.toDWChart.prototype.renderCol16 = function(data) {
    this.mode = 'col16';
    this.render();
}
ProtoGraph.Card.toDWChart.prototype.render = function(data) {
    render( <
        Card dataURL = { this.options.data_url }
        mode = { this.mode }
        siteConfigURL = { this.options.site_config_url }
        siteConfigs = { this.options.site_configs }
        ref = {
            (e) => {
                this.containerInstance = this.containerInstance || e;
            }
        }
        />,
        this.options.selector);
}