import React from 'react'


export default function Snake(props) {


    return (
        <>
            {props.snakeDots.map((dot, i) => {


                const style = {
                    left: `${dot[0]}vmin`,
                    top: `${dot[1]}vmin`

                }
                return <div  key={i} style={style}  id = { i === props.snakeDots.length - 1 ? 'head' : '' }  className = 'snakeBody rounded-pill' >  </div>

           

            })}

        </>
    )

}
