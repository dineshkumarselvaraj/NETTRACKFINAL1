//action type constants
export const G_5 = 'G_5'
//action creators
export function callMovieAll(){
  return async function(dispatch){
        const res = await  fetch('https://api.themoviedb.org/3/discover/movie?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');

        const movies =await res.json();
        return dispatch ({
            type : 'G_5',
            data : movies.results
        })
    }
    
}

//action type constants
export const G_6 = 'G_6'
//action creators
export function callMovieDetail(IdData){
  return async function(dispatch){
    const res = await fetch(`https://api.themoviedb.org/3/movie/${IdData}?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US`);

    const movie = await res.json();
        return dispatch ({
            type : 'G_6',
            data : movie
        })
    }
    
}

//action type constants
export const RESET_6 = 'RESET_6'
//action creators
export function callMovieDetailForReset(){
        return {
            type : 'RESET_6'
        }
}
