import React, {Component} from 'react';
//Import Query from react-apollo
import {Query, Mutation} from 'react-apollo';
import ReactArticle from 'react-Article';

//Import the file where my query constants are defined
import queries from '../../queries';

//For react-Article
ReactArticle.setAppElement('#root');
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

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class EditArticle extends Component {
    constructor(props) {
        //console.log(this.props.blog);
        super(props);
        this.state = {
            showEditArticle: this.props.isOpen,
            blog: this.props.blog
        };
        this.handleCloseEditArticle = this.handleCloseEditArticle.bind(this);
    }

    handleCloseEditArticle() {
        this.setState({showEditArticle: false, blog: null});
        this.props.handleClose();
    }

    render() {
        let title;
        let content;
        let date;
        let likes;
        let userId;
        return (
            <div>
                {/*Edit blog Article - NOT DONE YET */}
                <ReactArticle
                    name='editArticle'
                    isOpen={this.state.showEditArticle}
                    contentLabel='Edit blog'
                    style={customStyles}>
                    <Mutation mutation={queries.EDIT_BLOG}>
                        {(editblog, {data}) => (
                            <form
                                className='form'
                                id='add-blog'
                                onSubmit={(e) => {
                                    console.log(title.value);
                                    console.log(content.value);
                                    console.log(parseInt(userId.value));
                                    e.preventDefault();
                                    editblog({
                                        variables: {
                                            id: this.props.blog.id,
                                            title: title.value,
                                            content: content.value,
                                            userId: parseInt(userId.value)
                                        }
                                    });
                                    title.value = '';
                                    content.value = '';
                                    userId.value = '1';
                                    this.setState({showEditArticle: false});
                                    alert('blog Updated');
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
                                            defaultValue={this.props.blog.title}
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
                                            defaultValue={this.props.blog.content}
                                        />
                                    </label>
                                </div>
                                <br />

                                <Query query={queries.GET_USERS}>
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
                                                        defaultValue={this.props.blog.user.id}
                                                        className='form-control'
                                                        ref={(node) => {
                                                            userId = node;
                                                        }}>
                                                        {users.map((user) => {
                                                            return (
                                                                <option key={user.id} value={user.id}>
                                                                    {user.first_name}
                                                                    {user.last_name}
                                                                    {user.email}
                                                                    {user.address}
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
                                    Update blog
                                </button>
                            </form>
                        )}
                    </Mutation>
                    <button className='button cancel-button' onClick={this.handleCloseEditArticle}>
                        Cancel
                    </button>
                </ReactArticle>
            </div>
        );
    }
}

export default EditArticle;