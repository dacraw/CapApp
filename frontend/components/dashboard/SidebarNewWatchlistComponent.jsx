import React, { Component } from 'react'

export default class SidebarNewWatchlistComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate(prevProps, prevState){
        // if (prevP)
    }
    handleChange(e){
        e.preventDefault();
        this.setState({
            [e.currentTarget.getAttribute('name')]: e.currentTarget.value,
        })
    }
    handleSubmit(e){
        e.preventDefault();
        
        this.props.createWatchlist(this.state);
    }
    hide(){
        document.querySelector('#add-new-watchlist').style.display = "none";
    }
    render() {
        const {errors} = this.props;

        

        return (
            <div className="add-new-watchlist" id="add-new-watchlist">
                <form onSubmit={this.handleSubmit}>
                    <div className="two-col top">
                        <i class="fas fa-lightbulb"></i>
                        <input onChange={this.handleChange} value={this.state.title} type="text" name="title" placeholder="Watchlist Title" />
                    </div>
                    <div className="two-col bottom">
                        <button onClick={this.hide} className="cancel">Cancel</button>
                        <button className="create-watchlist generic" type="submit">Create Watchlist</button>
                    </div>
                    <ul className="new-watchlist-errors">
                        {(Object.values(errors).length) ? Object.values(errors).map(error => <li>{error}</li>) : ""}
                    </ul>
                </form>
            </div>
        )
    }
}
