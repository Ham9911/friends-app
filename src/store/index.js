import { createSlice,configureStore } from "@reduxjs/toolkit"
let arr=[]
const friendsSlice=createSlice({
    name:'friends',
    initialState:{status:false, search:arr ,user:[],posts:[],myposts:[]},
    reducers:{
    setShow(state,action){
       state.status=action.payload
    },
   setAllSearch(state,action){
    state.search=action.payload
   },
   setMyUser(state,action){
       state.user=action.payload
   },
   setAllPosts(state,action){
       state.posts=action.payload
   },
   setMyPosts(state,action){
       state.myposts=action.payload;
   }
    },
})
const store=configureStore({
  reducer:friendsSlice.reducer  
})
export const {setShow,setAllSearch,setMyUser,setAllPosts,setMyPosts}=friendsSlice.actions;
export default store