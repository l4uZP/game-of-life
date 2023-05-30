import { Component } from '@angular/core';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent {
  public matrixXArray: boolean[] = [];
  public matrixYArray: boolean[] = [];

  constructor() {
    this.initMatrix();
  }

  private initMatrix(): void {
    for (let i = 0; i < 200; i++) {
      this.matrixYArray.push(false);
    }
    for (let i = 0; i < 100; i++) {
      this.matrixXArray.push(false);
    }
  }
}
