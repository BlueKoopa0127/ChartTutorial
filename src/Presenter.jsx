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

export default function Presenter(url) {
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