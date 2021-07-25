import React from 'react'
import Board from './Board'

function GameOver(props) {
    return (
        <div
        id = 'gameBoard'
        style = {{
            width : '20%',
            height : '20%',
            border: '2px solid black',

        }}>
            <div 
            id = 'gameOver'
            style = {{fontSize : '10px'}}>
                <h2>game Over</h2>
                <h3>Your Score  : {props.score}</h3>
                <h3>Your highScore  : {props.highScore}</h3>
            </div>
            <button className='btn'>Press Space To Restart</button>
           
        </div>
    )
}

export default GameOver
