import * as d3 from 'd3'
import { useEffect, useState } from "react";

export default function App() {
    const width = 800, height = 600, diff = 50;
    const contentWidth = 600;
    const [data, setData] = useState(null);
    const [xProperty, setXProperty] = useState(null);
    const [yProperty, setYProperty] = useState(null);

    useEffect(() => {
        /*async function fetchData() {
        const response = await fetch("https://assets.codepen.io/2004014/iris.json");
        const data = await response.json();
        setData(data);
        console.log(data);
        }
        fetchData();*/
        (async () => {
            const response = await fetch("https://assets.codepen.io/2004014/iris.json");
            const data = await response.json();
            setData(data);
            console.log(data);
        })();
    }, []);

    if(data == null) {
        return Loading();
    }
    const keys = Object.keys(data[0]);
    delete keys[4]

    //useState
    if(xProperty == null) {
        setXProperty(keys[0]);
        return Loading();
    }

    if(yProperty == null) {
        setYProperty(keys[1]);
        return Loading();
    }

    var xScale = d3.scaleLinear()
    .domain(d3.extent(data.map(item => item[xProperty])))
    .range([diff, contentWidth - diff]).nice();
    var yScale = d3.scaleLinear()
    .domain(d3.extent(data.map(item => item[yProperty])))
    .range([height - diff, diff]).nice();

    var xTicks = xScale.ticks();
    var yTicks = yScale.ticks();

    const species = Array.from(new Set(data.map(({ species }) => species)));

    console.log(xTicks);
    console.log(yTicks);

    var col = d3.scaleOrdinal(d3.schemeCategory10);
    
    return(
        <div style={{backgroundColor : "white"}}>
            <text>x property</text>
            <select onChange={ (event) => setXProperty(event.target.value)}>
                {
                    keys.map( (item, index) => {
                        if(index == 0) {
                            return <option selected={true}>{item}</option>
                        } else {
                            return <option>{item}</option>
                        }
                    })
                }
            </select>
            
            <text>y property</text>
            <select onChange={ (event) => setYProperty(event.target.value)}>
                {
                    keys.map( (item, index) => {
                        if(index == 1) {
                            return <option selected={true}>{item}</option>
                        } else {
                            return <option>{item}</option>
                        }
                    })
                }
            </select>

            <svg width={width} height={height}>
                {
                    //Content
                    data.map((item) => {
                        return <circle cx={xScale(item[xProperty])} cy={yScale(item[yProperty])} r="5" fill={col(item.species)}/>
                    })
                }


                <line x1={diff} y1={height - diff} x2={contentWidth - diff} y2={height - diff} stroke="black" />
                {
                    xTicks.map( (item) => {
                        return (
                            <g>
                                <line x1={xScale(item)} y1={height - diff} x2={xScale(item)} y2={height - diff + 10} stroke="black" />
                                <text x={xScale(item)} y={height - diff + 20} textAnchor="middle" dominantBaseline="central">{item}</text>
                            </g>
                        )
                    })
                }
                
                <line x1={diff} y1={diff} x2={diff} y2={height- diff} stroke="black" />
                {
                    yTicks.map( (item) => {
                        return (
                            <g>
                                <line x1={diff} y1={yScale(item)} x2={diff - 10} y2={yScale(item)} stroke="black" />
                                <text x={diff - 20} y={yScale(item)} textAnchor="middle" dominantBaseline="central">{item}</text>
                            </g>
                        )
                    })
                }

                {
                    species.map( (item, index) => {
                        return (
                            <g>
                                <rect x={contentWidth} y={index * 30} width={20} height={20} fill={col(item)}/>
                                <text x={contentWidth + 30} y={3 + index * 30} textAnchor="start" dominantBaseline="hanging">{item}</text>
                            </g>
                        ) 
                    })
                }
            </svg>
        </div>
    );
}

function Loading() {
    return(
        <div>
            Loading
        </div>
    );
}