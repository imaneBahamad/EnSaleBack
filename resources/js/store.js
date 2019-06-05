import { getLocalUser,Logout } from "./Helpers/auth";

const user=getLocalUser();
const display_ad='';
export default{
    state:{
        currentUser:user,
        isLoggedIn: !!user,
        loading: false,
        auth_error:null,
    },
    mutations:{
        login(state){
            state.loading=true;
            state.auth_error=null; 
        },
        loginSuccess(state,payload){
            state.auth_error=null;
            state.isLoggedIn=true;
            state.loading=false;
            state.currentUser=Object.assign({},payload.user, {token:payload.access_token});
            console.log("loginsuccess");
            console.log((state.currentUser));
            localStorage.setItem("user",JSON.stringify(state.currentUser));
        },
        loginFailed(state,payload){
            state.loading=false;
            state.auth_error=payload.error;
        }, 
        logout(state){
            Logout();
            console.log("logout Called");
            localStorage.removeItem("user");
            state.isLoggedIn=false;
            state.currentUser=null;
            location.reload();
        }
    },
    getters:{
        isLoggedIn(state){
            return state.isLoggedIn;
        },
        isLoading(state){
            return state.loading;
        },
        currentUser(state){
            return state.currentUser;
        },
        auth_error(state){
            return state.auth_error;
        },
        welcome(state){
            return state.welcomeMessage;
        }
    },
    actions:{
        //ajax calls to my api must be done in Actions cause it is asynchrounous, once it is resolved it will commit a mutation to my store
        login(context){
            context.commit("login");//we are commiting the login mutation
        },
        logout(context){
            context.commit("logout");//we are commiting the login mutation
        }
    }
}