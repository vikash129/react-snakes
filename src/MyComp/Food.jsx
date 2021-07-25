import React from 'react'

function Food({food}) {

    const style = {
        left : `${food[0]}vmin`,
        top : `${food[1]}vmin`
    }
    return (
        
            <div id="food" style = {style}>
                
            </div>
        
    )
}

export default Food
