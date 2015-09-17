/**
 * Created by tao.qit(导演) on 15/8/20.
 *
 */

var $ = require('jquery');

var Base = require('./base'),
    charts = require('../charts'),
    Tooltip = require('../components/tooltip')

var tooltip

var Bar = Base.extend({
    initialize : function(zChart, index){
        Bar.superclass.initialize.apply(this, arguments);
        this.type = 'bar';
        this.render();
    },

    render : function(){
        var me = this,
            data = me.data,
            xScale = me.xScale(),
            yScale = me.yScale()

        this.bodyG.selectAll("rect.bar")
            .data(data).enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return xScale(d.x);
            })
            .attr("y", function (d) {
                return yScale(d.y);
            })
            .attr("height", function (d) {
                return me.yStart() - me.yEnd() - yScale(d.y);
            })
            .attr("width", function(d){
                return xScale.rangeBand();
            })
            .on('mouseover', function(d){
                tooltip = Tooltip.getInstance(d)
                    .position(me.getTooltipPosition(this))
                    .show();
            })
            .on('mouseleave', function(){
                tooltip.hide();
            })
            .on('mousemove', function(){

            })
    },

    getTooltipPosition : function(rect){
        var offset = $(rect).offset();
        var x = parseFloat(offset.left),
            y = parseFloat(offset.top),
            width = parseFloat(rect.getAttribute('width'));

        return {
            left : x + width/2,
            top : y
        };
    }


});

charts.define('bar', Bar);
module.exports = Bar;
