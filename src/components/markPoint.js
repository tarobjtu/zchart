/**
 * Created by tao.qit(导演) on 15/8/21.
 *
 */
var d3 = require('d3'),
    _ = require('lodash');

var Base = require('./base'),
    components = require('../components');

// “硬生生”引入d3插件superformula
require('../lib/superformula')


var options = {
  duration : 800,
    ease : 'bounce'
};

var MarkPoint = Base.extend({
    initialize : function(option, chart, zChart){
        MarkPoint.superclass.initialize.call(this, zChart);
        this.bodyG = chart.bodyG;
        this.chartData = chart.data;
        this.render(option);
    },
    render : function(option){
        if(!option.type) return;

        var me = this,
            xScale = me.xScale(),
            yScale = me.yScale(),
            type = option.type.toLowerCase(),
            finalPosition;

        var drop = d3.superformula()
            .type("drop")
            .segments(360);

        var graphData = me[type](me.chartData);
        me.graph = me.bodyG.append('g')
            .attr('class', 'markpoint')
            .attr('transform', function(){
                var x = parseFloat(xScale(graphData.x)) + parseFloat(xScale.rangeBand()/2),
                    y =  yScale(graphData.y) - 100,
                    fy = y + 60;
                // 为动画效果而缓存的最终位置
                finalPosition = 'translate(' + x + ',' + fy + ')';
                return 'translate(' + x + ',' + y + ')';
            });



        me.graph.append('path')
            .attr('class', type)
            .attr('transform', function(){
                return 'rotate(-90)';
            })
            .attr('d', drop.size(0));

        me.graph.append('text')
            .attr('x', 0)
            .attr('y', 10)
            .attr('text-anchor', 'middle')
            .style('opacity', 0)
            .text( graphData ? graphData['y'] : '' );

        // 动画
        me.graph
            .transition()
            .duration(options.duration)
            .ease(options.ease)
            .attr('transform', finalPosition);

        me.graph.select('path')
            .transition()
            .duration(options.duration)
            .ease(options.ease)
            .attr('d', drop.size(3000));

        me.graph.select('text')
            .transition()
            .duration(options.duration)
            .ease(options.ease)
            .style('opacity', 1);


    },
    max : function(data){
        return _.max(data, function(d){
            return d.y;
        });
    },
    min : function(data){
        return _.min(data, function(d){
            return d.y;
        });
    }
});

// 存入组件库中
components.define('markPoint', MarkPoint);
module.exports = MarkPoint;
