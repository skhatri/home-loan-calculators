import { StampDutyCalculator } from '../main/calculator';

describe('stamp duty calculator', function () {

    it('first home buyer with less with 500k purchase has no stamp duty fee', function () {
        const stamp = new StampDutyCalculator(
            500000, false, false, true, false
        );
        const payable = stamp.calculate();
        console.log(payable);
        expect(payable).toBe(0.0);
    });

    it('first land buyer up to 350k purchase has no stamp duty fee', function () {
        const stamp = new StampDutyCalculator(
            350000, true, false, true, false
        );
        const payable = stamp.calculate();
        console.log(payable);
        expect(payable).toBe(0.0);
    });


});
