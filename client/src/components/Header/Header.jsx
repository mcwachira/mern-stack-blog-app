import React from 'react'
import './Header.css'
const Header = () => {
    return (
        <div className="header">

            <div className="headerTitles">

                <span className="headerTitlesSm">
                    Full Stack Node
                </span>
                <span className="headerTitlesLg">
                    Blog
                </span>
            </div>
            <img src="https://images.pexels.com/photos/4558481/pexels-photo-4558481.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="headerImg" />
        </div>
    )
}

export default Header