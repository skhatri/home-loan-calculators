import { StampDutyBuilder, StampDutyCalculator, State } from '../main/calculator';

describe('stamp duty calculator', function () {

    it('first home buyer with less with 500k purchase has no stamp duty fee', () => {
        const stamp: StampDutyCalculator = StampDutyBuilder.newBuilder()
            .withPurchasePrice(500000).build()
        const payable = stamp.calculate();
        expect(payable).toBe(0.0);
    });

    it('first land buyer up to 350k purchase has no stamp duty fee', () => {
        const stamp = StampDutyBuilder.newBuilder()
            .withPurchasePrice(350000)
            .withLand()
            .build();
        const payable = stamp.calculate();
        expect(payable).toBe(0.0);
    });

    it('land buyer with 400k purchase', () => {
        const stamp = StampDutyBuilder.newBuilder().withPurchasePrice(410000).withLand().build();
        const payable = stamp.calculate();
        expect(payable).toBeCloseTo(9444.0);
    });

    it('land buyer with 400k purchase', () => {
        const stamp = StampDutyBuilder.newBuilder()
            .withPurchasePrice(400000)
            .withLand()
            .withNonFirstHomeBuyer()
            .build();
        const payable = stamp.calculate();
        expect(payable).toBe(13490.0);
    });

    it('first land buyer with 500k purchase', () => {
        const stamp = StampDutyBuilder.newBuilder()
            .withPurchasePrice(500000).withLand().withFirstHomeBuyer().build();
        const payable = stamp.calculate();
        expect(payable).toBe(17990.0);
    });

    it("established home purchase for 350k for non-first home buyer as primary residence",
        () => {
            const stamp = StampDutyBuilder.newBuilder().withPurchasePrice(350000)
                .withNonFirstHomeBuyer().build();
            const payable = stamp.calculate();
            expect(payable).toBe(11240.0);
        });

    it("first home buyer buying 1m property as primary residence", () => {
        const stamp = StampDutyBuilder.newBuilder().withPurchasePrice(1000000)
            .withFirstHomeBuyer().build();
        const payable = stamp.calculate();
        expect(payable).toBe(40490.0);
    });

    it("first home buyer buying 2m property as primary residence", () => {
        const stamp = StampDutyBuilder.newBuilder().withPurchasePrice(2000000)
            .withFirstHomeBuyer().build();
        const payable = stamp.calculate();
        expect(payable).toBe(95490.0);
    });

    it("700k house for non first home-buyer", () => {
        const stamp = StampDutyBuilder.newBuilder().withPurchasePrice(700000)
            .withNonFirstHomeBuyer()
            .build();

        const payable = stamp.calculate();
        expect(payable).toBe(26990.0);
    });

    it("700k house for foreign buyer", () => {
        const stamp = StampDutyBuilder.newBuilder().withPurchasePrice(700000)
            .withFirstHomeBuyer()
            .withForeignPurchase()
            .build();

        const payable = stamp.calculate();
        expect(payable).toBe(82990.00);
    });

    it("700k house for first home-buyer", () => {
        const stamp = StampDutyBuilder.newBuilder().withPurchasePrice(700000)
            .withFirstHomeBuyer()
            .build();
        const payable = stamp.calculate();
        expect(payable).toBe(10490.0);
    });

    it("house prices thresholds for first home", () => {
        var prices = [
            new ThresholdDuty(100, 0),
            new ThresholdDuty(12000, 0),
            new ThresholdDuty(14000, 0),
            new ThresholdDuty(30000, 0),
            new ThresholdDuty(30100, 0),
            new ThresholdDuty(80000, 0),
            new ThresholdDuty(80100, 0),
            new ThresholdDuty(300000, 0),
            new ThresholdDuty(300100, 0),
            new ThresholdDuty(500100, 0),
            new ThresholdDuty(1000000, 40490.0),
            new ThresholdDuty(1000100, 40495.5),
            new ThresholdDuty(3000000, 150490.0),
            new ThresholdDuty(3000100, 150497.0),
        ];
        prices.forEach(price => {
            const stamp = StampDutyBuilder.newBuilder()
                .withPurchasePrice(price.threshold)
                .withFirstHomeBuyer()
                .build();
            const payable = stamp.calculate();
            expect(payable).toBeCloseTo(price.fee, 2, "input " + price.threshold + " expected: " + price.fee + ", actual: " + payable);
        })
    });

    it("house price thresholds for non-first home", () => {
        var prices = [
            new ThresholdDuty(100, 1.25),
            new ThresholdDuty(12000, 150),
            new ThresholdDuty(14000, 175),
            new ThresholdDuty(30000, 415),
            new ThresholdDuty(30100, 416.75),
            new ThresholdDuty(80000, 1290),
            new ThresholdDuty(80100, 1293.5),
            new ThresholdDuty(300000, 8990.0),
            new ThresholdDuty(300100, 8994.5),
            new ThresholdDuty(1000000, 40490.0),
            new ThresholdDuty(1000100, 40495.5),
            new ThresholdDuty(3000000, 150490.0),
            new ThresholdDuty(3000100, 150497.0),
        ];
        prices.forEach(price => {
            const stamp = StampDutyBuilder.newBuilder()
                .withState(State.NSW)
                .withPurchasePrice(price.threshold)
                .withNonFirstHomeBuyer()
                .withInvestment()
                .build();
            const payable = stamp.calculate();
            expect(payable).toBeCloseTo(price.fee, 2, "input " + price.threshold + " expected: " + price.fee + ", actual: " + payable);
        })
    });

    it("unimplemented states throw exception", () => {
        expect(() => { StampDutyBuilder.newBuilder().withState(State.ACT).build() })
            .toThrow();
    });

    it("unimplemented state VIC throw exception", () => {
        expect(() => { StampDutyBuilder.newBuilder().withState(State.VIC).build() })
            .toThrow();
    });

});

class ThresholdDuty {
    threshold: number
    fee: number
    constructor(threshold: number, fee: number) {
        this.threshold = threshold;
        this.fee = fee;
    }
}
