import { useEffect, useState } from "react";

export function Test() {
    const data = Presenter();
    console.log(data);
    return (
        <div>
            test
        </div>
    );
}

export default function Presenter() {
    const url = "https://assets.codepen.io/2004014/iris.json";
    const [data, setData] = useState(null);
    useEffect( () => {
        fetchDataJson((j) => {setData(j)}, url);
    },[]);
    return data;
}

async function fetchDataJson(callback, url) {
    const response = await fetch(url);
    const json = await response.json();
    callback(json);
}