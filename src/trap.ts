export class Trap {
  x: number;
  y: number;
  size: number;
  trapTime: number;
  trap: boolean;
  frameLmiter: number;
  currentFrame: number;
  private constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.trapTime = 4;
    this.trap = false;
    this.frameLmiter = 0;
    this.currentFrame = 0;
  }
}
