import { scaleLinear, min, max, axisBottom, axisLeft } from "d3";

const getMax = (d, el) => {
  return d[el + "1"] > d[el + "2"] ? d[el + "1"] : d[el + "2"];
};

const getMin = (d, el) => {
  return d[el + "1"] > d[el + "2"] ? d[el + "2"] : d[el + "1"];
};

export const calculateScales = (data, width, height) => {
  const minX = min(data, d => getMin(d, "x"));
  const maxX = max(data, d => getMax(d, "x"));

  const minY = min(data, d => getMin(d, "y"));
  const maxY = max(data, d => getMax(d, "y"));

  const minTotal = minX <= minY ? minX : minY;
  const maxTotal = maxX <= maxY ? maxY : maxX;

  const scaleX = scaleLinear()
    .range([0, width])
    .domain([minTotal, maxTotal+1]);

  const scaleY = scaleLinear()
    .range([height, 0])
    .domain([minTotal, maxTotal+1]);

  return { scaleX, scaleY };
};

export const drawAxis = (svgElement, scales, height) => {
  // Draw the X Axis
  svgElement
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(axisBottom(scales.scaleX));

  // Draw the Y Axis
  svgElement
    .append("g")
    .call(axisLeft(scales.scaleY));
};
