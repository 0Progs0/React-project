import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    const [post,setPost] = useState({
        title:'',
        body:''
    })
    const addNewPost = (e) => {
        e.preventDefault()
        const  newPost = {
            ...post,id:Date.now()
        }
        create(newPost);
        setPost({title: '',body: ''})

    }
    return (
        <div>
            <form>
                {/*Управляемый компонент*/}
                <MyInput
                    placeholder={"Name of post"}
                    value={post.title}
                    onChange={event => setPost({...post,title:event.target.value})}
                />
                <MyInput
                    placeholder={"Description of post"}
                    value={post.body}
                    onChange={event => setPost({...post,body:event.target.value})}
                />
                {/*Неуправляемый компонент*/}
                {/*<MyInput*/}
                {/*    placeholder={"Description of post"}*/}
                {/*    ref = {bodyInputRef}*/}
                {/*/>*/}
                <MyButton onClick={addNewPost}>Create post</MyButton>
            </form>
        </div>
    );
};

export default PostForm;