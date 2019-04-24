import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import ReactModal from 'react-Modal';

//Import the file where my query constants are defined
import queries from '../../queries';

//For react-Article
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

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
class DeleteArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteArticle: this.props.isOpen,
            blog: this.props.deleteBlog
        };
        this.handleOpenDeleteArticle = this.handleOpenDeleteArticle.bind(this);
        this.handleCloseDeleteArticle = this.handleCloseDeleteArticle.bind(this);
        console.log(this.state.blog);
    }

    handleOpenDeleteArticle() {
        this.setState({showDeleteArticle: true});
    }

    handleCloseDeleteArticle() {
        this.setState({showDeleteArticle: false});
        this.props.handleClose(false);
    }
    render() {
        return (
            <div>
                {/*Add blog Article */}
                <ReactModal
                    name='deleteArticle'
                    isOpen={this.state.showDeleteArticle}
                    contentLabel='Delete blog'
                    style={customStyles}>
                    {/*Here we set up the mutation, since I want the data on the page to update
						after I have added someone, I need to update the cache. If not then
						I need to refresh the page to see the data updated 
						See: https://www.apollographql.com/docs/react/essentials/mutations for more
						information on Mutations
					*/}
                    <Mutation
                        mutation={queries.DELETE_BLOG}
                        update={(cache, {data: {removeblog}}) => {
                            const {blogs} = cache.readQuery({query: queries.GET_BLOGS});
                            cache.writeQuery({
                                query: queries.GET_BLOGS,
                                data: {blogs: blogs.filter((e) => e.id !== this.state.blog.id)}
                            });
                        }}>
                        {(removeblog, {data}) => (
                            <div>
                                <p>
                                    Are you sure you want to delete {this.state.blog.title}{' '}
                                    {this.state.blog.content}?
                                </p>

                                <form
                                    className='form'
                                    id='delete-blog'
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        removeblog({
                                            variables: {
                                                id: this.state.blog.id
                                            }
                                        });
                                        this.setState({showDeleteArticle: false});
                                        alert('blog Deleted');
                                        this.props.handleClose();
                                    }}>
                                    <br />
                                    <br />
                                    <button className='button add-button' type='submit'>
                                        Delete blog
                                    </button>
                                </form>
                            </div>
                        )}
                    </Mutation>
                    <br />
                    <br />
                    <button className='button cancel-button' onClick={this.handleCloseDeleteArticle}>
                        Cancel
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default DeleteArticle;