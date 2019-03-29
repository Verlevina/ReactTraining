import React, {Component} from 'react'
import classes from './Game.scss'

class CanvasComponent extends Component {
  state = {
    isWin: false
};
  componentDidMount() {
    const updateCanvas = function () {
      const self = this;
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      const maxBallCount = 3;
      const timeToWin = 10000;
      const intervatToNewBall = 1500;
      const gameViewer = {
        paddle: {
          width: 80,
          height: 10,
          coordinates: {
            x: 10,
            y: canvas.height - 30,
            currentCenterPosition: null
          }
        },
        balls: []
      };


      class Paddle {

        draw() {
          ctx.beginPath();
          ctx.rect(gameViewer.paddle.coordinates.x, gameViewer.paddle.coordinates.y, gameViewer.paddle.width, gameViewer.paddle.height);
          ctx.fillStyle = "red";
          ctx.fill();
          ctx.closePath();

        }




        move(event) {
          let currentCoordinate = event.offsetX === undefined
            ?event.layerX  - gameViewer.paddle.width / 2
            :event.offsetX  - gameViewer.paddle.width / 2;
          gameViewer.paddle.coordinates.currentCenterPosition = currentCoordinate;
          gameViewer.paddle.coordinates.x = currentCoordinate;
        }
      }

      // класс - шаблон для падающих элементов

      class Shape {
        constructor(name) {
          this.name = {
            name: name,
            coordinates: {
              x: Math.floor(Math.random() * canvas.width),
              y: 30,
              dx: 2,
              dy: 2
            }
          }
        }

        draw() {

        }

        start() {
          this.draw();

          if (this.name.coordinates.x + this.name.coordinates.dx > canvas.width - this.name.radius ||
            this.name.coordinates.x + this.name.coordinates.dx < this.name.radius) {
            this.name.coordinates.dx = -this.name.coordinates.dx;
          }

          if (this.name.coordinates.y + this.name.coordinates.dy < this.name.radius) {
            this.name.coordinates.dy = -this.name.coordinates.dy;
          }
          if (this.name.coordinates.y + this.name.coordinates.dy
            > canvas.height - this.name.radius - (canvas.height - gameViewer.paddle.coordinates.y) +
            gameViewer.paddle.height
            / 2
            && this.name.coordinates.x < gameViewer.paddle.coordinates.x + gameViewer.paddle.width
            && this.name.coordinates.x > gameViewer.paddle.coordinates.x) {
            this.name.coordinates.dy = -this.name.coordinates.dy;
          }
          if (this.name.coordinates.y + this.name.coordinates.dy > canvas.height - this.name.radius) {
            console.dir(gameViewer.balls);
            clearTimeout(winTimeout);

            alert("GAME OVER");
            setTimeout(interval);
            clearInterval(interval);

          }

          this.name.coordinates.x += this.name.coordinates.dx;
          this.name.coordinates.y += this.name.coordinates.dy;
        }
      }



      //падающие шары
      class Ball extends Shape{
        constructor() {
          super();
          this.name.radius = 10;
          this.name.color = "#0095DD";
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.name.coordinates.x, this.name.coordinates.y, this.name.radius, 0, Math.PI*2);
          ctx.fillStyle = this.name.color;
          ctx.fill();
          ctx.closePath();
        }

      }

      // падающие квадраты
      class Rect extends Ball {
        constructor() {
          super();
          this.name.width = 20;
          this.name.heighth = 20;
          this.name.color = 'green'
        }

        draw() {
          ctx.beginPath();
          ctx.rect(this.name.coordinates.x, this.name.coordinates.y, this.name.width, this.name.heighth);
          ctx.fillStyle = this.name.color;
          ctx.fill();
          ctx.closePath();
        }

      }


      class Triangle extends Ball {
        constructor() {
          super();
          this.name.width = 20;
          this.name.heighth = 20;
          this.name.color = '#8a2367'
        }

        draw() {
          ctx.beginPath();
          ctx.moveTo(this.name.coordinates.x, this.name.coordinates.y);
          ctx.lineTo(this.name.coordinates.x + this.name.width, this.name.coordinates.y + this.name.heighth);
          ctx.lineTo(this.name.coordinates.x + this.name.width, this.name.coordinates.y);
          ctx.fillStyle = this.name.color;
          ctx.fill();
          ctx.closePath();
        }

      }

      // генератотр рандомных падающих элементов

      const dropObjectRandomGenerator = () => {
        const dropObjectArray = [new Ball(), new Triangle(), new Rect()];
        let random = Math.floor(Math.random() * dropObjectArray.length);
        return dropObjectArray[random];
      };


    const fallingElements = () => {
      // больше шаров
      let counter = 1;

      const addDropElement = () => {
        if (counter <= maxBallCount) {
          gameViewer.balls.push(dropObjectRandomGenerator());
          counter++
        } else {
          clearInterval(moreDrops);
        }
      };

      // массив шаров  в игре
      const moreDrops = setInterval(addDropElement, intervatToNewBall);
    };

    fallingElements();

    const win = function () {
        alert('Winner');
        self.setState({
          isWin: true
        });
        setTimeout(interval);
        clearInterval(interval);
      };

      const winTimeout = setTimeout(win, timeToWin);

      const paddle = new Paddle();

      // запуск игры
      function game() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < gameViewer.balls.length; i++) {
          gameViewer.balls[i].start();
        }

        paddle.draw();
        canvas.addEventListener('mousemove', (event) => {
          paddle.move(event)
        });
      }


      const interval = setInterval(game, 10);

    };

    updateCanvas.bind(this)();
  }


  render() {
    let cls = [classes.canvas];
    if(this.state.isWin) {
       cls.push(classes.openCanvas);
    }
      return (
      <div className={classes["canvas-wrapper"]}>
        <div className={cls.join(' ')}>
          <canvas ref="canvas"  width='500' height='500'/>
        </div>
        {this.state.isWin
          ?<h1 style={{color:'white', fontSize:'25px'}}>
            Hello, world
          </h1>
          :null}
      </div>

    );
  }
}

export default CanvasComponent;