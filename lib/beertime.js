'use strict';

function BeerTime(value) {
  this.__unixtime = new Date(value);
  this.__timediff = 2; // TODO calculate timediff
}

BeerTime.prototype.toString = function() {
  return this.getHours() + ':' +
    ('0' + this.getMinutes()).substr(-2) + ':' +
    ('0' + this.getSeconds()).substr(-2) +
    this.getDayLight();
}

/**
 * Returns beertime hours
 *
 * @method getHours
 * @return {number} Returns b.t. or t.b. hours
 */
BeerTime.prototype.getHours = function() {
  var hours = this.__unixtime.getUTCHours();
  hours += this.__timediff;
  if (hours < 4) {
    hours += 24;
  }

  return Math.abs(hours - 16);
}

/**
 * Returns beertime minutes
 *
 * @method getHours
 * @return {number} Returns b.t. or t.b. minutes
 */
BeerTime.prototype.getMinutes = function() {
  return this.__unixtime.getUTCMinutes();
}

/**
 * Returns beertime seconds
 *
 * @method getHours
 * @return {number} Returns b.t. or t.b. seconds
 */
BeerTime.prototype.getSeconds = function() {
  return this.__unixtime.getUTCSeconds();
}

/**
 * Returns the daylight prefix
 *
 * @method getDayLight
 * @version 1.0.0
 *
 * @return {string} Returns `bt` for beertime or `tb` for time to beer
 */
BeerTime.prototype.getDayLight = function() {
  return this.isBeerTime() ? 'tb' : 'bt';
}

/**
 * Returns a boolean value if it is beertime or not
 *
 * @method isBeerTime
 * @version 1.0.0
 *
 * @return {boolean} Returns true if it is beertime
 */
BeerTime.prototype.isBeerTime = function() {
  var hours = this.__unixtime.getUTCHours();
  hours += this.__timediff;
  return hours < 16 && hours > 4;
}

module.exports = BeerTime;
