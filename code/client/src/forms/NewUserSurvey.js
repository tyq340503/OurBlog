import React, { Component } from "react";
import { Form, Button, Row, Container, Col } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const newUser = gql`
    mutation addUser ($name: String!, $phone: String!, $address: String, $interest:String!){
        addUser(
            name: $name,
            phone: $phone,
            address: $address,
            interest: $interest
        ) {
            name
            phone
            address
            interest
        }
    }
`;

class NewUserSurvey extends Component {

    render() {
        let name, phone, address, interest;
        let street_address, address2, city, state, zipcode;
        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col lg={8}>
                            <Mutation mutation={newUser}>
                                {(newUser, { data }) => (
                                    <Form onSubmit={e => {
                                        e.preventDefault();
                                        let address_arr = [street_address, address2. city, state, zipcode];
                                        address = address_arr.join(", ");
                                        newUser({
                                            variables: {
                                                name: name.value,
                                                phone: phone.value,
                                                address: address,
                                                interest: interest.value
                                            }
                                        });
                                        name.value = "";
                                        phone.value = "";
                                        interest.value = "";
                                        street_address.value = "";
                                        address2.value = "";
                                        city.value = "";
                                        state.value = "";
                                        zipcode.value = "";
                                    }}>
                                        <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                name="name"
                                                type="name"
                                                placeholder="Name"
                                                ref={node => {
                                                    name = node
                                                }}
                                                required
                                                autoFocus={true}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                name="phone"
                                                type="phone"
                                                placeholder="Phone Number"
                                                ref={node => {
                                                    phone = node
                                                }}
                                                required
                                                autoFocus={true}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                name="street_address"
                                                type="street_address"
                                                placeholder="1234 Main St"
                                                ref={node => {
                                                    street_address = node
                                                }}
                                                required
                                                autoFocus={true}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Address 2</Form.Label>
                                            <Form.Control
                                                name="address2"
                                                type="address2"
                                                placeholder="Apartment, studio, or floor"
                                                ref={node => {
                                                    address2 = node
                                                }}
                                                required
                                                autoFocus={true}
                                            />
                                        </Form.Group>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control
                                                        name="city"
                                                        type="city"
                                                        ref={node => {
                                                            city = node
                                                        }}
                                                        required
                                                        autoFocus={true}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group>
                                                    <Form.Label>State</Form.Label>
                                                    <Form.Control
                                                        name="state"
                                                        type="state"
                                                        ref={node => {
                                                            state = node
                                                        }}
                                                        required
                                                        autoFocus={true}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Group>
                                                    <Form.Label>Zip</Form.Label>
                                                    <Form.Control
                                                        name="zipcode"
                                                        type="zipcode"
                                                        ref={node => {
                                                            zipcode = node
                                                        }}
                                                        required
                                                        autoFocus={true}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group controlId="interest">
                                            <Form.Label>Content</Form.Label>
                                            <Form.Control as="textarea" rows="2"
                                                ref={node => {
                                                    interest = node;
                                                }}
                                                required
                                            />
                                        </Form.Group>
                                        <Button variant="outline-primary" type="submit">Post</Button>
                                        <Button className="float-right" variant="outline-danger" type="cancel">Cancel</Button>
                                    </Form>
                                )}
                            </Mutation>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default NewUserSurvey;