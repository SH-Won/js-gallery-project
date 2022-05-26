import { request } from '../utills/api';
import Loading from './Loading';
import '../styles/style_ck.css';
import styles from '../styles/Detail.module.css';
export default function ArticleDetailPage({$target,articleId}){
    const $page = document.createElement('div');
    $page.className = `${styles.page}`;
    $target.appendChild($page);
    this.state = {
        article:null,
        isLoading:true,
    }
    this.setState = (nextState) =>{
        this.state = nextState;
        loading.setState(this.state.isLoading);
        this.render();
    }
    this.render = () =>{
        if(this.state.isLoading) return;
        
        const {article} = this.state;
        console.log(article);
        $page.innerHTML = `
        <div class="${styles.container}">
        <h2>${article.title}</h2>
        <div class="ck-content">
        ${article.data}
        </div>
        </div>
        `;
       
    }
    const loading = new Loading({
        $target:$page,
        initialState:this.state.isLoading,
    })
    const fetchArticle = async () =>{
        try{
            this.setState({
                ...this.state,
                isLoading:true,
            })
            const params = {articleId};
            const [article] = await request('/detailArticle',params);
            this.setState({
                ...this.state,
                isLoading:false,
                article,
            })

        }catch(e){

        }
    }
    fetchArticle();
}