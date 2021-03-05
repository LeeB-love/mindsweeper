import React, { Component } from 'react'; 

class App extends Component { 
    handleLeftClick = () => { alert('Left Click'); }; 
    handleRightClick = e => { e.preventDefault(); alert('Right Click'); }; 
    
    render() { 
        const { handleLeftClick, handleRightClick } = this; 
        return ( 
                <div> 
                    <button onClick={handleLeftClick}  onContextMenu={handleRightClick}> 
                    right test 
                    </button> 
                </div>
                ); 
    }

} 
        export default App;