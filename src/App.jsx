import {useState } from "react";
import Presenter from './Presenter';
import Form from "./Form";
import Chart from './Chart';

export default function App() {
    const svgWidth = 600, svgHeight = 500;
    const data = Presenter();
    const [xProperty, setXProperty] = useState(null);
    const [yProperty, setYProperty] = useState(null);

    if(data == null) {
        return Loading();
    }

    const keys = getAttributes(data);

    if(xProperty == null) {
        setXProperty(keys[0]);
    }

    if(yProperty == null) {
        setYProperty(keys[1]);
    }
    
    return(
        <div style={{backgroundColor : "white"}}>
            <Form keys={keys} xProperty={xProperty} setXProperty={setXProperty} yProperty={yProperty} setYProperty={setYProperty} />
            <Chart data={data} xProperty={xProperty} yProperty={yProperty} svgWidth={svgWidth} svgHeight={svgHeight}/>
        </div>
    );
}

function getAttributes(props) {
    const k = Object.keys(props[0]);
    k.map( (item, index) => {
        if(item == 'species') {
            delete k[index];
        }
    })
    return k;
}

function Loading() {
    return(
        <div>
            Loading...
        </div>
    );
}