/*
//action type constants
export const G_1 = 'G_1'
//action creators
export function calltoggle(){
    return {
        type : 'G_1'
    }
}

//action type constants
export const G_2 = 'G_2'
//action creators
export function callIncrement(){
    return {
        type : 'G_2'
    }
}

//action type constants
export const G_3 = 'G_3'
//action creators
export function callDecrement(){
    return {
        type : 'G_3'
    }
}

//action type constants
export const G_4 = 'G_4'
//action creators
export function callIncrementNew(){
    return {
        type : 'G_4'
    }
}

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
*/
