import { Col, Row, Table, Card  } from "react-bootstrap"

export const DataTable = ({data = []}) => {
    return <Row>
        <Col>
            {data.length ? <Table bordered striped hover size="sm">
                <thead className="table-dark">
                    <tr>{Object.keys(data[0]).map(k => <th key={k}>{k}</th>)}</tr>
                </thead>
                <tbody>
                    {data.map((item, i) => <tr key={i}>
                    {Object.values(item).map((v, i) => <td key={i}>{v}</td>)}
                    </tr>)}
                </tbody>
            </Table> : <h4 className="text-muted fst-italic mt-3">No Data Found.</h4>}
        </Col>
    </Row>
} 