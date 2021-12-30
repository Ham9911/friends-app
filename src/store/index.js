import { createSlice,configureStore } from "@reduxjs/toolkit"
let arr=[];
let arr2=[];
const friendsSlice=createSlice({
    name:'friends',
    initialState:{status:false, search:arr,liveSearch:arr2 ,user:[],posts:[],myposts:[],searchdata:'z'},
    reducers:{
    setShow(state,action){
       state.status=action.payload
    },
   setAllSearch(state,action){
    state.search=action.payload
   },
   searchparam(state,action){
    state.searchdata=action.payload;
   },
   setLiveSearch(state,action){
       state.liveSearch=action.payload
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
export const {setShow,setAllSearch,setLiveSearch,setMyUser,searchparam,setAllPosts,setMyPosts}=friendsSlice.actions;
export default store