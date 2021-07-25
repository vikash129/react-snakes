import React, { Component } from 'react'
import './Style.css'

import Sound from 'react-sound'

import snakehiss from './sounds/snakehiss.mp3'
import foodSound from './sounds/snakeatt.mp3'
import gameOverSound from './sounds/snakehit.mp3'
import musicSound from './sounds/song.mp3'


import Snake from './Snake'
import Food from './Food'
import GameOver from './GameOver'


const boardWidth = 130;
const boardHeith = 75;
const steps = 2

const getRandomCoord = () => {
    let minx = 2
    let maxx = boardWidth

    let miny = 2
    let maxy = boardHeith

    let x = Math.floor((Math.random() * (maxx - minx) + minx) ) 
    let y = Math.floor((Math.random() * (maxy - miny) + minx) )
    return [x, y]
}

const initialState = {
    food: getRandomCoord(),

    direction: 'REST',
    speed: 80,
    score: 0,

    snakeDots: [
        [5, 5], // bofy
        [7, 5],
        [9, 5], //head
    ],
    cont: true,
    gameOver: false,
    highScore: localStorage.getItem('highscore') ? localStorage.getItem('highscore') : 0,
    sound: '',
    isPlaying: false
}

export default class Board extends Component {

    state = initialState

    componentDidMount() {
        setInterval(this.moveSnake, this.state.speed)
        document.onkeydown = this.onKeyDown

    }

    componentDidUpdate(prevProps , prevState) {

        let head = this.state.snakeDots[this.state.snakeDots.length - 1]

        if (prevState.highScore !== this.state.highScore) {

            localStorage.setItem('highscore', this.state.score)
            this.setState({ highScore: this.state.score })

        }
      

        //  this.checkCollapsed()

        this.checkBoundries(head)
        this.checkIfEat(head)
    }





    //controls
    onKeyDown = (e) => {

        e = e || window.Event


        // KeyboardEvent : {
        // charCode: 0
        // code: "KeyK"
        // key: "k"
        // keyCode: 75
        // type: "keydown"}

        // console.log(e)

        switch (e.key) {

            case 'w':
                this.setState({ direction: 'UP' })
                break;

            case 's':
                this.setState({ direction: 'DOWN' })
                break;

            case 'a':
                this.setState({ direction: 'LEFT' })
                break;

            case 'd':
                this.setState({ direction: 'RIGHT' })
                break;

            case 'e':
                this.setState({ direction: 'REST' })

            default:
                break


        }
    }

    moveSnake = () => {
        let dots = [...this.state.snakeDots]; // show the next step

        this.setState({isPlaying : false})

        let head = dots[dots.length - 1]

        // console.log('dots' , dots)

        switch (this.state.direction) {

            case 'RIGHT':
                head = [head[0] + steps, head[1]]
                break;

            case 'LEFT':
                head = [head[0] - steps, head[1]]
                break;

            case 'DOWN':
                head = [head[0], head[1] + steps]
                break;

            case 'UP':
                head = [head[0], head[1] - steps]
                break;

            case 'REST':
                head = [head[0], head[1]]
                break;

            default:
                break
        }

        dots.push(head)
        dots.shift()

        this.setState({
            snakeDots: dots
        })
    }


    //check food cond
    checkIfEat(head) {

        let food = this.state.food


        if (Math.abs(head[0] - food[0]) < 2 && Math.abs(head[1] - food[1]) < 2) {

            this.setState({ sound: foodSound, isPlaying : true, food: getRandomCoord(), score: this.state.score + 1 })

            this.enlargeSnake()
            this.increaseSpeed()



        }
    }

    enlargeSnake() {
        let newSnake = [...this.state.snakeDots]
        newSnake.unshift([])

        this.setState({ snakeDots: newSnake })
    }

    increaseSpeed() {
        this.setState({ speed: this.state.speed - 10 })
    }

    //checking game over condition
    checkBoundries(head) {

        if (head[0] >= boardWidth - 1 || head[1] >= boardHeith - 1 || head[0] < 0 || head[1] < 0) {
            this.gameOver()
        }
    }


    checkCollapsed() {
        let snake = [...this.state.snakeDots]
        let head = snake[snake.length - 1]
        snake.pop()
        snake.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                this.gameOver()
            }
        })
    }

    gameOver() {

        if (this.state.score > this.state.highScore) {
            alert('beat the highscore')
        }
        else {
            alert('cant beat high score : ' + this.state.highScore)
        }

        this.setState({ gameOver: true , highScore : this.state.score })
    
        // this.setState({ sound: gameOverSound })
        this.setState(initialState)


    }


    render() {
        // if(this.state.gameOver){
        //     return (
        //         <GameOver score = {this.state.score} highScore = {this.state.highScore} />
        //     )
        // }

        return (
            <>

                {
                    <Sound
                        url={this.state.sound}

                        playStatus={
                            this.state.isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}

                        // playFromPostion={300}
                        onLoading={this.handleSongLoading}
                        onPlaying={this.handleSongPlaying}
                        onFinishedPlaying={this.handleSongFinishedPlaying}
                    />
                }


                <div id='board' style={{ width: boardWidth + 'vmin', height: boardHeith + 'vmin' }}>

                    <div className="score-area float-right text-primary m-2 font-italic">

                        <h2 className='score' > Score : {this.state.score} </h2>
                        <h2 className='high-score score' > High Score : {this.state.highScore} </h2>

                    </div>

                    <Snake snakeDots={this.state.snakeDots} />
                    <Food food={this.state.food} />

                </div>
            </>
        )
    }
}
