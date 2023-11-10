import { Col, Row, Table } from "react-bootstrap"

export const DataTable = ({data = []}) => {
    return <Row>
        <Col>
            {data.length ? <Table bordered striped hover size="sm">
                <thead className="table-dark">
                    {Object.keys(data[0]).map(k => <tr>{k}</tr>)}
                </thead>
            </Table> : <h4 className="text-muted fst-italic mt-3">No Data Found.</h4>}
        </Col>
    </Row>
} 