/**
 * Created by tao.qit(导演) on 15/8/19.
 *
 */

var Class = require('../base/class');

var Base = Class.create({
    initialize : function(zChart){
        if(zChart){
            this.options = zChart.options;
            this.svg = zChart.svg;
        }
    },

    xScale : function(){
        var range = [0, this.quadrantWidth() ];
        var domain = this.options.xAxis.data;
        // 适用于柱状图的ordinal scale
        var scale = d3.scale.ordinal()
            .rangeRoundBands(range, .2)
            .domain(domain);

        return scale;
    },

    yScale : function(){
        var range = [this.quadrantHeight(), 0];
        var domain = d3.extent(this.options.series[0].data);

        var scale = d3.scale.linear()
            .range(range)
            .domain(domain);

        return scale;
    },

    xStart : function () {
        return this.options.margin.left;
    },

    yStart : function () {
        return this.options.height - this.options.margin.bottom;
    },

    xEnd : function () {
        return this.options.width - this.options.margin.right;
    },

    yEnd : function () {
        return this.options.margin.top;
    },

    quadrantWidth : function () {
        return this.options.width - this.options.margin.left - this.options.margin.right;
    },

    quadrantHeight : function () {
        return this.options.height - this.options.margin.top - this.options.margin.bottom;
    }
});

module.exports = Base;
