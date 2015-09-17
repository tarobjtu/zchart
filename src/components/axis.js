/**
 * Created by tao.qit(导演) on 15/8/19.
 *
 */

var Base = require('./base'),
    components = require('../components');

var Axis = Base.extend({
    /*
     * @param : type X坐标，Y坐标
     * */
    initialize : function(type, zChart){
        Axis.superclass.initialize.call(this, zChart);

        var orient, scale

        if(type === Axis.X){
            orient = 'bottom';
            scale = this.xScale();
            this.x = this.xStart();
            this.y = this.yStart();
            this.class = 'x axis';
        }
        else{
            orient = 'left';
            scale = this.yScale();
            this.x = this.xStart();
            this.y = this.yEnd();
            this.class = 'y axis';
        }

        this.axis = d3.svg.axis()
            .scale(scale)
            .tickValues(this.tickValues)
            .orient(orient);

        this.render();
    },
    render : function(){
        var me = this;
        me.svg.append('g')
            .attr('class', this.class)
            .attr('transform', function () {
                return 'translate(' + me.x + ',' + me.y + ')';
            })
            .call(this.axis);
    }
});

Axis.X = 'xAxis';
Axis.Y = 'yAxis';

// 存入组件库中
components.define('axis', Axis);
module.exports = Axis;
