import React, { Component } from 'react';
import './Jokes.css';
import laugh1 from './laugh1.png';
import laugh2 from './laugh2.png';
import laugh3 from './laugh3.png';
import normal from './normal.png';
import sad from './sad.png';

class Jokes extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    colorDisplay() {
        if (this.props.vote < 0){
            return 'black';
        } else if (this.props.vote > 10) {
            return 'green';
        } else if (this.props.vote > 5){
            return 'yellow';
        } else if (this.props.vote > 0){
            return 'orange';
        } else {
            return 'red';
        };
    }
    iconDisplay() {
        if (this.props.vote < 0){
            return sad;
        } else if (this.props.vote > 10) {
            return laugh3;
        } else if (this.props.vote > 5){
            return laugh2;
        } else if (this.props.vote > 0){
            return laugh1;
        } else {
            return normal;
        };
    }
    
    render() { 
        // const icon = this.iconDisplay()
        return ( 
            <div className='Jokes'>
                <div className='Jokes-score'>
                    <span className='Jokes-score-up' onClick={() => this.props.upVote(this.props.id)}><i className="fas fa-arrow-up"></i></span>
                    <span className='Jokes-vote' style={{borderColor : this.colorDisplay()}}>
                       {this.props.vote}
                    </span>
                    <span className='Jokes-score-down' onClick={() => this.props.downVote(this.props.id)}><i className="fas fa-arrow-down"></i></span> 
                </div>
                <div className='Jokes-display'>
                    <p className='Jokes-description'>{this.props.joke}</p>
                </div>
                <div className='Jokes-icon'>
                    <img className='Jokes-icon-image' alt='emotion' src={this.iconDisplay()}/>
                </div>
            </div> 
        );
    }
}
 
export default Jokes;