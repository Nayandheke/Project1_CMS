import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormItem, Loading, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";
import { setUser } from "../../store";
import Switch from "react-switch"
import {  useNavigate } from "react-router-dom";

export const Create = () => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [categories, setCategories] = useState([])
    const [choices, setChoices] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        setLoadingPage(true)
        http.get('cms/categories')
            .then(({data}) => {
                setCategories(data)
                return http.get('cms/choices')
            })
            .then(({data}) => setChoices(data))
            .catch(err => {})
            .finally(() => setLoadingPage(false))
    },[])
    
    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('cms/places', form)
            .then(() => navigate('/places'))
            .then(({data}) => {
                dispatch(setUser(data))
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col sm={6} className="mx-auto">
                    <h1>Add Place</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="mx-auto">
               { loadingPage ? <Loading/> :<Form onSubmit={handleSubmit}>
                    <FormItem title="Name" label="name">
                        <Form.Control type="text" name="name" id="name" defaultValue={form.name} onChange={ev => setInForm (ev, form, setForm)} required/>
                    </FormItem>
                    <FormItem title="Summary" label="summary">
                        <Form.Control as="textarea" name="summary" id="summary" defaultValue={form.summary} onChange={ev => setInForm (ev, form, setForm)} required/>
                    </FormItem>
                    <FormItem title="Description" label="description">
                        <Form.Control as="textarea" name="description" id="description" defaultValue={form.description} onChange={ev => setInForm (ev, form, setForm)} required/>
                    </FormItem>

                    <FormItem title="Price" label="price">
                        <Form.Control type="number" name="price" id="price" defaultValue={form.price} onChange={ev => setInForm (ev, form, setForm)} required/>
                    </FormItem>

                    <FormItem title="Discounted Price" label="discounted_price">
                        <Form.Control type="number" name="discounted_price" id="discounted_price" defaultValue={form.discounted_price} onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="Categories" label="category_id">
                        <Form.Select name="category_id" id="category_id" defaultValue={form.category_id} onChange={ev => setInForm(ev, form, setForm)} required>
                            <option value="">Select a category</option>
                            {categories.map(category => <option value={category._id} key={category._id}>{category.name}</option>)}
                        </Form.Select>
                    </FormItem>

                    <FormItem title="Choices" label="choice_id">
                        <Form.Select name="choice_id" id="choice_id" defaultValue={form.choice_id} onChange={ev => setInForm(ev, form, setForm)} required>
                            <option value="">Select a choice</option>
                            {choices.map(choice => <option value={choice._id} key={choice._id}>{choice.name}</option>)}
                        </Form.Select>
                    </FormItem>

                    <FormItem title="Images" label="image">
                        <Form.Control type="file" name="image" id="image" onChange={ev => setForm({
                            ...form,
                            images: ev.target.files
                        })} accept="image/*" multiple required/>
                    </FormItem>

                    <FormItem title="Status" label="status">
                        <br></br>
                        <Switch checked={form.status} onChange={() => setForm ({
                            ...form,
                            status: !form.status,
                            })}/>
                    </FormItem>
                    <div className="mb-3">
                        <SubmitBtn loading={loading}/>
                    </div>
                </Form>}
                </Col>
            </Row>
        </Col>
    );
}