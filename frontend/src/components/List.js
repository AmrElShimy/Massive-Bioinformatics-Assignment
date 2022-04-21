import React, { Component, useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import '../App.css';

function List() {
    const [data, setData] = useState()
    const [variant, setVariant] = useState('')
    const [gene, setGene] = useState('')
    const [classification, setClassification] = useState('0')
    const [isLoading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10)
    const [offSet, setOffset] = useState(1)

    const incrementOffset = () => {
        setOffset(offSet + 1)
    }

    const decrementOffset = () => {
        setOffset(offSet - 1)
    }


    useEffect(() => {
        fetch(`http://localHost:5001/?variant=${variant}&gene=${gene}&classification=${classification}&limit=${limit}&offSet=${offSet}`)
            .then(response => response.json())
            .then(data => {
                setData(data)
                setLoading(false)
            });
    }, [variant, gene, classification, limit, offSet])

    return (
        <div className='container'>
            {!isLoading ?
                <><div className='p-3 row'>
                    <div class="col">
                        <label className='m-3'>Variant:</label>
                        <input placeholder='Variant' onChange={e => {
                            setVariant(e.target.value.toUpperCase())
                            setOffset(1)
                        }}></input>
                    </div>
                    <div class="col">
                        <label className='m-3'>Gene:</label>
                        <input placeholder='Gene' onChange={e => {
                            setGene(e.target.value.toUpperCase())
                            setOffset(1)
                        }}></input>
                    </div>
                    <div class="col">
                        <label className='m-3'>Classification:</label>
                        <select onChange={e => {
                            setClassification(e.target.value)
                            setOffset(1)
                        }}>
                            <option value={6}>6</option>
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                            <option selected value={0}>0</option>
                        </select>
                    </div>
                </div>
                    <div className='p-3 row'>
                        <div class="col">
                            <label className='m-3'>Limit:</label>
                            <select onChange={e => {
                                setLimit(e.target.value)
                                setOffset(1)
                            }}>
                                <option selected value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <Table table table-striped responsive size="sm" striped={true} bordered={true}>
                            <thead>
                                <tr>
                                    <th >Variant</th>
                                    <th>Gene</th>
                                    <th>Frequency</th>
                                    <th>Classification</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data ? data.data.map((element) => {
                                    return (<tr>
                                        <td align='left'>{element.variant}</td>
                                        <td align='left'>{element.gene}</td>
                                        <td align='left'>{element.frequency}</td>
                                        <td align='left'>{element.classification}</td>
                                    </tr>);
                                }) : <></>}
                            </tbody>
                        </Table>
                        <button className='m-3' disabled={offSet === 1} onClick={decrementOffset}>{"<"}</button>{offSet}<button className='m-3' disabled={data?.data?.length < limit} onClick={incrementOffset}>{">"}</button>
                    </div></>
                : <>Loading</>
            }
        </div >
    );
}

export default List;