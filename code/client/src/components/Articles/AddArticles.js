import React, {Component} from 'react';
import {Query, Mutation} from 'react-apollo';
import ReactModal from 'react-Modal';
import queries from '../../queries';

ReactModal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        border: '1px solid #28547a',
        borderRadius: '4px'
    }
};

class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddArticle: this.props.isOpen
        };
        this.handleOpenAddArticle = this.handleOpenAddArticle.bind(this);
        this.handleCloseAddArticle = this.handleCloseAddArticle.bind(this);
    }

    handleOpenAddArticle() {
        this.setState({showAddArticle: true});
    }

    handleCloseAddArticle() {
        this.setState({showAddArticle: false});
        this.props.handleClose(false);
    }
    render() {
        let body;
        //check which add Article they are trying to get to and then render the form, mutation/query accordingly
        //if Add Employee
        if (this.props.Article === 'addBlog') {
            let title;
            let content;
            let date;
            let likes;
            body = (
                <Mutation
                    mutation={queries.ADD_BLOG}
                    update={(cache, {data: {addBlog}}) => {
                        const {blogs} = cache.readQuery({query: queries.GET_BLOGS});
                        cache.writeQuery({
                            query: queries.GET_BLOGS,
                            data: {blogs: blogs.concat([addBlog])}
                        });
                    }}>
                    {(addBlog, {data}) => (
                        <form
                            className='form'
                            id='add-blog'
                            onSubmit={(e) => {
                                e.preventDefault();
                                addBlog({
                                    variables: {
                                        title: title.value,
                                        content: content.value,
                                        likes: likes.value,
                                        date: date.value,
                                       // userId: parseInt(userId.value)
                                    }
                                });
                                title.value = '';
                                content.value = '';
                                //userId.value = '1';
                                this.setState({showAddArticle: false});
                                alert('Blog Added');
                                this.props.handleClose();
                            }}>
                            <div className='form-group'>
                                <label>
                                    Title:
                                    <br />
                                    <input
                                        ref={(node) => {
                                            title = node;
                                        }}
                                        required
                                        autoFocus={true}
                                    />
                                </label>
                            </div>
                            <br />
                            <div className='form-group'>
                                <label>
                                    Content:
                                    <br />
                                    <input
                                        ref={(node) => {
                                            content = node;
                                        }}
                                        required
                                    />
                                </label>
                            </div>
                            <br />

                            <Query query={queries.GET_BLOGS}>
                                {({data}) => {
                                    const {users} = data;
                                    if (!users) {
                                        return null;
                                    }
                                    return (
                                        <div className='form-group'>
                                            <label>
                                                User:
                                                <select
                                                    className='form-control'
                                                    ref={(node) => {
                                                        //userId = node;
                                                    }}>
                                                    {users.map((user) => {
                                                        return (
                                                            <option key={user.id} value={user.id}>
                                                                {user.first_name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </label>
                                        </div>
                                    );
                                }}
                            </Query>
                            <br />
                            <br />
                            <button className='button add-button' type='submit'>
                                Add Blog
                            </button>
                        </form>
                    )}
                </Mutation>
            );
            //If add User
        } else if (this.props.Article === 'addUser') {
            let first_name;
            let last_name;
            let email;
            let address;
            body = (
                <Mutation
                    mutation={queries.ADD_USER}
                    update={(cache, {data: {addUser}}) => {
                        const {users} = cache.readQuery({query: queries.GET_USERS_WITH_BLOGS});
                        cache.writeQuery({
                            query: queries.GET_USERS_WITH_BLOGS,
                            data: {users: users.concat([addUser])}
                        });
                    }}>
                    {(addUser, {data}) => (
                        <form
                            className='form'
                            id='add-employer'
                            onSubmit={(e) => {
                                e.preventDefault();
                                addUser({
                                    variables: {
                                        first_name: first_name.value,
                                        last_name: last_name.value,
                                        email: email.value,
                                        address: address.value,
                                        //userId: parseInt(userId.value)
                                    }
                                });
                                first_name.value = '';
                                last_name.value ='';
                                email.value = '' ;
                                address.value = '';
                              //  userId.value = '';
                                this.setState({showAddArticle: false});
                                alert('User Added');
                                this.props.handleClose();
                            }}>
                            <div className='form-group'>
                                <label>
                                    User Name:
                                    <br />
                                    <input
                                        ref={(node) => {
                                            first_name = node;
                                        }}
                                        required
                                        autoFocus={true}
                                    />
                                    <input
                                        ref={(node) => {
                                            last_name = node;
                                        }}
                                        required
                                        autoFocus={true}
                                    />
                                    <input
                                        ref={(node) => {
                                            email = node;
                                        }}
                                        required
                                        autoFocus={true}
                                    />
                                    <input
                                        ref={(node) => {
                                            address = node;
                                        }}
                                        required
                                        autoFocus={true}
                                    />
                                </label>
                            </div>
                            <br />

                            <br />
                            <br />
                            <button className='button add-button' type='submit'>
                                Add User
                            </button>
                        </form>
                    )}
                </Mutation>
            );
        }

        return (
            <div>
                <ReactModal
                    name='addArticle'
                    isOpen={this.state.showAddArticle}
                    contentLabel='Add Article'
                    style={customStyles}>
                    {body}
                    <button className='button cancel-button' onClick={this.handleCloseAddArticle}>
                        Cancel
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default AddArticle;