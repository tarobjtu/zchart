/**
 * Created by tao.qit(导演) on 15/8/19.
 *
 */

var components = {};

function define(name, Class){
    components[name] = Class;
}

function get(name){
    return components[name];
}

module.exports = {
    define : define,
    get : get
};