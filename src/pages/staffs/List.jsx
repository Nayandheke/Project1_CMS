import { useEffect, useState } from "react"
import { Col, Row, Table } from "react-bootstrap"
import http from "../../http"
import {Loading} from "../../components/Loading"
import { DataTable } from "../../components/DataTable"
import { Link } from "react-router-dom"

export const List = () => {
    const [staffs, setStaffs] = useState([])
    const [loading, setLoading] = useState(false) 

    useEffect(() => {
        setLoading(true)

        http.get('cms/staffs')
            .then(({data}) => setStaffs(data))
            .catch(err => {})
            .finally(() => setLoading(false))
    },[])

    return <Col xs={12} className="bg-white my-3 py-3 rounded-2 shadow-sm">
        <Row>
            <Col>
                <h1>Staffs</h1>
            </Col>
            <Col xs="auto">
                <Link className="btn btn-dark" to="/staffs/create">
                    <i className="fa-solid fa-plus me-2"></i>Add Staffs
                </Link>
            </Col>
        </Row>
        {loading ? <Loading/> : <DataTable data={staffs.map(staff => {
            return {
                'Name': staff.name,
                'Email': staff.email,
                'Phone': staff.phone,
                'Address': staff.address,
                'Status': staff.status ? 'Active' : 'Inactive',
            }
        })}/>}
    </Col>
}