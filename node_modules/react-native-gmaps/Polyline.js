'use strict';

let React = require('react-native');

let {
  NativeModules
} = React;

var API = NativeModules.RNGMapsPolylineModule;

class Polyline {
  static create(options, callback) {
    Object.assign(options||{}, {
      name: this.constructor.name
    });

    options.points = options.points || [];

    API.create(options, function(id) {
      callback(new Polyline(id, options));
    });
  }
  
  constructor (id, config) {
    this.id     = id;
    this.color  = config.color;
    this.points = config.points || [];
    this.width  = config.width;
  }

  addPoint(lat, lng, callback) {
    callback = callback || (()=>{});
    this.points.push([lat, lng]);
    API.setState(this._toMap(), callback);
  }

  setPoints(points, callback) {
    callback = callback || (()=>{});
    API.setState(this._toMap(), callback);
  }

  setState(config, callback) {
    callback = callback || (()=>{});
    Object.assign(this, config);
    API.setState(this._toMap(), callback);
  }

  remove(callback) {
    callback = callback || (()=>{});
    API.remove(this.id, callback);
  }
  _toMap() {
    return {
      id: this.id,
      color: this.color,
      geodesic: this.geodesic,
      visible: this.visible,
      width: this.width,
      points: this.points
    }
  }
}

module.exports = Polyline;
