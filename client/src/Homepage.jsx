import React from 'react'
import NavigationBar from './NavigationBar'

    function Homepage({ isLoggedIn }) {
        return(
            <div>
            {/*{isLoggedIn && (*/}         
                <h2>Welcome to the Homepage!</h2>    
                <NavigationBar />
            {/*}) */}
            </div>

        )
    }
export default Homepage;