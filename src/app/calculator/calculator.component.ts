import { Component } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [NgClass, NgFor, NgIf,RouterOutlet,CalculatorComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  title = 'calculator';
  display = '0';
  result = '';
  DarkMode = false;
  showHistory = false;
  LastOperations: string[] = [];

  toggleStory() {
    this.showHistory = !this.showHistory;
  }

  OperationHistory(operation: string) {
    this.LastOperations.unshift(operation);
    if (this.LastOperations.length > 3) {
      this.LastOperations.pop();
    }
  }

  toggleTheme() {
    this.DarkMode = !this.DarkMode;
  }

  calculate() {
    try {
      this.result = eval(this.display.replace('x', '*').replace('÷', '/')).toString();
      this.OperationHistory(this.display + ' =' + this.result);
    } catch (error) {
      alert(error);
    }
  }

  ButtonClick(numero: number) {
    if (this.display === '0') {
      this.display = numero.toString();
    } else {
      this.display += numero.toString();
    }
  }

  Proces(Proces: string) {
    if (this.display === '0' && Proces !== '+/-' && Proces !== '/' && Proces !== '÷') {
      return;
    }

    const lastChar = this.display[this.display.length - 1];
    if (['+', '-', '*', '÷'].includes(lastChar) && ['+', '-', '*', '÷'].includes(Proces)) {
      this.display = this.display.slice(0, -1) + Proces;
    } else {
      this.display += Proces;
    }
  }

  clr() {this.display = '0';this.result = '';}

  toggleSign() {
    if (this.display === '0') {
      this.display = '0';
    } else if (this.display.startsWith('-')) {
      this.display = this.display.substring(1);
    } else {
      this.display = '-' + this.display;
    }
  }

  addZeroes() {
    if (this.display !== '0') {
      this.display += '00';
    }
  }
}
