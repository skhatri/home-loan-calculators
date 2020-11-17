import { Thresholds } from "./thresholdfee";

/*
Stamp Duty Calculator
https://www.afgonline.com.au/get-a-loan/home-loan/online-calculators/stamp-duty-calculator/
*/
export interface StampDutyCalculator {
    calculate(): number
}
module StampDuty {

    export enum StateDef {
        NSW,
        ACT,
        VIC,
        QLD,
        TAS,
        SA,
        NT,
        WA,
    }

    class NSWStampDutyCalculator implements StampDutyCalculator {
        private purchase_price: number
        private foreign_purchase: boolean
        private first_home_buyer: boolean
        private land: boolean
        private investment: boolean


        constructor(
            purchase_price: number,
            land: boolean,
            foreign_purchase: boolean,
            first_home_buyer: boolean,
            investment: boolean) {

            this.purchase_price = purchase_price;
            this.foreign_purchase = foreign_purchase;
            this.first_home_buyer = first_home_buyer;
            this.investment = investment;
            this.land = land;
        }

        calculate() {
            let payable = 0;
            if (this.foreign_purchase) {
                payable = this.calculate_payable() + (0.08 * this.purchase_price);
            } else if (this.first_home_buyer && !this.investment) {
                if (this.land) {
                    payable = this.calculate_first_land_buyer();
                } else {
                    payable = this.calculate_first_home_buyer();
                }
            } else {
                payable = this.calculate_payable();
            }
            return payable;
        }


        private calculate_first_land_buyer() {
            const amt = this.purchase_price;
            if (amt <= 350000) {
                return 0;
            }
            if (amt <= 450000) {
                return amt * 0.1574 - 55090;
            }
            return this.calculate_payable();
        }
        private calculate_first_home_buyer() {
            const amt = this.purchase_price;
            if (amt <= 650000) {
                return 0;
            }
            if (amt <= 800000) {
                return amt * 0.21 - 136510;
            }
            return this.calculate_payable();
        }

        private calculate_payable() {
            const amt = this.purchase_price;
            let payable = 0;

            for (let i = 0; i < Thresholds.length; i += 1) {
                if (amt > Thresholds[i].threshold) {
                    payable = Thresholds[i].calculate(amt);
                    break;
                }
            }
            return payable;
        }

    }

    class Builder {
        private purchase_price: number = 14000
        private foreign_purchase: boolean = false
        private first_home_buyer: boolean = true
        private land: boolean = false
        private investment: boolean = false
        private state: StateDef = StateDef.NSW
        withState(state: StateDef) {
            this.state = state
            return this
        }
        withPurchasePrice(purchase_price: number) {
            this.purchase_price = purchase_price
            return this
        }
        withForeignPurchase() {
            this.foreign_purchase = true
            return this
        }
        withNonFirstHomeBuyer() {
            this.first_home_buyer = false
            return this
        }
        withFirstHomeBuyer() {
            this.first_home_buyer = true
            return this
        }
        withLand() {
            this.land = true
            return this
        }
        withInvestment() {
            this.investment = true
            return this
        }
        build(): StampDutyCalculator {
            let stampDutyCalculator: StampDutyCalculator | undefined

            switch (this.state) {
                case StateDef.NSW:
                    stampDutyCalculator = new NSWStampDutyCalculator(this.purchase_price, this.land, this.foreign_purchase, this.first_home_buyer,
                        this.investment)
                    break;
                case StateDef.VIC:
                    stampDutyCalculator = undefined
                    break;
                default:
                    stampDutyCalculator = undefined
            }
            if (stampDutyCalculator === undefined) {
                throw new Error("Unimplemented for state " + this.state.toString());
            }
            return stampDutyCalculator
        }
    }

    export class Factory {
        newBuilder() {
            return new Builder()
        }
    }
}


export const StampDutyBuilder = new StampDuty.Factory();
export const State = StampDuty.StateDef;
