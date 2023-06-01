import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatrixComponent } from './matrix.component';

describe('MatrixComponent', () => {
  let component: MatrixComponent;
  let fixture: ComponentFixture<MatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatrixComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the grid, initGrid()', () => {
    component.initGrid();

    expect(component.grid.length).toEqual(70);
    expect(component.grid[0].length).toEqual(100);
    expect(component.grid.every(row => row.every(cell => cell === false))).toBeTrue();
  });
});
