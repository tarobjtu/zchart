/**
 * Created by tao.qit(导演) on 15/8/24.
 *
 */

var _ = require('lodash');

var Base = require('./base'),
    components = require('../components');

var DataZoom = Base.extend({
    initialize : function (option, zChart) {
        DataZoom.superclass.initialize.call(this, zChart);

    },
    render : function(){

    }
});

components.define('dataZoom', DataZoom);
module.exports = DataZoom;
