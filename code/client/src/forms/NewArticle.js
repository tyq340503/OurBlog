import React, { Component } from 'react';
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import { Query, Mutation } from 'react-apollo';
import queries from '../queries';


class NewArticle extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: "",
            article: "",
            tags: new Map(),
            finalTags: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ tags: prevState.tags.set(item, isChecked)}))
    }

    isPicked (value, key, map) {
        if (value === true) {
            this.setState(prevState => ({
                finalTags: prevState.finalTags.append(key)
            }));
        }
    }

    async handleSubmit() {
        this.state.tags.forEach(this.isPicked);
        return
    }

    render () {
        let title, article;
        return (
            <div>
                <Row className="justify-content-md-center">
                    <Col lg={8}>
                        <h1>Create an Article</h1>
                        <Mutation mutation={queries.POST_BLOG}>
                            {(postBlog, { data }) => (
                                <Form onSubmit={async (e) => {
                                    e.preventDefault();
                                    await this.handleSubmit();
                                    postBlog({
                                        variables: {
                                            title: title.value,
                                            article: article.value,
                                            tags: this.state.finalTags
                                        }
                                    });
                                    title.value = "";
                                    article.value = "";
                                }}>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            name="title"
                                            type="title"
                                            placeholder="Title"
                                            ref={node => {
                                                title = node
                                            }}
                                            required
                                            autoFocus={true}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="article">
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control as="textarea" rows="3"
                                            ref={node => {
                                                article = node;
                                            }}
                                            required
                                        />
                                    </Form.Group>
                                    <FormGroup>
                                        <Form.Label>Tags</Form.Label>
                                        <Query query={queries.GET_ALL_TAGS}>
                                            {({ data, refetch }) => {
                                                if (!data) {
                                                    return null;
                                                }
                                                const { allTags } = data;
                                                if (!allTags) {
                                                    return null;
                                                }
                                                return (
                                                    <div>
                                                        {allTags.map((tag) => {
                                                            return (<Form.Check
                                                                custom
                                                                lable={tag.tag}
                                                                type="checkbox"
                                                                id={tag.id}
                                                                checked={this.state.tags.get(tag.name)}
                                                                onChange={this.handleChange}
                                                            />);
                                                        })}
                                                    </div>
                                                );
                                            }}
                                        </Query>
                                    </FormGroup>
                                    <Button variant="outline-primary" type="submit">Post</Button>
                                    <Button className="float-right" variant="outline-danger" type="cancel">Cancel</Button>
                                </Form>
                            )}
                        </Mutation>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default NewArticle;