import React from 'react';
import axios from 'axios';


class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            loading: false,
        }
    }

    handleSubmit = (event) => {
        this.setState({ searchResults: [], loading: true });

        event.preventDefault();
        const formData = new FormData(event.target);
        const term = formData.get('term');
        
        axios.get(`https://crawler-lab.herokuapp.com/${term}`)
        .then( (response) => {
          this.setState({ searchResults: response.data, loading: false })
        })
        .catch(function (error) {
          console.log(error);
        })
      }

    render() {
        const { searchResults } = this.state;
        const { loading } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Enter term </label>
                    <input id="term" name="term" type="text" />
                    <button>Search!</button>
                </form>
                {( loading ? 'wait a little - loading incredible discounts!': '')}
                <ul style={{"list-style": "none"}}>{ searchResults.map((result, i) => 
                    <li key={i}>
                        <div>
                            <img height="100px" width="100px" src={result.photo} alt={result.photo}></img>
                             <span style={ {"color" : "red"}}>{result.price.promotional_price}</span> 
                            <a href={result.link}>{result.name}</a>
                        </div>
                    </li>
                )}</ul>
            </div>
        );
    }
}

export default List;