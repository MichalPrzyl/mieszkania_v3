import { useEffect, useState } from "react";
import axios from 'axios';
// reactraop
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Col, Container, FloatingLabel, Row, ToastContainer } from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';

// css
import './custom-style.css';


interface OneRecordData {
  name: string;
  url: string;
}
const CreatedToast = (props: any) => {

  const { showToast, setShowToast } = props

  return (
    <ToastContainer position="top-end">
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">Zapisano!</strong>
          <small>...</small>
        </Toast.Header>
        <Toast.Body>Dodano mieszkanie</Toast.Body>
      </Toast>
    </ToastContainer>
  )

}
const ApartmentsCreate = (props: any) => {
  const [inputs, setInputs] = useState({} as OneRecordData)
  const [showToast, setShowToast] = useState(false)


  const submitData = async () => {
    const data = {
      name: inputs.name,
      url: inputs.url
    }
    const response = await axios.post("http://localhost:8000/apartments", data)
    setInputs({ name: "", url: "" })
    setShowToast(true);
  }

  const setValue = (e: any) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value })

  }

  return <>

    <Container>
      <h1 className="custom-header">Dodaj mieszkanie</h1>
      <CreatedToast showToast={showToast} setShowToast={setShowToast} />
      <Form className='custom-form'>
        <Form.Group className="mb-5" controlId="formBasicEmail">
          <div className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Nazwa"
            >
              <Form.Control type="text" value={inputs.name} name="name" onChange={setValue} placeholder="Nazwa własna" />
            </FloatingLabel>
          </div>

          <FloatingLabel
            controlId="floatingInput"
            label="Link"
          >
            <Form.Control type="text" value={inputs.url} name="url" onChange={setValue} placeholder="Link" />
          </FloatingLabel>


        </Form.Group>
        <Button variant="primary" onClick={submitData}>
          Zapisz
        </Button>
      </Form>
    </Container>
  </>
}

export default ApartmentsCreate;