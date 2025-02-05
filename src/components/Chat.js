import React, { Component } from 'react'
import Session from './Session';

class Chat extends Component {  

    getNextSessions() {
        fetch(`http://localhost:8080/chat/auth/getChats/chat/auth/nextSessions?chatId=${this.props.chat.id}page${this.props.chat.session})`)
            .then(data => data.json())
            .then(data => this.props.chat.sessions = data)
    }
    
    render() {
        return (
            <div className="sessions">
                {this.props.chat.sessions.map(session =>{
                    return <Session session={session} key={session.id}/>
                })}
            </div>
        )
    }
}

export default Chat