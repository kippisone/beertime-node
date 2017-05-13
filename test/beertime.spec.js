'use strict';

const inspect = require('inspect.js');
// const sinon = require('sinon');
// inspect.useSinon(sinon);

const BeerTime = require('../');

describe('BeerTime', () => {
  describe('class', () => {
    it('should be a prototype class', () => {
      inspect(BeerTime).isFunction();
    });

    it('should have a toString method', () => {
      inspect(BeerTime).hasMethod('toString');
    });
  });

  describe('instance', () => {
    it('should instanziate a BeerTime instance', () => {
      const beertime = new BeerTime();
      inspect(beertime).isInstanceOf(BeerTime);
    });

    it('should have a unixtime property', () => {
      const beertime = new BeerTime();
      inspect(beertime).hasKey('__unixtime');
    });

  });

  describe('toString()', () => {
    it('returns a beertime string', () => {
      const beertime = new BeerTime('2017-05-13T16:00:00+02:00');
      inspect(beertime.toString()).isEql('0:00:00bt');
    });

    inspect.getRange(1, 11).forEach(t => {
      it(`returns a beertime string for ${t} hour${t>1?'s':''} to beer`, () => {
        const beertime = new BeerTime(1494684000000 - (t * 60 * 60 * 1000));
        inspect(beertime.toString()).isEql(`${t}:00:00tb`);
      });

      inspect.getRange(0, 59).forEach(m => {
        it(`returns a beertime string for ${t} hour${t>1?'s':''} and ${('0' + m).substr(-2)} minutes to beer`, () => {
          const beertime = new BeerTime(1494684000000 - (t * 60 * 60 * 1000) + (m * 60 * 1000));
          inspect(beertime.toString()).isEql(`${t}:${('0' + m).substr(-2)}:00tb`);
        });

        inspect.getRange(0, 59).forEach(s => {
          it(`returns a beertime string for ${t} hour${t>1?'s':''} and ${('0' + m).substr(-2)} minutes and ${('0' + s).substr(-2)} seconds to beer`, () => {
            const beertime = new BeerTime(1494684000000 - (t * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000));
            inspect(beertime.toString()).isEql(`${t}:${('0' + m).substr(-2)}:${('0' + s).substr(-2)}tb`);
          });
        });
      });
    });

    inspect.getRange(1, 11).forEach(t => {
      it(`returns a beertime string for ${t} hour${t>1?'s':''} beer time`, () => {
        const beertime = new BeerTime(1494684000000 + (t * 60 * 60 * 1000));
        inspect(beertime.toString()).isEql(`${t}:00:00bt`);
      });

      inspect.getRange(0, 59).forEach(m => {
        it(`returns a beertime string for ${t} hour${t>1?'s':''} and ${('0' + m).substr(-2)} minutes to beer`, () => {
          const beertime = new BeerTime(1494684000000 + (t * 60 * 60 * 1000) + (m * 60 * 1000));
          inspect(beertime.toString()).isEql(`${t}:${('0' + m).substr(-2)}:00bt`);
        });

        inspect.getRange(0, 59).forEach(s => {
          it(`returns a beertime string for ${t} hour${t>1?'s':''} and ${('0' + m).substr(-2)} minutes and ${('0' + s).substr(-2)} seconds to beer`, () => {
            const beertime = new BeerTime(1494684000000 + (t * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000));
            inspect(beertime.toString()).isEql(`${t}:${('0' + m).substr(-2)}:${('0' + s).substr(-2)}bt`);
          });
        });
      });
    });
  });
});
