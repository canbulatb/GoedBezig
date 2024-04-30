import React, {useState, useEffect } from 'react';
import axios from 'axios';

function DataConnection() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/sentences/')
            .then(response => {
                setData(response.data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>My Data</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.dutch}: {item.resultaat}</li>
                ))}
            </ul>
        </div>
    );
}

export default DataConnection;
