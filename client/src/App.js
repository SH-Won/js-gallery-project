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


export default function App($target){
    const cache = {

    }
    const testCache = new Map();
    this.route = (params) =>{
        const {pathname} = location;

        $target.innerHTML = '';
        new NavBar({$target}).render();
        if(pathname === '/'){
            const initialState = testCache.has('pre') ? testCache.get('pre') : {
                posts:[],
                skip:0,
                limit:2,
            };
            // new LandingPage({
            //     $target,
            //     initialState : testCache.has('pre') ? testCache.get('pre') : {
            //         posts:[],
            //         skip:0,
            //         limit:2,
            //     },
            //     cache,
            //     testCache,
            // })
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
            new LoginPage({
                $target,
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
            const isModify = params === null ? false : true;
            // new EditPage({
            //     $target,
            //     isModify:params === null ? false : true,
            //     initialState: params,
            // })
            Auth(EditPage,true)({
                $target,
                isModify,
                initialState:params,
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
            new ArticleDetailPage({
                $target,
                articleId,
            })
        }
        
    }
    init(this.route);
    this.route();
    window.addEventListener('popstate',this.route);
    
}