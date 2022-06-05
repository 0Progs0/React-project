import React, {useEffect, useMemo, useRef, useState} from 'react'
import {useSortedPosts} from "../Hooks/usePosts";
import {useFetching} from "../Hooks/useFetching";
import {getPagesCount} from "../Utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModuleForm from "../components/ModuleForm/MyModuleForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/Pagination/Pagination";
import PostService from "../API/PostService";
import PostForm from "../components/PostForm";
import {useObserver} from "../Hooks/useObserver";
import MySelect from "../components/Select/MySelect";



function Posts() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript 1', body: 'Description'},
        {id: 2, title: 'Javascript 2', body: 'Description'},
        {id: 3, title: 'Javascript 3', body: 'Description'},

    ])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [moduleForm, setModuleForm] = useState(false)
    const sortedAndSearchedPosts = useSortedPosts(posts, filter.sort, filter.query)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts,...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit));
    })

    useObserver(lastElement,page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts()
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModuleForm(false)
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }
    function getSortedPosts() {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    }

    return (<div className="App">
        <MyButton style={{marginTop: 30}} onClick={() => setModuleForm(true)}>
            Create
        </MyButton>
        <MyModuleForm
            visible={moduleForm}
            setVisible={setModuleForm}
        >
            <PostForm create={createPost}/>
        </MyModuleForm>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        <MySelect
            value={limit}
            onChange={value => setLimit(value)}
            defaultValue="Count of posts"
            options={[
                {value: 5, name: '5'},
                {value: 15, name: '15'},
                {value: 25, name: '25'},
                {value: -1, name: 'Show all'}
            ]}
        />
        {postError &&
            <h1>Error! ${postError}</h1>}
        <PostList
            posts={sortedAndSearchedPosts}
            remove={removePost}
            title={'Posts about JS'}/>
        <div ref ={lastElement} style={{height:20,background:'grey'}}></div>
        {isPostsLoading &&
            <div style={
                {display: 'flex',
                    justifyContent: 'center',
                    marginTop: 20}}>
                <Loader/>
            </div>
        }
        <Pagination
            page={page}
            changePage={changePage}
            totalPages={totalPages}
        />
    </div>);
}

export default Posts;
