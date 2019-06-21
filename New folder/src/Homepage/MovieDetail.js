import React, {Component} from 'react';
import styled from 'styled-components';
import {Poster} from './Movie'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {callMovieDetail,callMovieDetailForReset} from './moviesAction'

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
   /* state = { 
        movie: {}
     } */

     
    async componentDidMount() {
        console.log(this.props.match.params.id)
        this.props.callMovieDetail(this.props.match.params.id)
      /* try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US`);
        const movie = await res.json();
        this.setState({
            movie,
            });
        } catch (e) {
        console.log(e);
        } */
    }

    async componentWillUnmount() {
        this.props.callMovieDetailForReset();

    }


    render() { 
        const {movie} = this.props;
        if(!movie.id) return null;

        return ( 
            <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
                <MovieInfo>
                     <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
                     <div>
                         <h1>{movie.title}</h1>
                         <h3>{movie.release_date}</h3>
                         <p>{movie.overview}</p>
                     </div>
                </MovieInfo>
            </MovieWrapper>
         );
    }
}
 
const mapStateToProps = state => ({
    movie : state.movi.movie,
    isMovie : state.movi.isMovie
})

const mapDispatchToProps = dispatch => bindActionCreators ({
    callMovieDetail,callMovieDetailForReset
},dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(MovieDetail)

const MovieWrapper = styled.div`
position: relative;
padding-top: 50vh;
background: url(${props => props.backdrop}) no-repeat
background-size: cover;
`;

const MovieInfo = styled.div`
background: white;
text-align: left;
padding: 2rem 10%;
display: flex;
>div {
    margin-left: 20px;
}
img {
    postion: relative;
    top: -5rem;
}
`;