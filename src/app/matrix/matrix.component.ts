import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  public grid: boolean[][] = [];
  public isPaused: boolean = false;
  private width = 100;
  private height = 50;

  constructor() {
  }

  ngOnInit() {
    this.createGrid();
  }

  public resetGrid(): void {
    this.createGrid();
  }

  public setCell(row: number, col: number): void {
    this.grid[row][col] = true;
  }

  public updateGrid(): void {
    const newGrid: boolean[][] = [];
    for (let row = 0; row < this.height; row++) {
      newGrid[row] = [];
      for (let col = 0; col < this.width; col++) {
        const isAlive = this.grid[row][col];
        const aliveNeighbors = this.countAliveNeighbors(row, col);
        if (isAlive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
          // La célula muere por soledad o sobrepoblación
          newGrid[row][col] = false;
        } else if (!isAlive && aliveNeighbors === 3) {
          // Una célula muerta se convierte en viva por reproducción
          newGrid[row][col] = true;
        } else {
          // Mantener el estado actual de la célula
          newGrid[row][col] = isAlive;
        }
      }
    }
    this.grid = newGrid;
  }

  public async runGame(): Promise<void> {
    while (true) {
      if (!this.isPaused) {
        this.updateGrid();
        await this.sleep(1000); // Esperar 1 segundo entre iteraciones
      } else {
        await this.waitUntilResumed();
      }
    }
  }

  public pauseGame(): void {
    this.isPaused = true;
  }

  public resumeGame(): void {
    this.isPaused = false;
  }

  private waitUntilResumed(): Promise<void> {
    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        if (!this.isPaused) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100);
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private createGrid(): void {
    for (let row = 0; row < this.height; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.width; col++) {
        this.grid[row][col] = false;
      }
    }
  }

  private countAliveNeighbors(row: number, col: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const neighborRow = row + i;
        const neighborCol = col + j;
        if (
          neighborRow >= 0 &&
          neighborRow < this.height &&
          neighborCol >= 0 &&
          neighborCol < this.width &&
          this.grid[neighborRow][neighborCol]
        ) {
          count++;
        }
      }
    }
    return count;
  }
}
