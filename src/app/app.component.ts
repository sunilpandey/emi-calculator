import { Component, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {formatNumber} from '@angular/common'
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
  parameterChanged() {
    let r = this.roi /(1200);
    let duration = this.duration * 12;

    //P*r*((1+r)^n/((1+r)^n - 1) = E
    if(this.selectedComp === "emiEnabled") {
      this.emi = formatNumber(this.loanAmount as number * r *(Math.pow(1 + r, duration)/(Math.pow(1 + r, duration) - 1)),'en-us', '1.0-0') || "";
    }else if(this.selectedComp === "loanAmountEnabled"){
      this.loanAmount = formatNumber(this.emi as number/(r *(Math.pow(1 + r, duration)/(Math.pow(1 + r, duration) - 1))), 'en-us', "1.0-0") || "";
    }else if(this.selectedComp === ""){}
  }
}
