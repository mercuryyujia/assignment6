import React from "react";
import {scalePoint, scaleLinear} from "d3";
import * as d3 from "d3";
import { XAxis, YAxis } from "./axes_linechart";

export function LineChart (props) {
    // Sort data by popularity and select top 5 and bottom 5
    const {data, width, height, top, right, bottom, left }= props;
    const sortedData = [...data].sort((a, b) => b.Popularity - a.Popularity);
    const selectedData = [...sortedData.slice(0, 5), ...sortedData.slice(-5)];

    // Scales
    const xScale = scalePoint()
        .domain(selectedData.map((d) => d.Songs))
        .range([left, width - right])
        .padding(0.5);

    const yScale = scaleLinear().domain([0, 1]).range([height - bottom, top]);
    console.log(yScale)

    // Line generator
    const lineGenerator = (key) =>
        d3
            .line()
            .x((d) => xScale(d.Songs))
            .y((d) => yScale(d[key]))
            .curve(d3.curveMonotoneX);

    return (
        <svg width={width} height={height}>
            {/* Axes */}
            <XAxis xScale={xScale} height={height - bottom} />
            <YAxis yScale={yScale} width={left} />

            {/* Lines */}
            <path
                d={lineGenerator("popularity")(selectedData)}
                fill="none"
                stroke="blue"
                strokeWidth={2}
            />
            <path
                d={lineGenerator("danceability")(selectedData)}
                fill="none"
                stroke="green"
                strokeWidth={2}
            />
            <path
                d={lineGenerator("energy")(selectedData)}
                fill="none"
                stroke="red"
                strokeWidth={2}
            />

            {/* Points */}
            {selectedData.map((d, i) => (
                <>
                    {/* Popularity points */}
                    <circle
                        key={`popularity-${i}`}
                        cx={xScale(d.Songs)}
                        cy={yScale(d.Popularity)}
                        r={4}
                        fill="blue"
                    />
                    {/* Danceability points */}
                    <circle
                        key={`danceability-${i}`}
                        cx={xScale(d.Songs)}
                        cy={yScale(d.Danceability)}
                        r={4}
                        fill="green"
                    />
                    {/* Energy points */}
                    <circle
                        key={`energy-${i}`}
                        cx={xScale(d.Songs)}
                        cy={yScale(d.Energy)}
                        r={4}
                        fill="red"
                    />
                </>
            ))}
        </svg>
    );
}
