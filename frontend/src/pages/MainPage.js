import React, { useState, Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import List from '../components/List';
import PieChart from '../components/PieChart';
import '../App.css';

function MainPage() {
    const [key, setKey] = useState('list');
    return (
        <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="list" title="List">
                <List />
            </Tab>
            <Tab eventKey="piechart" title="Pie Chart">
                <PieChart />
            </Tab>

        </Tabs>
    );

}

export default MainPage;