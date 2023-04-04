import { useState, useEffect } from "react";
import axios from 'axios';

import Table from 'react-bootstrap/Table';
import { Button, Container } from "react-bootstrap";

import addSeparators from './helpers'

// sweet confirm
import Swal from 'sweetalert2'

interface IResponse {
    id: number;
    name: string;
    url: string;
    last_saved_price: number;
    page_title: string;
}

interface IProps{
    changeTab: Function;
}

const ApartmentsList = (props: IProps) => {
    const [data, setData] = useState([] as IResponse[])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get("http://localhost:8000/apartments")
        setData(response.data)
    }

    const getPrice = async (e: any, id: any) => {
        const response = await axios.get(`http://localhost:8000/apartments/get-price-from-external/${id}`)
        getData();
    }

    const remove = async (e: any, id: any) => {
        const { value: lol } = await Swal.fire({
            title: 'Czy na pewno chcesz usunać pozycję?',
            text: 'Ta operacja jest nieodwracalna.',
            icon: 'question',
            confirmButtonText: 'Tak',
            showDenyButton: true,
            denyButtonText: "Anuluj",
            confirmButtonColor: 'green'
        })
        if (lol) {
            const response = await axios.delete(`http://localhost:8000/apartments/${id}`)
            getData();
        }
    }

    return (
        <Container>
            <h1 className="custom-header">Zapisane mieszkania</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nazwa</th>
                        <th>Link</th>
                        <th>Tytuł strony</th>
                        <th>Ostatnia zapisana cena</th>
                        <th>Pobierz cenę</th>
                        <th>Usuń</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(el => (
                        <tr key={el.id}>
                            <td>{el.id}</td>
                            <td>{el.name}</td>
                            <td>
                                <a href={`https://` + el.url}>LINK</a>
                            </td>
                            <td>{el.page_title}</td>
                            <td>{addSeparators(el.last_saved_price)} zł</td>
                            <td><Button onClick={(e) => getPrice(e, el.id)}>Pobierz cenę</Button></td>
                            <td><Button onClick={(e) => remove(e, el.id)}>Usuń</Button></td>
                        </tr>
                    ))

                    }

                </tbody>
            </Table>
            {data.length <= 0 && <div className={'hint'}>Aktualnie baza danych jest pusta. Aby rozpocząć korzystanie aplikacji, dodaj pozycję. Użyj do tego funkcji "Dodaj" w menu aplikacji, albo kliknij 
                    <div className="inline-link" onClick={() => props.changeTab(2)}> =TUTAJ= </div>
            </div>}
        </Container>
    )
}

export default ApartmentsList;