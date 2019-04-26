export class ThresholdBaseDuty {
    threshold: number
    fee: number
    rate: number
    constructor(threshold: number, fee: number, rate: number) {
        this.threshold = threshold;
        this.fee = fee;
        this.rate = rate;
    }
    calculate(amt: number) {
        return this.fee + (((amt - this.threshold) / 100.0) * this.rate);
    }
}

const sortedThresholds = [
    new ThresholdBaseDuty(3000000, 150490, 7),
    new ThresholdBaseDuty(1000000, 40490, 5.5),
    new ThresholdBaseDuty(300000, 8990, 4.5),
    new ThresholdBaseDuty(80000, 1290, 3.5),
    new ThresholdBaseDuty(30000, 415, 1.75),
    new ThresholdBaseDuty(14000, 175, 1.5),
    new ThresholdBaseDuty(0, 0, 1.25),
];


export const Thresholds = sortedThresholds;