import { createContext,useReducer } from "react";
import StateReducer from './StateReducer';

const initialState = {
    user:{
        name:'',
        email:'',
        token:''
    },
    notes:[],
    loading:false
}

export const GlobalContext = createContext();

export const GlobalProvider = ({children})=>{

    const [state,dispatch] = useReducer(StateReducer,initialState);

    return(
        <GlobalContext.Provider value={{
            user:state.user,
            notes:state.notes,
            loading:state.loading,
            dispatch
        }
        }>
            {children}
        </GlobalContext.Provider>
    )


}