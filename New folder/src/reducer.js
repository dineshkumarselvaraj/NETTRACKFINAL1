/*import {G_1,G_2,G_3,G_4,G_5} from './action'

const initialState = {
    message  : false
    ,count : 0
    ,movies : []
    ,isloaded : false
}
//anonymus function mess
export default function(state=initialState, action){
    const {type,data} = action
    console.log(state.count, type)
    switch(type){
      case G_1 :
        return {...state, message : !state.message};
        case G_2 :
        console.log(state.count)
        return {...state, count : state.count + 1};
        case G_3 :
        console.log(state.count)
        return {...state, count : state.count - 1};

        case G_4 :
        console.log(state.count)
        return {...state, count : state.count + 2};

        case G_5 :
        console.log(state.count)
        return {...state, movies : data ,isloaded : true}
       ;
    
        default :
        return state;
    }
}*/