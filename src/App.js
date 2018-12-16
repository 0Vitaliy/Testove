import React, { Component } from 'react';
import { connect } from 'react-redux';
import './pagination.css';
import logo from './logo.svg'


class App extends Component {
    state = {
        currentPage: 1,
        todosPerPage: 5
    };
    handleClick = this.handleClick.bind(this);


    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    componentDidMount(){
        this.props.fetchData('http://demo4070131.mockable.io/product');
    }
    render() {
        if(this.props.items) {
            var qwe ="none";
            const { currentPage, todosPerPage} = this.state;
            const {items} = this.props;
            console.log(items);

            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

            const currentTodos = items.slice(indexOfFirstTodo, indexOfLastTodo);
            var renderTodos = currentTodos.map((todo, index) => {
                return <div className="product" key={index}>
                    <h2 className="name">{todo.name}</h2>
                    <img className='foto' src={todo.img}/>
                    <p>{todo.price}$</p>
                </div>;
            });


            // Logic for displaying page numbers
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(items.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }

            var renderPageNumbers = pageNumbers.map(number => {
                return (
                    <li
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                    >
                        {number}
                    </li>
                );
            });
        }else{
            qwe='loader'
            renderPageNumbers='';
            renderTodos='';
        }
        return (
            <div className="wrapper">
                <img className={qwe} src={logo}/>
                <div className="product_block">
                    {renderTodos}
                    </div>
                <ul  id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>
        );
    }
}
function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}
function itemsFetchData(url) {
    return (dispatch) => {
        fetch(url)
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))

    };
}
const mapStateToProps =(state)=>({
    items:state.items.products,
    testStore: state.playList

});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    }
    }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
