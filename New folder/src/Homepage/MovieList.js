import React, {PureComponent} from 'react';
import styled from 'styled-components';
import Movie from './Movie';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {callMovieAll} from './moviesAction'

class MovieList extends PureComponent {
/*
 state = {
	movies : []
 }*/
 
 async componentDidMount(){
     const {isloaded,callMovieAll} = this.props
     if(!isloaded)
        callMovieAll()
 }

 render(){
     return(
         <div>
         {this.props.isloaded}
         <MovieGrid>
             {this.props.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
         </MovieGrid>
         </div>
     )
 }

}
const mapStateToProps = state => ({
    movies : state.movi.movies,
    isloaded : state.movi.isloaded
})

const mapDispatchToProps = dispatch => bindActionCreators ({
    callMovieAll
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(MovieList)

const MovieGrid = styled.div`
display: grid;
padding: 1rem;
grid-template-columns: repeat(6, 1fr);
grid-row-gap: 1rem;
`;

