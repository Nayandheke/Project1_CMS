import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import moment from "moment"
import { confirmAlert } from "react-confirm-alert"
import { imgUrl } from "../../lib";

export const List = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        http.get("cms/places")
            .then(({ data }) => setPlaces(data))
            .catch((err) => { })
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = id => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`cms/places/${id}`)
                            .then(() => http.get('cms/places'))
                            .then(({data}) => setPlaces(data))
                            .catch(err => {})
                            .finally(() => setLoading(false))
                    },
                    style: {
                        backgroundColor: '#f00',
                        color: 'fff'
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    // const handleGenerate = () => {
    //     setLoading(true)
    //     generateData()
    //         .then(() => http.get('cms/places'))
    //         .then(({data}) => setPlaces(data))
    //         .catch(err => {})
    //         .finally(() => setLoading(false))
    // }

    // const generateData = async () => new Promise(async (resolve, reject) => {
    //     try {
    //         for(let i = 1; i <= 20; i++){
    //             console.log("gen")
    //             let data = {
    //                 name: `Category ${i}`,
    //                 status: true,
    //             }
    //             await http.post('cms/places', data)
    //         }
    //     } catch (error) {
    //     }
    // })

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col>
                    <h1>Places</h1>
                </Col>
                {/* <Col xs="auto">
                    <Button variant="dark" onClick={handleGenerate}>
                        <i className="fa-solid fa-plus-circle me-2"></i>Generate
                    </Button>
                </Col> */}
                <Col xs="auto">
                    <Link className="btn btn-dark" to="/places/create">
                        <i className="fa-solid fa-plus me-2"></i>Add Places
                    </Link>
                </Col>
            </Row>
            {/* {loading ? <Loading /> : <DataTable data={places.map(place => {
                return {
                    'Name' : place.name,
                    // 'Image' : <img src={imgUrl(place.image[0])} className="img-sm ms-4"/>,
                    'Category' : place.category.name,
                    'Brand' : place.brand.name,
                    'Price' : place.price,
                    'Dis. Price' : place.discounted_price || 0,
                    'Featured' : place.featured ? 'Yes' : 'No',
                    'Status' : place.status ? 'Active' : 'Inactive',
                    'Created At' : moment(place.createdAt).format('lll'),
                    'Updated At' : moment(place.updatedAt).format('lll'),
                    'Action' : <>
                    <Link to={`/places/edit/${place._id}`} className="btn btn-outline-dark btn-sm me-2">
                        <i className="fa-solid fa-edit"></i> Edit
                    </Link>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(place._id)}>
                    <i className="fa-solid fa-trash"></i> Delete
                    </Button>
                    </>
                }
            })} />}  */}
        </Col>
    );
};