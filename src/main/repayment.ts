


export interface RepaymentCalculator {
    monthlyRepayment(): number
}

module Repayment {
    class DefaultRepaymentCalculator implements RepaymentCalculator {
        private principal: number
        private rate: number
        private duration_in_months: number
        private interest_only: boolean

        constructor(principal: number, rate: number, duration_in_months: number, interest_only: boolean) {
            this.principal = principal
            this.rate = rate
            this.duration_in_months = duration_in_months
            this.interest_only = interest_only
        }

        monthlyRepayment() {
            var P = this.principal
            var r = this.rate
            var n = this.duration_in_months
            if (this.interest_only) {
                return P * r / 12
            }
            return (P * r / 12 * ((1 + r / 12) ** n)) / ((1 + r / 12) ** n - 1)
        }

    }

    class Builder {
        private principal: number = 10000
        private rate: number = 5.0
        private duration_in_months: number = 30
        private interestOnly: boolean = false

        withPrincipal(principal: number) {
            this.principal = principal
            return this
        }

        withRate(rate: number) {
            this.rate = rate
            return this
        }

        withDurationInYears(year: number) {
            this.duration_in_months = year * 12
            return this
        }

        withDurationInMonths(months: number) {
            this.duration_in_months = months
            return this
        }

        withInterestOnly() {
            this.interestOnly = true
            return this
        }
        build() {
            return new DefaultRepaymentCalculator(this.principal, this.rate, this.duration_in_months, this.interestOnly)
        }
    }

    export class Factory {
        newBuilder() {
            return new Builder()
        }
    }
}
export const RepaymentBuilder = new Repayment.Factory();
