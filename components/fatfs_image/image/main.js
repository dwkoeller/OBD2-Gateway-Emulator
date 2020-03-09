// ajax - v2.3.0 - MIT (c) Fernando Daciuk
!function(e,t){"use strict";"function"==typeof define&&define.amd?define("ajax",t):"object"==typeof exports?exports=module.exports=t():e.ajax=t()}(this,function(){"use strict";function e(e){var r=["get","post","put","delete"];return e=e||{},e.baseUrl=e.baseUrl||"",e.method&&e.url?n(e.method,e.baseUrl+e.url,t(e.data),e):r.reduce(function(r,o){return r[o]=function(r,u){return n(o,e.baseUrl+r,t(u),e)},r},{})}function t(e){return e||null}function n(e,t,n,u){var c=["then","catch","always"],i=c.reduce(function(e,t){return e[t]=function(n){return e[t]=n,e},e},{}),f=new XMLHttpRequest,d=r(t,n,e);return f.open(e,d,!0),f.withCredentials=u.hasOwnProperty("withCredentials"),o(f,u.headers),f.addEventListener("readystatechange",a(i,f),!1),f.send(s(n)),i.abort=function(){return f.abort()},i}function r(e,t,n){if("get"!==n.toLowerCase()||!t)return e;var r=s(t),o=e.indexOf("?")>-1?"&":"?";return e+o+r}function o(e,t){t=t||{},u(t)||(t["Content-Type"]="application/x-www-form-urlencoded"),Object.keys(t).forEach(function(n){t[n]&&e.setRequestHeader(n,t[n])})}function u(e){return Object.keys(e).some(function(e){return"content-type"===e.toLowerCase()})}function a(e,t){return function n(){t.readyState===t.DONE&&(t.removeEventListener("readystatechange",n,!1),e.always.apply(e,c(t)),t.status>=200&&t.status<300?e.then.apply(e,c(t)):e["catch"].apply(e,c(t)))}}function c(e){var t;try{t=JSON.parse(e.responseText)}catch(n){t=e.responseText}return[t,e]}function s(e){return i(e)?f(e):e}function i(e){return"[object Object]"===Object.prototype.toString.call(e)}function f(e){return Object.keys(e).reduce(function(t,n){var r=t?t+"&":"";return r+d(n)+"="+d(e[n])},"")}function d(e){return encodeURIComponent(e)}return e});

function debounce(func, delay) {
    var inDebounce;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(function () {
            func.apply(context, args);
        }, delay);
    };
}
function bind_trailing_args(fn) {
    var bound_args = [].slice.call(arguments, 1);
    return function() {
        var args = [].concat.call([].slice.call(arguments), bound_args);
        return fn.apply(this, args);
    };
}

function linkSlider(sliderID, outputID, callback) {
    var slider = document.getElementById(sliderID);
    var output = document.getElementById(outputID);
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        output.innerHTML = this.value;
        if (callback != undefined) { callback(this.value); }
    };
}

function updateValue(value, name) {
    console.log('OBD', name, value);

    var data = {
        name: name,
        value: parseInt(value)
    };

    ajax({
        dataType: "json",
        method: "PATCH",
        url: "/api/vehicle",
        data: JSON.stringify(data)
    });
}

linkSlider('speed', 'current-speed', debounce(bind_trailing_args(updateValue, 'speed'), 100));
linkSlider('rpm', 'current-rpm', debounce(bind_trailing_args(updateValue, 'rpm'), 100));
linkSlider('throttle', 'current-throttle', debounce(bind_trailing_args(updateValue, 'throttle'), 100));
linkSlider('engine_load', 'current-engine_load', debounce(bind_trailing_args(updateValue, 'engine_load'), 100));

linkSlider('engine_coolant', 'current-engine_coolant', debounce(bind_trailing_args(updateValue, 'engine_coolant'), 100));
linkSlider('engine_oil', 'current-engine_oil', debounce(bind_trailing_args(updateValue, 'engine_oil'), 100));

linkSlider('engine_demand_torque', 'current-engine_demand_torque', debounce(bind_trailing_args(updateValue, 'engine_demand_torque'), 100));
linkSlider('engine_actual_torque', 'current-engine_actual_torque', debounce(bind_trailing_args(updateValue, 'engine_actual_torque'), 100));
linkSlider('engine_reference_torque', 'current-engine_reference_torque', debounce(bind_trailing_args(updateValue, 'engine_reference_torque'), 100));
linkSlider('engine_percent_torque', 'current-engine_percent_torque', debounce(bind_trailing_args(updateValue, 'engine_percent_torque'), 100));