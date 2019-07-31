import React, { Component } from 'react';
import logo from './main-icon.png';
import './Board.css';
import axios from 'axios';
import Jokes from './Jokes';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            jokes:[],
            isLoaded: false 
        };
        this.newJokes = this.newJokes.bind(this);
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        // localStorage.clear();
        try {
            setTimeout(() => {
                if (localStorage.getItem('jokes')){
                    let result = JSON.parse(localStorage.getItem('jokes'));
                    this.setState({jokes : result})
                } else {
                    this.newJokes();
                }
                this.setState({isLoaded: true});
            }, 3000);
        }
        catch (err){
            alert(err);
        }
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevState.jokes !== this.state.jokes) {
            localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
        }
    }
    

    async newJokes(){
        try {
            for (let i=0; i < 10;i++){
                let res;
                do {
                    res = await axios.get('https://icanhazdadjoke.com/', {headers : {Accept :"application/json"}})
                } while (this.checkDuplicateJoke(res.data.id))
    
                this.setState(st => ({
                    jokes : [...st.jokes, {id : res.data.id, joke: res.data.joke, vote : 0}]
                })) 
            }
            this.setState({isLoaded: true});
        }
        catch (err){
            alert(err);
        }

    }

    checkDuplicateJoke(id){
        if (this.state.jokes.some(joke => joke.id === id)){
            return true;
        } else{
            return false;
        }
    }

    handleClick(){
        this.setState({isLoaded: false});
        this.newJokes();
    }

    compareVote(a,b){
        const vote1 = a.vote;
        const vote2 = b.vote;
        return (vote1 - vote2) * -1;
    }

    upVote(id){
        const array = this.state.jokes.map(joke => {
            if (id === joke.id){
                return {...joke, vote : joke.vote + 1}
            }
            return joke;
        });

        this.setState({jokes : array.sort(this.compareVote)});
    }

    downVote(id){
        const array = this.state.jokes.map(joke => {
            if (id === joke.id){
                return {...joke, vote : joke.vote - 1}
            }
            return joke;
        });
    
        this.setState({jokes : array.sort(this.compareVote)});
    }
    render() { 
        // const jokes = JSON.parse(localStorage.getItem('jokes'));
        return (
            <div className='Board'>
                {this.state.isLoaded 
                ?
                    (<div className='Board-1'>
                        <div className='Board-main'>
                            <h1 className='Board-main-title'>Dad <span>Jokes</span></h1>
                            <img className='Board-main-logo' alt='Main-icon' src={logo}/>
                            <button className='Board-main-button' onClick={this.handleClick}>New <span>Jokes</span></button>
                        </div>
                        <div className='Board-jokes'>
                            {this.state.jokes.map(joke => {
                                    return <Jokes 
                                            key={joke.id} 
                                            id={joke.id} 
                                            joke={joke.joke} 
                                            vote={joke.vote} 
                                            upVote={this.upVote} 
                                            downVote ={this.downVote}                                   
                                            />
                                })
                            }
                        </div>
                    </div> )
                : (<div className='loader'></div>)
                }
            </div> 
        );
    }
}
 
export default Board;
