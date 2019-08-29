import { Component, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {formatNumber} from '@angular/common'
import { parse } from 'querystring';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'EMI Calculator';
  loanAmount: number | string;
  emi: string | number;
  roi: number;
  duration: number;
  selectedComp: string = "emiEnabled";
  pieChartLabels = ['Interest', 'Priciple'];
  pieChartData = [
    {
      "name": "Principle",
      "value": 10
    },
    {
      "name": "Interest",
      "value": 5
    }
  ];
  pieChartLegend = true;
  parameterChanged() {
    let r = this.roi /(1200);
    let duration = this.duration * 12;

    //P*r*((1+r)^n/((1+r)^n - 1) = E
    if(this.selectedComp === "emiEnabled") {
      this.emi = formatNumber(this.loanAmount as number * r *(Math.pow(1 + r, duration)/(Math.pow(1 + r, duration) - 1)),'en-us', '1.0-0') || "";
    }else if(this.selectedComp === "loanAmountEnabled"){
      this.loanAmount = formatNumber(this.emi as number/(r *(Math.pow(1 + r, duration)/(Math.pow(1 + r, duration) - 1))), 'en-us', "1.0-0") || "";
    }

    if(this.emi) {
      this.pieChartData = [{
        "name": "Principle",
        "value": (this.loanAmount as number)
      },
      {
        "name": "Interest",
        "value": parseFloat(((this.emi as string).replace(/,/g, "")))*duration - (this.loanAmount as number)
      }];
    }
  }
}
