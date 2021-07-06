import React from 'react';
import Tilt from 'react-parallax-tilt';
import "./Logo.css";

const Logo = () => {
    return (
        <Tilt>
            <div className="Tilt br2 pa2" options={{max:25}}>
                <div className="Tilt-inner">👀</div>
            </div>
            </Tilt>
        
    )
}

export default Logo;