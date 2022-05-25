
import style from '../styles/Posts.module.css'
export default function Posts({$target,initialState,callback = null}){
    this.state = initialState;
    const $postContainer = document.createElement('article');
    $postContainer.className = `${style.postContainer}`;
    $target.appendChild($postContainer);

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = () =>{
        const {posts} = this.state;
        if(!posts.length) return;
        const templete = posts.map((post,index) => `
        <div class="${style.post}" data-post-id="${post._id}">
        <div class="${style.imageContainer}">
        <img src="${post.imageUrls ? post.imageUrls[0] : post.thumbnail}" />
        </div>
        <ul class="${style.info}">
        <li>${post.title}</li>
        </ul>
        </div>
        `).join('');
        $postContainer.innerHTML = templete;
    }
    this.render();
    
    $postContainer.addEventListener('click',e=>{
        const $post = e.target.closest('article > div'); 
        if($post){
            const {postId} = $post.dataset;
            if(postId){
                callback(postId);
            }
        }
    })
}