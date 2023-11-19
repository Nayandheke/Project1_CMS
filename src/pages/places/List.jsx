import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import moment from "moment"
import {confirmAlert} from "react-confirm-alert"
import { toast } from "react-toastify";
import { imgUrl } from "../../lib";

export const List = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        http
            .get("cms/places")
            .then(({ data }) => setPlaces(data))
            .catch((err) => { })
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = id => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item ?',
            buttons: [
                {
                    label:'Yes',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`cms/places/${id}`)
                            .then(() => http.get('cms/places'))
                            .then(({data}) => setPlaces(data))
                            .catch(err => toast.error(err))
                            .finally(() => setLoading(false))
                    },
                    style: {
                        backgroundColor: '#f00',
                        color:'#fff',
                    },
                },
                {
                    label: 'No',
                },
            ],
        });
    }

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col>
                    <h1>Places</h1>
                </Col>
                <Col xs="auto">
                    <Link className="btn btn-dark" to="/places/create">
                        <i className="fa-solid fa-plus me-2"></i>Add places
                    </Link>
                </Col>
            </Row>
            {loading ? <Loading /> : <DataTable sortable={['Name','Category','Choice','Price','Dis. Price','Status','Created At', 'Updated At']} searchable={['Name' ,'Status','Created At', 'Updated At']} data={places.map(place => {
                return {
                    'Name' : place.name,
                    'Image': <img src={imgUrl(place.images[0])} className="img-sm" />,
                    'Category': place.category.name,
                    'Choice': place.choice.name,
                    'Price': place.price,
                    'Dis. Price': place.discounted_price || 0,
                    'Status' : place.status ? 'Active' : 'Inactive',
                    'Featured' : place.featured ? 'Yes' : 'No',
                    'Created At': moment(place.createdAt).format('lll'),
                    'Updated At': moment(place.updatedAt).format('lll'),
                    'Action' : <>
                        <Link to={`/places/edit/${place._id}`} className="btn btn-outline-dark btn-sm me-2">
                            <i className="fa-solid fa-edit me-2"></i>Edit 
                        </Link>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(staff._id)}>
                            <i className="fa-solid fa-trash"> </i> Delete
                        </Button>
                    </>
                }
            })} />} 
        </Col>
    );
};