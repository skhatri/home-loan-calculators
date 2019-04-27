import { RepaymentBuilder, RepaymentCalculator } from '../main/repayment'

describe('Repayment Calculator Tests', () => {

    it('500 loan for 6 months at 5%', () => {
        const repaymentInstance: RepaymentCalculator = RepaymentBuilder.newBuilder().withPrincipal(500)
            .withDurationInMonths(6)
            .withRate(0.05)
            .build()

        expect(repaymentInstance.monthlyRepayment()).toBeCloseTo(84.55)
    });

    it('40000 loan for 3 years at 5%', () => {
        const repaymentCalculator: RepaymentCalculator = RepaymentBuilder.newBuilder().withPrincipal(40000)
            .withDurationInYears(3)
            .withRate(0.05)
            .build()
        expect(repaymentCalculator.monthlyRepayment()).toBeCloseTo(1198.835, 2)
    });

    it('300000 for 25 years at 5.42%', () => {
        const repaymentCalculator: RepaymentCalculator = RepaymentBuilder.newBuilder().withPrincipal(300000)
            .withDurationInYears(25)
            .withRate(0.0542)
            .build()
        expect(repaymentCalculator.monthlyRepayment()).toBeCloseTo(1827.96, 2)
    });

    it('700000 with interest only loan at 4.37%', () => {
        const repaymentCalculator: RepaymentCalculator = RepaymentBuilder.newBuilder().withPrincipal(700000)
            .withRate(0.0437)
            .withInterestOnly()
            .build()
        expect(repaymentCalculator.monthlyRepayment()).toBeCloseTo(2549.17, 2)
    })

});