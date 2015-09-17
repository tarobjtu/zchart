/**
 * Created by tao.qit(导演) on 15/8/20.
 *
 */

var _ = require('lodash');

var ComponentBase = require('../components/base');

var Base = ComponentBase.extend({
    initialize : function(zChart, index){
        var data,
            me = this;

        Base.superclass.initialize.apply(this, arguments);
        this.parent = zChart;
        this.uid = ++zChart.chartUid;
        this.options = zChart.options;
        this.bodyG = zChart.bodyG;
        this.chartOption = zChart.options.series[index];

        if(!this.bodyG){
            this.bodyG = zChart.svg.append("g")
                .attr("class", "chart")
                .attr("transform", function(){ return "translate(" + me.xStart() + "," + me.yEnd() + ")" });
        }

        if(this.chartOption && ( data = this.chartOption.data )){
            this.data = _.map(data, function(v, k){
                return {
                    x : me.options.xAxis.data[k],
                    y : v
                };
            });
        }
    },
    getChartId : function(){
        return this.type + this.uid;
    }
});

module.exports = Base;
