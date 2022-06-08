import { createContext,useReducer } from "react";
import StateReducer from './StateReducer';

const initialState = {
    user:{
        name:'',
        token:''
    },
    notes:[]
}

export const GlobalContext = createContext();

export const GlobalProvider = ({children})=>{

    const [state,dispatch] = useReducer(StateReducer,initialState);

    return(
        <GlobalContext.Provider value={{
            user:state.user,
            notes:state.notes,
            dispatch
        }
        }>
            {children}
        </GlobalContext.Provider>
    )


}