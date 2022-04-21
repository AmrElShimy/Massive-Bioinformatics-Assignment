import React, { Component, useState, useEffect } from 'react';
import { PieChart as PC } from "react-minimal-pie-chart"

function PieChart() {
    const [pieData, setPieData] = useState()
    useEffect(() => {
        fetch(`http://localHost:5001/?limit=${9999999999999}&offSet=${1}`)
            .then(response => response.json())
            .then(data => {
                let list = data.data
                const groups = list.reduce((groups, item) => ({
                    ...groups,
                    [item.classification]: [...(groups[item.classification] || []), item]
                }), {});
                let labels = []
                for (const [key, value] of Object.entries(groups)) {
                    let r = () => Math.random() * 256 >> 0;
                    labels.push({ title: "Class " + key, value: value.length, color: `rgb(${r()}, ${r()}, ${r()})` })
                }
                setPieData(labels)
            });
    }, [])
    return (
        <div>
            <h1 className='m-3'>Massive Bioinformatic Pie Chart</h1>
            <PC radius={40}
                data={pieData}
            />
            <div className='p-3 column'>
                {pieData ? pieData.map((element) => {
                    return (<label className='m-3' style={{ color: element.color }}>{element.title}</label>)
                }) : <></>}
            </div>
        </div >
    );
}


export default PieChart;