//import {G_5,G_6} from '../movies/moviesAction'
import {G_5,G_6,RESET_6} from './moviesAction'

const initialState = {
     movies : []
    ,isloaded : false
    ,movie : {}
    ,isMovie : false
}
//anonymus function mess
export default function(state=initialState, action){
    const {type,data} = action
    switch(type){
      
        case G_5 :
        return {...state, movies : data ,isloaded : true}
       ;

       case G_6 :
       return {...state, movie : data, isMovie : true}
      ;
      case RESET_6 :
       return {...state, movie : {}, isMovie : false}
      ;
    
        default :
        return state;
    }
}