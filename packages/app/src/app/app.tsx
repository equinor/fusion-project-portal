import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
const StyledApp = styled.div`
  height: 100vh;
  padding: 0;
  margin: 0;
  /* Header */
  .large-header {
    position: relative;
    width: 100%;
    background: #333;
    overflow: hidden;
    background-size: cover;
    background-position: center center;
    z-index: 1;
  }

  #large-header {
    background-image: url('https://www.marcoguglie.it/Codepen/AnimatedHeaderBg/demo-1/img/demo-1-bg.jpg');
  }

  .main-title {
    position: absolute;
    margin: 0;
    padding: 0;
    color: #f9f1e9;
    text-align: center;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
  }

  .demo-1 .main-title {
    text-transform: uppercase;
    font-size: 4.2em;
    letter-spacing: 0.1em;
  }

  .main-title .thin {
    font-weight: 200;
  }

  @media only screen and (max-width: 768px) {
    .demo-1 .main-title {
      font-size: 3em;
    }
  }
`;

function getDistance(p1: V2, p2: V2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

interface V2 {
  x: number;
  y: number;
}

class Circle {
  pos: Point;
  radius: number;
  color: string;
  active: number;

  // constructor
  constructor(pos: Point, rad: number, color: string) {
    this.pos = pos;
    this.radius = rad;
    this.color = color;
    this.active = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active && !this.pos && !this.radius) return;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 5 * Math.PI, false);
    ctx.fillStyle = 'rgba(156,217,249,' + this.active + ')';
    ctx.fill();
  }
}

class Plexus {
  width = window.innerWidth;
  height = window.innerHeight;
  animationSpeed = 2;

  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D | null;
  private _points: Point[] = [];
  private _animate: boolean;
  private _target: V2 = { x: 0, y: 0 };
  private _frame: number;
  private _lastRenderTime = 0;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this._animate = true;
    this._frame = 0;
  }

  setup() {
    this._canvas.width = this.width;
    this._canvas.height = this.height;

    this.createPoints();
    this.findClosest();

    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', this.mouseMove);
    }
    // window.addEventListener('scroll', plexus.scrollCheck);
    // window.addEventListener('resize', plexus.resize);
  }

  initAnimation() {
    this.animate(0);
  }

  private shiftPoint(p: Point) {
    p.x = this.ease(
      this._frame,
      p.originX,
      p.originX - 50 + Math.random() * 10,
      this._frame + 10
    );
    p.y = this.ease(
      this._frame,
      p.originY,
      p.originY - 50 + Math.random() * 10,
      this._frame + 10
    );
  }
  private shiftPoints() {
    for (const p of this._points) {
      this.shiftPoint(p);
    }
  }

  private animate(currentTime: number) {
    const secondsSinsLastRender = (currentTime - this._lastRenderTime) / 100;
    if (secondsSinsLastRender < 1 / this.animationSpeed) return;
    this._lastRenderTime = currentTime;
    this._frame++;
    if (this._animate && this._ctx) {
      this._ctx.clearRect(0, 0, this.width, this.height);
      this.drawPoints();

      this.shiftPoints();
      requestAnimationFrame(() => this.animate);
    }
  }

  private drawPoints() {
    for (const point of this._points) {
      // detect points in range
      if (!point.circle) break;
      if (Math.abs(getDistance(this._target, point)) < 5000) {
        point.active = 0.3;
        point.circle.active = 0.6;
      } else if (Math.abs(getDistance(this._target, point)) < 50000) {
        point.active = 0.1;
        point.circle.active = 0.3;
      } else if (Math.abs(getDistance(this._target, point)) < 80000) {
        point.active = 0.02;
        point.circle.active = 0.1;
      } else {
        point.active = 0;
        point.circle.active = 0;
      }
      this.drawLines(point);
      if (this._ctx) point.circle.draw(this._ctx);
    }
  }

  private drawLines(p: Point) {
    if (!p.active) return;
    for (const pc of p.closest) {
      if (!this._ctx) return;
      this._ctx.beginPath();
      this._ctx.moveTo(p.x, p.y);
      this._ctx.lineTo(pc.x, pc.y);
      this._ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
      this._ctx.stroke();
    }
  }

  private findClosest() {
    for (let i = 0; i < this._points.length; i++) {
      const closest = [];
      const p1 = this._points[i];
      for (let j = 0; j < this._points.length; j++) {
        const p2 = this._points[j];
        if (!(p1 === p2)) {
          let placed = false;
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }
  }

  private createPoints() {
    for (let x = 0; x < this.width; x = x + this.width / 20) {
      for (let y = 0; y < this.height; y = y + this.height / 20) {
        const px = x + (Math.random() * this.width) / 20;
        const py = y + (Math.random() * this.height) / 20;

        const p: Point = {
          x: px,
          originX: px,
          y: py,
          originY: py,
          closest: [],
        };

        p.circle = new Circle(
          p,
          2 + Math.random() * 1,
          'rgba(255,255,255,0.3)'
        );

        this._points.push(p);
      }
    }
  }

  private scrollCheck() {
    const height = window.innerHeight;
    if (document.body.scrollTop > height) this._animate = false;
    else this._animate = true;
  }

  private resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.width = width;
    this.height = height;
    this._canvas.width = width;
    this._canvas.height = height;
  }

  private mouseMove(e: MouseEvent) {
    let posX = 0;
    let posY = 0;
    if (e.pageX || e.pageY) {
      posX = e.pageX;
      posY = e.pageY;
    } else if (e.clientX || e.clientY) {
      posX =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posY =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    console.log(this);
    // this._target.x = posX || 0;
    // this._target.y = posY;
  }

  private ease(t: number, b: number, _c: number, d: number) {
    const c = _c - b;

    // return (c * t) / d + b;
    if ((t /= d / 2) < 1) {
      return (c / 2) * t * t + b;
    } else {
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    }
  }
}

interface Point {
  x: number;
  originX: number;
  y: number;
  originY: number;
  circle?: Circle;
  active?: number;
  closest: Point[];
}

// t: current time, b: beginning value, _c: final value, d: total duration

// Event handling

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const plexus = new Plexus(canvasRef.current);
      plexus.setup();
      plexus.initAnimation();
    }
  }, []);

  return (
    <StyledApp>
      <div id="large-header" className="large-header">
        <canvas ref={canvasRef} />
        <h1 className="main-title">
          Fusion <span className="thin">App</span>
        </h1>
      </div>
    </StyledApp>
  );
}

export default App;
