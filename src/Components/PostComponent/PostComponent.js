import React, {useContext, useState} from "react";
import "./PostComponent.css";
import FacebookItem from "../FacebookItem/FacebookItem";
import userDatabase from "../../DemoDatabase/userDatabase";
import {UserContext} from "../../hooks/Context/UserContextProvider";

function PostComponent(props) {
    
    const {post} = props
    //to ID usera do którego należy post
    const userId = post.userId;
    //to user do którego należy post
    const user = userDatabase.find(currentUser => currentUser.id === userId);

    //to user który jest zalogowany
    const currentUser = useContext(UserContext);

    //tablica obiektu konkretnego posta która zawira id userów którzy polajkowali
    const [isLikedByUser, setIsLikedByUser] = useState(post.getLikes().find(likeId => likeId === currentUser.id));
   
    function addLike() {
        if(!isLikedByUser) {
            post.addLike(currentUser.id)
            setIsLikedByUser(post.getLikes().find(likeId => likeId === currentUser.id));
        }  else {
            post.subtractLike(currentUser.id)
            setIsLikedByUser(post.getLikes().find(likeId => likeId === currentUser.id));
        }
        localStorage.setItem("users", JSON.stringify(userDatabase));
    }

    //formularz nowego komentarza
    const [commentFomr, setCommentForm] = useState({commentText: ""})
    // state umożliwiający otwieranie komentarzy w konkretnym poście
    const [showComments, setShowComments] = useState(false)

    function addComment(event) {
        if(event.key==="Enter") {
            event.preventDefault()
            post.addComment(currentUser, commentFomr.commentText)
            setCommentForm({commentText: ""})
            setShowComments(true)
            //dodawanie powiadomień po dodaniu komentarza
            //*props.watchedUser => właściciel odwiedzananego profilu, * currentUser => profil zalogowanego usera
            userDatabase.forEach(customer => (
                customer.addNotification(currentUser, 1, post, props.watchedUser ? props.watchedUser.id : currentUser.id)))
            localStorage.setItem("users", JSON.stringify(userDatabase));
        }  
    }

    //uzupełniania formularz komentarza
    function handleChange(event) {
        const {name, value} = event.target;
        setCommentForm({[name]: value})
    }

    //header uzależniony czy piszemy na swojej czy kogoś tablicy
    function getHeaderText() {
        return `${!props.watchedUser ?
                   post.getAuthor() :
                   post.getAuthor() === props.watchedUser.getFullName() ?
                    post.getAuthor() :
                    post.getAuthor() + " ➜ " + props.watchedUser.getFullName()}`
    }

    return (
        <div className="post" id={post.id}>
            <div className="post--content">
                <FacebookItem img={user.getProfileImg()} text={getHeaderText()}
                              alternativeText={<span className="post--date">{post.dateOfPublic}</span>}
                              size={"big"} />
                <p className="post--text">{post.getBody()}</p>
            </div>
            {post.img &&
            <div className="post--img">
                <img src={post.getImg()} alt="post-img"/>
            </div>
            }
            <div className="post--meta">
                <div className="post--comments">
                     <span className="post--likes"><i className="fas fa-thumbs-up"></i>{post.getLikes().length}</span>
                     <div className="post--quantity">
                        <span className="post--quantity-value" onClick={() => setShowComments(prevStete => !prevStete)}>
                            {post.getComments().length} komentarzy
                        </span>
                        <span className="post--quantity-value">{post.getShareQuantity()} udostępnień</span>
                     </div>
                </div>
                <div className="post--opt">
                    <div className={!isLikedByUser ? "post--opt-item": "post--opt-item post--opt-liked"}
                         onClick={addLike}
                         >
                        <i className={!isLikedByUser ? "far fa-thumbs-up" : "fas fa-thumbs-up"}></i> Lubie to!
                    </div>
                    <div className="post--opt-item" onClick={() => setShowComments(prevStete => !prevStete)}>
                        <i className="far fa-comment-alt"></i> Komentarz
                    </div>
                    <div className="post--opt-item"><i className="fas fa-share"></i> Udostępnij</div>
                </div>
            </div>
            <div className="comment__contaienr">
                <div className="comment--input-box">
                    <img src={currentUser.getProfileImg()} alt="profile-img"/>
                    <textarea className={commentFomr.commentText.length > 40 && "area--plus"}
                                type="text"
                                placeholder="Napisz komentarz..."
                                name="commentText"
                                value={commentFomr.commentText}
                                onChange={handleChange}
                                onKeyDown={(e) => addComment(e)}
                    />
                </div>
                {showComments && (
                post.getComments().length > 0 &&
                    post.getComments().map(comment => (
                        <div className="comment">
                            <div className="coment--top">
                                <img src={comment.authorImg} alt={`${comment.author}`} />
                                <div className="commnet--content">
                                    <h3>{comment.author} </h3>
                                    <p className="comment--body">{comment.body}</p>
                                </div>
                            </div>
                            <span className="comment--date">{comment.dateOfPublic}</span>
                        </div>   
                    ))
                
                )}
            </div>
        </div>
    )
}

export default PostComponent;