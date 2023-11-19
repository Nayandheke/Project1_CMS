import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormItem, Loading, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";
import { setUser } from "../../store";
import Switch from "react-switch"
import {  useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export const Create = () => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [categories, setCategories] = useState([])
    const [choices, setChoices] = useState([])
    const [selectedImgs, setSelectedImgs] = useState([])

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

        let fd = new FormData

        for(let k in form) {
            if(k == 'images') {
                for(let image of form.images) {
                    fd.append('images', image)
                }
            } else{
                fd.append(k, form[k])
            }
        }

        http.post('cms/places', fd, {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => navigate('/places'))
            // .then(({data}) => {
            //     dispatch(setUser(data))
            // })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if(form.images && form.images.length) {
            let list = []
            for(let image of form.images) {
                list.push(image)
            }
            setSelectedImgs(list)
        }
    }, [form.images])

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }

    const  formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]

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
                    <ReactQuill theme="snow" modules={modules} formats={formats} value={form.summary} onChange={value => setForm({
                                ...form,
                                summary:value
                            })}></ReactQuill>
                    </FormItem>

                    <FormItem title="Description" label="description">
                    <ReactQuill theme="snow" modules={modules} formats={formats} value={form.description} onChange={value => setForm({
                                ...form,
                                description:value
                            })}></ReactQuill>
                    </FormItem>

                    <FormItem title="Price" label="price">
                        <Form.Control type="number" name="price" id="price" defaultValue={form.price} onChange={ev => setInForm (ev, form, setForm)} required/>
                    </FormItem>

                    <FormItem title="Discounted Price" label="discounted_price">
                        <Form.Control type="number" name="discounted_price" id="discounted_price" defaultValue={form.discounted_price} onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="Categories" label="categoryId">
                        <Form.Select name="categoryId" id="categoryId" defaultValue={form.categoryId} onChange={ev => setInForm(ev, form, setForm)} required>
                            <option value="">Select a category</option>
                            {categories.map(category => <option value={category._id} key={category._id}>{category.name}</option>)}
                        </Form.Select>
                    </FormItem>

                    <FormItem title="Choices" label="choiceId">
                        <Form.Select name="choiceId" id="choiceId" defaultValue={form.choiceId} onChange={ev => setInForm(ev, form, setForm)} required>
                            <option value="">Select a choice</option>
                            {choices.map(choice => <option value={choice._id} key={choice._id}>{choice.name}</option>)}
                        </Form.Select>
                    </FormItem>

                    <FormItem title="Images" label="image">
                        <Form.Control type="file" name="image" id="image" onChange={ev => setForm({
                            ...form,
                            images: ev.target.files
                        })} accept="image/*" multiple required/>
                        {selectedImgs.length ? <Row>
                            {selectedImgs.map((image, i) => <Col sm={4} className="mt-3" key={i}>
                                <img src={URL.createObjectURL(image)} className="img-fluid" />
                            </Col>)}
                        </Row> : null}
                    </FormItem>

                    <FormItem title="Status" label="status">
                        <br></br>
                        <Switch checked={form.status} onChange={() => setForm ({
                            ...form,
                            status: !form.status,
                            })}/>
                    </FormItem>

                    <FormItem title="Featured" label="featured">
                            <br></br>
                            <Switch checked={form.featured} onChange={() => setForm ({
                                ...form,
                                featured: !form.featured,
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