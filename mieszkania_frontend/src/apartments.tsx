import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// my components
import ApartmentsList from './apartments-list'
import ApartmentsCreate from './apartment-create'
// reactstrap
import Button from 'react-bootstrap/Button';
import { Container, Nav, Navbar } from "react-bootstrap";
import Footer from "./footer/footer";




const Apartments = () => {
    const [activeTabId, setActiveTabId] = useState(1)

    const changeTab = (tab: any) => {
        setActiveTabId(tab)
    }

    const renderSwitchTab = (id: number) => {
        switch(id){
            case 1: return <ApartmentsList changeTab={changeTab}/>
            case 2: return <ApartmentsCreate />
        }
    }
    //   <div key={el.id}>{el.name}</div> */
    return <div>
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#home">Menu</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => changeTab(1)}>Mieszkania</Nav.Link>
                    <Nav.Link onClick={() => changeTab(2)}>Dodaj</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

        {renderSwitchTab(activeTabId)}
        <Footer />
    </div>

}
export default Apartments;