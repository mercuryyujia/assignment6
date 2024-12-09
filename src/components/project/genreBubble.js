import React, { useState, useEffect } from "react";
import { scaleLinear } from "d3";
import { forceSimulation, forceX, forceY, forceCollide } from "d3";

function GenreBubble({ width, height, data, selectedYear}) {
    const [genres, setGenres] = useState([]);
    console.log("data", data);
    const filteredData = data.filter((song) => song.year === selectedYear);
    console.log(filteredData);

    useEffect(() => {
        // Group by genre and count
        const filteredData = data.filter((song) => song.year === selectedYear);
        const genreCounts = filteredData.reduce((acc, song) => {
            acc[song.genre] = (acc[song.genre] || 0) + 1;
            return acc;
        }, {});

        const genreArray = Object.entries(genreCounts).map(([genre, count]) => ({
            genre,
            count,
        }));

        setGenres(genreArray);
    }, [data, selectedYear]);

    const renderBubbles = () => {
        // Sort genres by count ascendingly
        genres.sort((a, b) => a.count - b.count);

        // Define a scale for the radius of bubbles
        const radiusScale = scaleLinear()
            .domain([Math.min(...genres.map((d) => d.count)), Math.max(...genres.map((d) => d.count))])
            .range([2, width * 0.15]);

        // Initialize positions for genres
        genres.forEach((d) => {
            d.x = width / 2;
            d.y = height / 2;
        });

        // Run the D3 force simulation
        const simulation = forceSimulation(genres)
            .velocityDecay(0.2)
            .force("x", forceX(width / 2).strength(0.02))
            .force("y", forceY(height / 2).strength(0.02))
            .force("collide", forceCollide((d) => radiusScale(d.count)))
            .tick(200);

        // Render circles and text for genres
        return genres.map((d, idx) => {
            const isTopGenre = idx >= genres.length - 5; // Top 5 genres are the last 5 elements (sorted ascendingly)
            return (
                <g key={idx}>
                    <circle
                        cx={d.x}
                        cy={d.y}
                        r={radiusScale(d.count)}
                        fill={isTopGenre ? "#ADD8E6" : "#2a5599"}
                        stroke="black"
                        strokeWidth="2"
                    />
                    {isTopGenre && (
                        <text
                            x={d.x}
                            y={d.y}
                            style={{
                                textAnchor: "middle",
                                stroke: "pink",
                                strokeWidth: "0.5em",
                                fill: "#992a2a",
                                fontSize: 16,
                                fontFamily: "cursive",
                                paintOrder: "stroke",
                                strokeLinejoin: "round",
                            }}
                        >
                            {d.genre}
                        </text>
                    )}
                </g>
            );
        });
    };

    return (
        <svg width={width} height={height}>
            {genres.length > 0 && renderBubbles()}
        </svg>
    );
}

export {GenreBubble};
