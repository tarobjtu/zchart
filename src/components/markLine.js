/**
 * Created by tao.qit(导演) on 15/8/24.
 *
 */

var _ = require('lodash');

var Base = require('./base'),
    components = require('../components');

var MarkLine = Base.extend({
    initialize : function (option, chart, zChart) {
        MarkLine.superclass.initialize.call(this, zChart);
        this.bodyG = chart.bodyG;
        // chart 坐标数据
        this.chartData = chart.data;
        // chart Y轴数据
        this.chartYData = chart.chartOption.data;
        this.render(option);
    },
    render : function(option){
        if(!option.type) return;

        var me = this,
            yScale = me.yScale(),
            type = option.type.toLowerCase();

        var y = me[type](me.chartYData);
        y = yScale(y);

        this.bodyG.append('line')
            .attr('class', 'markline')
            .attr('x1', 0)
            .attr('y1', y)
            .attr('x2', this.quadrantWidth())
            .attr('y2', y);

    },
    average : function(data){
        return _.sum(data)/data.length;
    }
});

components.define('markLine', MarkLine);
module.exports = MarkLine;
