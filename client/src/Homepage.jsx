import React from 'react'
import NavigationBar from './NavigationBar'

    function Homepage({ isLoggedIn }) {
        return(
            <div>
            {/*{isLoggedIn && (*/}         
                <NavigationBar />
                <h2>Welcome to the Homepage!</h2>    
            {/*}) */}
            </div>

        )
    }
export default Homepage;