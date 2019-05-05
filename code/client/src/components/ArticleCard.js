import React from "react";
import { Card } from 'react-bootstrap';

const ArticleCard = props => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">BY {props.author}</Card.Subtitle>
                <Card.Text>
                    {props.article}
                </Card.Text>
                <Card.Link href={`/article/${props.id}`}>Read More...</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default ArticleCard;