import { assert } from 'chai';
import * as yatzy from '../model/game.js';;

describe('smallStraightPoints', () => {
    it('Should return 0 when there is not a small straight', () => {
        yatzy.setValues([3, 2, 2, 4, 5]);
        const smallStraight = yatzy.smallStraightPoints();
        assert.equal(smallStraight, 0);
    });

    it('Should return 15 when there is a small straight', () => {
        yatzy.setValues([1, 2, 3, 4, 5]);
        const smallStraight = yatzy.smallStraightPoints();
        assert.equal(smallStraight, 15);
    });

    it('Should NOT return 15 when there is not a small straight', () => {
        yatzy.setValues([1, 1, 2, 3, 4]);
        const smallStraight = yatzy.smallStraightPoints();
        assert.equal(smallStraight, 0);
    });

});
