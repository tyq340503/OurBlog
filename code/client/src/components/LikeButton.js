import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const updateBlog = gql`
    mutation updateBlog($id: ID!, $title: String!, $article: String!, $likes: Int!){
        updateBlog(
            id: $id,
            title: $title,
            article: $article,
            likes: $likes
        ) {
            id
            title
            article
            likes
        }
    }
`;

const getAllBlogs = gql`
query {
    allBlogs {
        id
        createdAt
        updatedAt
        title
        article
        likes
        postedBy {
          id
          name
        }
        comments {
          id
        }
    }
}
`;

const LikeButton = (props) => {
    return (
        <div>
            <Mutation query={updateBlog}
                // update={(cache, { data: { updateBlog } }) => {
                //     const { allBlogs } = cache.readQuery({
                //         query: getAllBlogs
                //     });
                //     cache.writeQuery({
                //         query: getAllBlogs,
                //         data: {
                //             allBlogs: allBlogs
                //         }
                //     })
                // }}
            >
                {(updateBlog, { data }) => (
                    <div>
                        <Button onClick={
                            updateBlog({
                                variables: {
                                    id: props.id,
                                    title: props.title,
                                    article: props.article,
                                    likes: props.likes + 1
                                }
                            })
                        }>
                            Like {props.likes}
                        </Button>
                    </div>
                )}

            </Mutation>
        </div>
    );
}

export default LikeButton;