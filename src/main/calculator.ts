import { ThresholdBaseDuty, Thresholds } from "./thresholdfee";

/*
Stamp Duty Calculator
https://www.afgonline.com.au/get-a-loan/home-loan/online-calculators/stamp-duty-calculator/
*/
export class StampDutyCalculator {
    purchase_price: number
    foreign_purchase: boolean
    first_home_buyer: boolean
    land: boolean
    investment: boolean


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
        if (this.first_home_buyer && !this.investment) {
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

