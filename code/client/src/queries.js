import gql from 'graphql-tag';

const GET_BLOGS = gql`
    query {
        blogs {
            id
            title
            content
            date
            likes
            user {
                first_name
                last_name
                id
                email
                address
            }
            comments{
                id
                comment
            }
        }
    }
`;

const GET_USERS = gql`
    query {
        users {
            first_name
            last_name
            id
            email
            address
        }
    }
`;

const GET_COMMENTS = gql`
    query {
        comments {
           id
           comment
        user {
            first_name
            last_name
            id
            email
            address
        }
        blogs {
            id
            title
            content
            date
            likes
        }
        }
    }
`;

const GET_USERS_WITH_BLOGS = gql`
    query {
        users {
            first_name
            last_name
            id
            email
            address
            numOfBlogs
            blogs {
                id
                title
                content
                date
                likes
            }
        }
    }
`;

const ADD_BLOG = gql`
    mutation createBlog($title: String!, $content: String!, $date: String!, $likes: Int, $userId: Int!) {
        addBlog(title: $title, content: $content, date: $date, likes: $likes, userId: $userId) {
            id
            title
            content
            date
            likes
            user {
                first_name
                last_name
                id
                email
                address
            }
        }
    }
`;

const ADD_USER = gql`
    mutation createUser($first_name: String!, $last_name: String!, $email: String!, $address: String) {
        addUser(first_name: $first_name, last_name: $last_name, email: $email, address: $address) {
            first_name
            last_name
            id
            email
            address
            numOfBlogs
            numOfComments
            blogs {
                title
                content
                date
                likes
                id
            }
            comments {
                id
                comment
            }
        }
    }
`;

const ADD_COMMENT = gql`
    mutation createComment($comment: String!) {
        addUser(comment: $comment) {
            comment
            id
            blogs {
                title
                content
                date
                likes
                id
            }
            user {
                first_name
                last_name
                id
                email
                address
            }
        }
    }
`;

const DELETE_BLOG = gql`
    mutation deleteBlog($id: String!) {
        removeBlog(id: $id) {
            id
            title
            content
            date
            likes
            user {
                first_name
                last_name
                id
                email
                address
            }
            comments {
                id
                comment
            }
        }
    }
`;

const DELETE_USER = gql`
    mutation deleteUser($id: String!) {
        removeUser(id: $id) {
            first_name
            last_name
            id
            email
            address
            blog {
                title
                content
                id
                date
                likes
            }
            comments {
                id
                comment
            }
        }
    }
`;

const DELETE_COMMENT = gql`
    mutation deleteComment($id: String!) {
        removeBlog(id: $id) {
            id
            comment
            user {
                first_name
                last_name
                id
                email
                address
            }
            blog {
                title
                content
                id
                date
                likes
            }
        }
    }
`;

const EDIT_BLOG = gql`
    mutation changeBlog($id: String!, $title: String, $content: String, $date: String, $likes: Int, $userId: Int) {
        editBlog(id: $id, userId: $userId, title: $title, content: $content, date: $date, likes: $likes) {
            id
            title
            content
            date
            likes
            user {
                first_name
                last_name
                id
                email
                address
            }
            comments {
                id
                comment
            }
        }
    }
`;

const EDIT_USER = gql`
    mutation changeUser($id: String!, $first_name: String, $last_name: String, $email: String, $address: String,  $blogId: Int, $commentId: Int) {
        editUser(id: $id, blogId: $blogId, commentId: $commentId, first_name: $first_name, last_name: $last_name, email: $email, address: $address) {
            first_name
            last_name
            id
            email
            address
            blog {
                id
                title
                content
                date
                likes
            }
            comments {
                id
                comment
            }
        }
    }
`;

const EDIT_COMMENT = gql`
    mutation changeUser($id: String!, $comment: String,  $blogId: Int, $userId: Int) {
        editUser(id: $id, blogId: $blogId, userId: $userId, comment: $comment) {
            id
            comment
            user {
            first_name
            last_name
            id
            email
            address
            }
            blog {
                id
                title
                content
                date
                likes
            }
        }
    }
`;

export default {
    ADD_BLOG,
    GET_BLOGS,
    GET_USERS,
    GET_COMMENTS,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_BLOG,
    GET_USERS_WITH_BLOGS,
    ADD_USER,
    EDIT_BLOG,
    DELETE_USER,
    EDIT_USER,
    DELETE_COMMENT
};