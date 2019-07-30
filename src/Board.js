import React, { Component } from 'react';
import logo from './main-icon.png';
import './Board.css';
import axios from 'axios';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = { jokes:[] };
        this.newJokes = this.newJokes.bind(this);
    }

    async componentDidMount() {
        this.newJokes();
    }
    

    async newJokes(){
        for (let i=0; i < 10;i++){
            let res = await axios.get('https://icanhazdadjoke.com/', {headers : {Accept :"application/json"}})
            console.log(res.data);
        }
    }
    render() { 
        return ( 
            <div className='Board'>
                <div>
                    <h1>Dad <span>Joke</span></h1>
                    <img className='Board-logo' alt='Main-icon' src={logo}/>
                    <button onClick={this.newJokes}>New Jokes</button>
                </div>
                <div>

                </div>
            </div> 
        );
    }
}
 
export default Board;
