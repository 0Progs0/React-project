import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./Select/MySelect";

const PostFilter = ({filter,setFilter}) => {
    return (
        <div>
            <MyInput
                value = {filter.query}
                onChange = {e => setFilter({...filter, query: e.target.value})}
                placeholder = 'Search'
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter,sort: selectedSort})}
                defaultValue = "Filter"
                options={[
                    {value:'title',name:'by title'},
                    {value: 'body',name:'by description'}
                ]}
            />

        </div>
    );
};

export default PostFilter;