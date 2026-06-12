export function JobReducer(state,action){
    switch(action.type){
        //add job
        case "ADD":
            return[
                ...state,
                {...action.job,id:"j"+Date.now()},

            ];
        //update job
        case "UPDATE":
            return state.map((j)=>
            j.id==action.job.id?{...j,...action.job}:j
        );
        //DELETE job
        case "DELETE":
        return state.filter((j)=> j.id !==action.id);

        //MOVE
        case "MOVE":
        return state.map((j)=>
        j.id==action.id?{...j,status:action.status}:j
        );

        default:
            return state;
    }
}