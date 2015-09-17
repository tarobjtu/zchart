/**
 * Created by tao.qit(导演) on 15/8/21.
 *
 */

var $ = require('jquery'),
    d3 = require('d3'),
    _ = require('lodash')

var Base = require('./base')
    //tpl = require('./tpl/tooltip.tpl');

var instance,
    tpl = '<div class="zchart-tooltip"><div class="zchart-tooltip-container"></div></div>'


var options = {
    distance : 5 // tooltip距离shape的距离
};

var Tooltip = Base.extend({
    initialize : function(){
        Tooltip.superclass.initialize.apply(this, arguments);

        this.$elem = $(tpl).appendTo($('body'));
        this.$container = this.$elem.find('.zchart-tooltip-container');
    },
    render : function(d){
        var html = '';
        _.forEach(d, function(v, k){
            html += '<p>' + k + ' : ' + v + '</p>';
        });

        this.$container.html(html);
        return this;
    },
    show : function(){
        this.$elem.stop().animate({opacity:1}, 300);
        return this;
    },
    hide : function(){
        this.$elem.stop().animate({opacity:0}, 300);
        return this;
    },
    position : function(position){
        position.left = position.left - this.$elem.outerWidth()/2;
        position.top  = position.top - this.$elem.outerHeight() - 8 - options.distance;
        this.$elem.css({
            left : position.left,
            top : position.top
        })
        return this;
    }
});

Tooltip.getInstance = function(d){
    if(!instance){
        instance = new Tooltip();
    }
    instance.render(d);
    return instance;
}


module.exports = Tooltip;
