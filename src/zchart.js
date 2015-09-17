/*
 *
 * zchart入口文件
 *
 * */

var _ = require('lodash'),
    d3 = require('d3');

var Class = require('./base/class'),
    componentLibrary = require('./components'),
    chartLibrary = require('./charts')

require('./components/axis')
require('./components/markPoint')
require('./components/markLine')
require('./components/dataZoom')

require('./charts/bar')
require('./charts/line')

var defaultOptions = {
    margin : {
        top : 60,
        bottom : 30,
        left : 30,
        right : 30
    }
};

var Zchart = Class.create({
    initialize : function(options){
        this.options = _.extend(options, defaultOptions);
        // 一个图表中chart个数
        this.chartUid = 0;
        this.initScale();
    },
    render : function(){
        var option = this.options;
        if(!this.svg){
            this.svg = d3.select("body")
                .append("svg")
                .attr('class', 'zchart')
                .attr("height", option.height)
                .attr("width", option.width);
        }
        this.renderBody();
    },
    renderBody : function(){
        this.renderComponents();
        this.renderChart();
    },
    renderComponents : function(){
        var ComponentClass;
        if(this.options.xAxis){
            ComponentClass = componentLibrary.get('axis');
            new ComponentClass(ComponentClass.X, this);
        }
        if(this.options.yAxis){
            ComponentClass = componentLibrary.get('axis');
            new ComponentClass(ComponentClass.Y, this);
        }
        if(this.options.dataZoom){
            ComponentClass = componentLibrary.get('dataZoom');
            new ComponentClass(this.options.dataZoom, this);
        }
    },
    renderChart : function () {
        var me = this;
        if(me.options.series){
            _.forEach(me.options.series, function(data, index){
                var ChartClass = chartLibrary.get(data.type);
                var chart = new ChartClass(me, index);

                if(data.markPoint){
                    var markPointData = data.markPoint.data;
                    _.forEach(markPointData, function(v){
                        var ComponentClass = componentLibrary.get('markPoint');
                        new ComponentClass(v, chart, me);
                    });
                }
                if(data.markLine){
                    var markLineData = data.markLine.data;
                    _.forEach(markLineData, function(v){
                        var ComponentClass = componentLibrary.get('markLine');
                        new ComponentClass(v, chart, me);
                    });
                }

            });
        }
    },
    initScale : function(){
        var colorRange = ['#00a7db', '#c400ed', '#eab200', '#00c621'];
        this.colorScale = d3.scale.ordinal()
            .range(colorRange);
    }
});


module.exports = window.Zchart = Zchart;
