import React, {Component} from 'react';
import ChatUser from './ChatUser';
import smoothscroll from 'smoothscroll-polyfill';

class ChatUsersList extends Component{
    constructor(){
        super()
        this.chats = React.createRef()
        this.chatsContainer = React.createRef()
    }
    componentDidMount() {
        fetch('http://localhost:8080/api/chat/auth/getChats?pageSize=3',{
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        }).then(data => data.json())
          .then(data => this.props.setUserChats(data))
          smoothscroll.polyfill()
    }
    componentDidUpdate(){
        this.hideScrollBar()
    }
    
    hideScrollBar(){
        const clientHeight = this.chats.current.clientHeight
        const offsetHeight = this.chats.current.offsetHeight

        const height = parseFloat(window.getComputedStyle(this.chats.current).height)
        const containerHeight = parseFloat(window.getComputedStyle(this.chatsContainer.current).height)
        const paddingBottom = window.getComputedStyle(this.chatsContainer.current).paddingBottom


        const barHeight = containerHeight - height 
        const newHeight = offsetHeight > clientHeight && height >= containerHeight ? height + paddingBottom : Math.max(containerHeight, containerHeight + barHeight)
        

        this.chats.current.style.height = `${newHeight}px` 
        this.chats.current.style.paddingBottom = `${barHeight}px`
    }
    scroll = (e) => {
        this.chats.current.scroll(window.scrollX + e.deltaY * 5, window.scrollY);
    }
    render(){
        return (
            <div className="chats-container" ref={this.chatsContainer} onWheel = {this.scroll}>
                <div className="chats" ref={this.chats}>
                    {this.props.chats.map(chat => {
                        return (
                            <a className="chat" key={chat.id} onClick={() => this.getChat(chat)}>
                                <ChatUser chat={chat}/>
                            </a>
                        )
                    })}  
                </div>
            </div>
        )
    }
}

export default ChatUsersList