const SCALE = 0.25;
const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI / 2;
export class WavyBlob {
  wobbleIncrement = 0;
  radius = 1000;
  segments = 12;
  step = HALF_PI / this.segments;
  anchors = [] as number[];
  radii = [] as number[];
  thetaOff = [] as number[];
  theta = 0;
  thetaRamp = 0;
  thetaRampDest = 12;
  rampDamp = 25;
  c: CanvasRenderingContext2D | null;
  height: number;
  width: number;

  constructor(c: CanvasRenderingContext2D) {
    this.c = c;
    const bumpRadius = 100;
    const halfBumpRadius = bumpRadius / 2;

    for (let i = 0; i < this.segments + 2; i++) {
      this.anchors.push(0, 0);
      this.radii.push(Math.random() * bumpRadius - halfBumpRadius);
      this.thetaOff.push(Math.random() * TWO_PI);
    }

    this.height = c.canvas.height;
    this.width = c.canvas.width;
  }
  bezierSkin(bez: number[], closed = true) {
    if (!this.c) {
      return;
    }
    const avg = this.calcAvgs(bez);
    const leng = bez.length;

    if (closed) {
      this.c.moveTo(avg[0], avg[1]);
      for (let i = 2; i < leng; i += 2) {
        let n = i + 1;
        this.c.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
      }
      this.c.quadraticCurveTo(bez[0], bez[1], avg[0], avg[1]);
    } else {
      this.c.moveTo(bez[0], bez[1]);
      this.c.lineTo(avg[0], avg[1]);
      for (let i = 2; i < leng - 2; i += 2) {
        let n = i + 1;
        this.c.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
      }
      this.c.lineTo(bez[leng - 2], bez[leng - 1]);
    }
  }

  calcAvgs(p: number[]) {
    const avg = [];
    const leng = p.length;
    let prev;

    for (let i = 2; i < leng; i++) {
      prev = i - 2;
      avg.push((p[prev] + p[i]) / 2);
    }
    avg.push((p[0] + p[leng - 2]) / 2, (p[1] + p[leng - 1]) / 2);
    return avg;
  }
  update() {
    this.thetaRamp += (this.thetaRampDest - this.thetaRamp) / this.rampDamp;
    this.theta += 0.008;

    this.anchors = [0, this.radius];
    for (let i = 0; i <= this.segments; i++) {
      const sine = Math.sin(this.thetaOff[i] + this.theta + this.thetaRamp);
      const rad = this.radius + this.radii[i] * sine;
      const theta = this.step * i;
      const x = rad * Math.sin(theta) * 2;
      const y = rad * Math.cos(theta) * 1;

      this.anchors.push(x, y);
    }

    if (!this.c) {
      return;
    }

    const rad = 200;

    this.c.save();
    this.c.translate(rad, rad);
    this.c.rotate((Math.PI * 3) / 2);
    this.c.translate(-rad, -rad);
    this.c.scale(SCALE, SCALE);
    this.c.fillStyle = "#010f0f";
    this.c.beginPath();
    this.c.moveTo(0, 0);
    this.bezierSkin(this.anchors, false);
    this.c.lineTo(0, 0);
    this.c.fill();
    this.c.restore();
  }
}
