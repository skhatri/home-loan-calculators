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

        let l7_min = 3000000;
        let l6_min = 1000000;
        let l5_min = 300000;
        let l4_min = 80000;
        let l3_min = 30000;
        let l2_min = 14000;

        if (amt > l7_min) {
            payable = 150490 + (((amt - l7_min) / 100.0) * 7);
        } else if (amt > l6_min) {
            payable = 40490 + (((amt - l6_min) / 100.0) * 5.5);
        } else if (amt > l5_min) {
            payable = 8990 + (((amt - l5_min) / 100.0) * 4.5);
        } else if (amt > l4_min) {
            payable = 1290 + (((amt - l4_min) / 100.0) * 3.5);
        } else if (amt > l3_min) {
            payable = 415 + (((amt - l3_min) / 100.0) * 1.75);
        } else if (amt > l2_min) {
            payable = 175 + (((amt - l2_min) / 100.0) * 1.5);
        } else {
            payable = (amt / 100.0) * 1.25;
        }
        return payable;
    }

}
