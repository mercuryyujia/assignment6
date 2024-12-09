import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Heatmap = ({ data, width = 800, height = 400 }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return; // Ensure data is available before proceeding

    // Convert mode and key to integers
    data.forEach(d => {
      d.mode = +d.mode;
      d.key = +d.key;
    });

    const counts = d3.rollups(
      data,
      v => v.length,
      d => d.key, // Group by key
      d => d.mode // Group by mode
    );

    const heatmapData = [];
    counts.forEach(([key, modeCounts]) => {
      modeCounts.forEach(([mode, count]) => {
        heatmapData.push({ key, mode, count });
      });
    });

    drawHeatmap(heatmapData);
  }, [data]); // Redraw when data changes

  const drawHeatmap = (heatmapData) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear any previous content


    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg
      .attr("width", width)
      .attr("height", height);

    // Define scales for x (key) and y (mode)
    const x = d3.scaleBand()
      .domain([...new Set(heatmapData.map(d => d.key))]) // Get unique keys
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3.scaleBand()
      .domain([...new Set(heatmapData.map(d => d.mode))]) // Get unique modes
      .range([0, innerHeight])
      .padding(0.1);

    const colorScale = d3.scaleSequential(d3.interpolateViridis)
      .domain([0, d3.max(heatmapData, d => d.count)]);

    // Add x and y axes
    svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top + innerHeight})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(y));

    // Draw the heatmap cells
    svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .selectAll(".cell")
      .data(heatmapData)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("x", d => x(d.key))
      .attr("y", d => y(d.mode))
      .attr("width", x.bandwidth()) // Width of each cell
      .attr("height", y.bandwidth()) // Height of each cell
      .style("fill", d => colorScale(d.count)) // Color based on count
      .style("stroke", "white")
      .style("stroke-width", 0.5);
  };

  return <svg ref={svgRef}></svg>;
};

export {Heatmap};
