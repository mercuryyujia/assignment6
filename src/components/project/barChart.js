import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes_barchart";


export function BarChart (props) {
    const {offsetX, offsetY, data, height, width, selectedYear, setSelectedYear} = props;
    let maximunCount = max(data, d => d.Count);
    const xScale = scaleLinear().range([0, width]).domain([0, maximunCount]).nice();
    const yScale = scaleBand().range([0, height]).domain(data.map(a => a.Songs)).padding(0.2) //The domain is the list of ailines names
    let color = (d) => d.Songs===selectedYear? "#992a5b":"#2a5599";
    let onClick = (d) => {
        if (selectedYear === d.Songs) {
            // If the clicked bar is already selected, unselect it
            setSelectedYear(null);
        } else {
            // Otherwise, set it as the selected airline
            setSelectedYear(d.Songs);
        }
    };
    
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        { data.map( d => {
            return <rect key={d.Songs} x={0} y={yScale(d.Year)}
                width={xScale(d.Count)} height={yScale.bandwidth()} 
                onClick={()=>onClick(d)}
                stroke="black" fill={color(d)}/>
        }) }
        <YAxis yScale={yScale} height={height} offsetX={offsetX}/>
        <XAxis xScale={xScale} width={width} height={height} />
    </g>
}