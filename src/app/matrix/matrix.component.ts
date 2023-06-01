import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  public grid: boolean[][] = [];
  public paused: boolean;
  public gridWidth: number = 100;
  public gridHeight: number = 70;

  constructor() {
    this.paused = true;
    this.initGrid();
  }

  ngOnInit() {
    this.runGame().then();
  }

  public initGrid(): void {
    for (let row = 0; row < this.gridHeight; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.gridWidth; col++) {
        this.grid[row][col] = false;
      }
    }
  }

  public setCell(row: number, col: number): void {
    this.grid[row][col] = true;
  }

  public resumeGame(): void {
    this.paused = false;
  }

  public pauseGame(): void {
    this.paused = true;
  }

  public rules(): void {
    const newGrid: boolean[][] = [];
    for (let row = 0; row < this.gridHeight; row++) {
      newGrid[row] = [];
      for (let col = 0; col < this.gridWidth; col++) {
        const cellIsAlive = this.grid[row][col];
        const aliveNeighbors = this.countAliveNeighbors(row, col);
        if (cellIsAlive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
          newGrid[row][col] = false; // Muere por soledad o sobrepoblación
        } else if (!cellIsAlive && aliveNeighbors === 3) {
          newGrid[row][col] = true; // Nace por reproducción
        } else {
          newGrid[row][col] = cellIsAlive; // Se mantiene viva
        }
      }
    }
    this.grid = newGrid;
  }

  public createOscillator(): void {
    const randomCol = Math.floor(Math.random() * this.gridWidth);
    const randomRow = Math.floor(Math.random() * this.gridHeight);

    if (randomCol + 2 < this.gridWidth && randomRow + 2 < this.gridHeight) {
      this.grid[randomRow][randomCol] = true;
      this.grid[randomRow + 1][randomCol] = true;
      this.grid[randomRow + 2][randomCol] = true;
    }
  }

  public createStaticLife(): void {
    const randomRow = Math.floor(Math.random() * this.gridHeight);
    const randomCol = Math.floor(Math.random() * this.gridWidth);

    if (randomRow >= 0 && randomRow < this.gridHeight && randomCol >= 0 && randomCol < this.gridWidth) {
      this.grid[randomRow][randomCol] = true;
      this.grid[randomRow][randomCol + 1] = true;
      this.grid[randomRow + 1][randomCol] = true;
      this.grid[randomRow + 1][randomCol + 1] = true;
    }
  }

  public createSpaceship(): void {
    const randomRow = Math.floor(Math.random() * (this.gridHeight - 4));
    const randomCol = Math.floor(Math.random() * (this.gridWidth - 5));
    if (randomRow >= 0 && randomRow + 2 < this.gridHeight && randomCol >= 0 && randomCol + 3 < this.gridWidth) {
      this.grid[randomRow][randomCol + 1] = true;
      this.grid[randomRow][randomCol + 4] = true;
      this.grid[randomRow + 1][randomCol] = true;
      this.grid[randomRow + 2][randomCol] = true;
      this.grid[randomRow + 2][randomCol + 4] = true;
      this.grid[randomRow + 3][randomCol] = true;
      this.grid[randomRow + 3][randomCol + 1] = true;
      this.grid[randomRow + 3][randomCol + 2] = true;
      this.grid[randomRow + 3][randomCol + 3] = true;
    }
  }

  public createMethuselah(): void {
    const row = Math.floor(Math.random() * (this.gridHeight - 3));
    const col = Math.floor(Math.random() * (this.gridWidth - 3));

    if (row >= 0 && row + 3 < this.gridHeight && col >= 0 && col + 3 < this.gridWidth) {
      this.grid[row + 1][col + 2] = true;
      this.grid[row + 2][col] = true;
      this.grid[row + 2][col + 2] = true;
      this.grid[row + 2][col + 3] = true;
      this.grid[row + 3][col + 1] = true;
    }
  }

  private async runGame(): Promise<void> {
    while (true) {
      if (!this.paused) {
        this.rules();
        await this.sleep(700);
      } else {
        await this.wait();
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private wait(): Promise<void> {
    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        if (!this.paused) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100);
    });
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
          neighborRow < this.gridHeight &&
          neighborCol >= 0 &&
          neighborCol < this.gridWidth &&
          this.grid[neighborRow][neighborCol]
        ) {
          count++;
        }
      }
    }
    return count;
  }
}
