import { init } from './utills/router.js';
import LandingPage from './page/LandingPage.js';
import NavBar from './components/NavBar.js';
import PostDetailPage from './page/PostDetailPage.js';
import BestPage  from './page/BestPage.js'
import EditPage from './page/EditPage.js';
import ArticlePage from './page/ArticlePage.js';
import ArticleDetailPage from './page/ArticleDetailPage.js';
import TestPage from './page/TestPage.js';
import RegisterPage from './page/RegisterPage.js';
import LoginPage from './page/LoginPage.js';
import Auth from './Auth.js';
import { selector } from './utills/selector.js';
import { destoryImage, logoutUser } from './utills/api.js';
import './utills/prototype';

export default function App($target){
    const cache = {

    }
    const testCache = new Map();
    this.route = (params = {}) =>{
        const {pathname} = location;
        $target.innerHTML = '';
        // NavBar
        Auth(NavBar,false)({
            $target,
        })
        
        if(pathname === '/'){
            const initialState = testCache.has('pre') ? testCache.get('pre') : {
                posts:[],
                skip:0,
                limit:2,
            };
            
            Auth(LandingPage,false)({
                $target,
                initialState,
                cache,
                testCache
            })
        }
        else if(pathname ==='/register'){
            new RegisterPage({
                $target,
            })
        }
        else if(pathname ==='/login'){
            const connect = params !==null && params.hasOwnProperty('route') ?  params.route : '/'; 
            Auth(LoginPage,false)({
                $target,
                connect,
            })
        }
        else if(pathname.split('/')[1] === 'post'){
            const [ , ,postId] = pathname.split('/');
            new PostDetailPage({$target,postId});
        }
        else if(pathname ==='/best'){
            new BestPage({
                $target,
                cache
            }).render();
        }
        else if(pathname === '/test'){
            new TestPage({
                $target,
            })
        }
        else if(pathname ==='/edit'){
            const isModify = params !== null && params.hasOwnProperty('article') ? true : false;
            const prevRoute = params !== null && params.hasOwnProperty('route') ? params.route : pathname;
            
            Auth(EditPage,true,prevRoute)({
                $target,
                isModify,
                initialState:isModify ? params.article : null,
            })
        }
        else if(pathname === '/article'){
            new ArticlePage({
                $target,
                initialState:{
                    posts:[],
                }
            })
        }
        else if(pathname.split('/')[1] === 'article'){
            const [ , ,articleId] = pathname.split('/');
            Auth(ArticleDetailPage,false)({
                $target,
                articleId,
            })
        }
        
    }
    init(this.route);
    this.route();
    window.addEventListener('popstate',(e) =>{
        console.log('pop state');
        if(e.state && e.state.from === '/edit'){
            const user = selector(state => state.user);
            destoryImage({writer:user._id})
        }
        this.route();
    });
    
    window.addEventListener('beforeunload', () =>{
        logoutUser()
        .then(response =>{
            if(response.success){
                
            }
        })
    })

}