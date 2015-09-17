/**
 * Created by tao.qit(导演) on 15/8/24.
 *
 */

var $ = require('jquery');

var Base = require('./base'),
    charts = require('../charts'),
    Tooltip = require('../components/tooltip')

var tooltip

var options = {
    radius : 4.5
};

var Line = Base.extend({
    initialize : function(zChart, index){
        Line.superclass.initialize.apply(this, arguments);
        this.type = 'line';
        this.render();
    },

    render : function(){
        var me = this,
            data = me.data,
            xScale = me.xScale(),
            yScale = me.yScale()

        var line = d3.svg.line()
            .interpolate("cardinal")
            .tension( me.chartOption.tension || 1)
            .x(function(d){
                return xScale(d.x) + xScale.rangeBand()/2;
            })
            .y(function(d){
                return yScale(d.y);
            });

        me.lineBody = me.bodyG.append('g')
            .attr('class', 'line')
            .attr('id', me.getChartId());

        me.lineBody.selectAll('path')
            .data([data]).enter()
            .append('path')
            .attr('d', function (d) {
                return line(d);
            })
            .style('stroke', function(d){
                return me.parent.colorScale(me.uid);
            });

        me.lineBody.selectAll('circle')
            .data(data).enter()
            .append('circle')
            .attr('cx', function (d) {
                return xScale(d.x) + xScale.rangeBand()/2;
            })
            .attr('cy', function(d){
                return yScale(d.y);
            })
            .attr('r', options.radius);

    }

});

charts.define('line', Line);
module.exports = Line;
