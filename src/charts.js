/**
 * Created by tao.qit(导演) on 15/8/19.
 *
 */

var charts = {};

function define(name, Class){
    charts[name] = Class;
}

function get(name){
    return charts[name];
}

module.exports = {
    define : define,
    get : get
};
