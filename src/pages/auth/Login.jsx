import { Button, Col, Form, Row } from "react-bootstrap"
import { FormItem, SubmitBtn } from "../../components"
import { useState } from "react"
import http from "../../http"

export const Login = () => {
    const [form, setForm] = useState({})
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('login', form)
            .then(resp => { })
            .catch(err => { })
            .finally(() => setLoading(false))
    }

    return <Col xl={4} className="bg-white my-5 mx-auto py-3 rounded-2 shadow-sm">
        <Row>
            <Col className="text-center"><h1 >Login</h1></Col>
        </Row>
        <Row>
            <Col>
                <Form onSubmit={handleSubmit}>
                    <FormItem title="Email" Label="email">
                        <Form.Control type="email" name="email" id="email" required onChange={ev => setForm({
                            ...form,
                            [ev.target.name]: ev.target.value,
                        })} />
                    </FormItem>
                    <FormItem title="Password" Label="password">
                        <Form.Control type="password" name="password" id="password" required onChange={ev => setForm({
                            ...form,
                            [ev.target.name]: ev.target.value,
                        })} />
                    </FormItem>
                    <div className="mb-3 form-check">
                        <Form.Check.Input name="remember" id="remember" checked={remember} onChange={() => setRemember(!remember)} />
                        <Form.Check.Label htmlFor="remember">Remember Me</Form.Check.Label>
                    </div>
                    <div className="mb-3 d-grid">
                        <SubmitBtn label="Log In" icon="fa-right-to-bracket" loading={loading} />
                    </div>
                </Form>
            </Col>
        </Row>
    </Col>
}