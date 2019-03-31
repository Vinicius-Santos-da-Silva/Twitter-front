import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';
import twitterLogo from '../twitter.svg';
import './Timeline.css';

import Tweet from '../components/Tweet';


export default class Timeline extends Component {
    state = {
        tweets : [],
        newTweet : '',
    };

    async componentDidMount(){
        this.subscribeToEvents();
        const response = await api.get('tweets');

        this.setState({ tweets: response.data});

    };

    subscribeToEvents = () =>{
        const io = socket("http://ec2-18-222-221-231.us-east-2.compute.amazonaws.com:3001");
        //const io = socket("http://localhost:3001");

        io.on("tweet" , data =>{
            this.setState({ tweets: [data, ...this.state.tweets]})
        });

        io.on('like' , data =>{
            this.setState({
                tweets : this.state.tweets.map(
                    tweet => (tweet._id === data._id? data : tweet)
                )
            })
        })
    };

    handleInputChange = e => {
        this.setState({newTweet: e.target.value});
    };
    
    handleNewTweet = async e => {
        if(e.keyCode !== 13) return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@Twitter:username');
        
        console.log({content,author});
        
        await api.post('tweets' , {content,author})

        this.setState({ newTweet: '' })
    }

    render(){
        return (
            <div className="timeline-wrapper">
                <img src={twitterLogo} alt='GoTwitter'/>
                <form>
                    <textarea
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que está Acontecendo?"
                    />
                </form>

                <ul className="tweet-list">
                    {this.state.tweets.map(tweet =>(
                        <Tweet key={tweet._id} tweet={tweet} />
                    ))}
                </ul>

            </div>

        );
    }
}