import About from "../../../Pages/About";
import Posts from "../../../Pages/Posts";
import PostIdPage from "../../../Pages/PostIdPage";
import Login from "../../../Pages/Login";

export const privateRoutes = [
    { path:'/About', component:About },
    { path:'/Posts', component:Posts },
    { path:'/Posts/:id', component:PostIdPage }
]
export const publicRoutes = [
    { path:'/Login', component:Login }
]