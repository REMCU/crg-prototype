import logo from './logo.svg';
import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './store'
import {switchView, toggleItemView, enableGrowth, enableUncertainty,
disableGrowth, disableUncertainty, enableGradeRange, disableGradeRange,
enableStudentView, disableStudentView, enableAlign, disableAlign, enableStudentOrdering,
disableStudentOrdering, enableColor, disableColor, toggleSolution} from './stateslice'
import {
  ScatterChart, Scatter,
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, ZAxis, ReferenceLine,
  CartesianGrid, CartesianAxis, Label,
  ReferenceArea, Tooltip, Text, Line, LineChart
} from 'recharts';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
//PW
import pwitem from './images/Partwhole Item.png';
import pwsolution from './images/solutions/Partwhole.png';
// Fair Shares
import qitem from './images/Quotient Item.png';
import qsolution from './images/solutions/Quotient.png';
// Number Line
import mitem from './images/Measurement Item.png';
import msolution from './images/solutions/Measurement.png';

// Multiply & Divide
import opitem from './images/Operation Item.png';
import osolution from './images/solutions/Operation.png';

import lpexpl from './files/Fraction conceptualizations learning progression.pdf'



// dropdown definitions
const displayOptions = [
  { value: "growth", label: "Show Prior Scores" },
  { value: "uncertainty", label: "Show Score Uncertainty" },
  { value: "graderange", label: "Show Grade 4 Score Range" },
  { value: "scoreordering", label: "Order Students by Score" },
  { value: "showColor", label: "Color Code Learning Progression" }
];

const studentDisplayOptions = [
  { value: "align", label: "Align LP with Grade" },
  { value: "uncertainty", label: "Show Score Uncertainty" },
  { value: "showColor", label: "Color Code Learning Progression" }
];

const viewOptions = [
  { value: "fullLP", label: "Show Full LP" },
  { value: "grade4View", label: "Zoom in on Class" }
];

// create nine students to start
// eventually will be filled with results from grade 2, 3, 4, fall/winter/spring
const scoreData = [
  { name: 'bg', score: 455, index: 24, season: "fall", alph: 5, level: "Fair Shares" },
  { name: 'jr', score: 447, index: 23, season: "fall", alph: 16, level: "Transition PW -> FS" },
  { name: 'plo', score: 450, index: 22, season: "fall", alph: 10, level: "Fair Shares" },
  { name: 'rk', score: 453, index: 21, season: "fall", alph: 9, level: "Fair Shares" },
  { name: 'mf', score: 449, index: 20, season: "fall", alph: 4, level: "Fair Shares" },
  { name: 'vg', score: 435, index: 19, season: "fall", alph: 7, level: "Transition PW -> FS" },
  { name: 'kg', score: 440, index: 18, season: "fall", alph: 6, level: "Transition PW -> FS"  },
  { name: 'rt', score: 443, index: 17, season: "fall", alph: 20, level: "Transition PW -> FS"  },
  { name: 'qm', score: 437, index: 16, season: "fall", alph: 12, level: "Transition PW -> FS"  },
  { name: 'zp', score: 436, index: 15, season: "fall", alph: 15, level: "Transition PW -> FS"  },
  { name: 'ps', score: 441, index: 14, season: "fall", alph: 18, level: "Transition PW -> FS"  },
  { name: 'ly', score: 440, index: 13, season: "fall", alph: 23, level: "Transition PW -> FS"  },
  { name: 'rw', score: 430, index: 12, season: "fall", alph: 21, level: "Part-Whole" },
  { name: 'ub', score: 430, index: 11, season: "fall", alph: 1, level: "Part-Whole" },
  { name: 'va', score: 432, index: 10, season: "fall", alph: 0, level: "Transition PW -> FS" },
  { name: 'xd', score: 423, index: 9, season: "fall", alph: 3, level: "Part-Whole" },
  { name: 'lk', score: 426, index: 8, season: "fall", alph: 8, level: "Part-Whole" },
  { name: 'mm', score: 427, index: 7, season: "fall", alph: 11, level: "Part-Whole" },
  { name: 'gt', score: 420, index: 6, season: "fall", alph: 19, level: "Part-Whole" },
  { name: 'sw', score: 420, index: 5, season: "fall", alph: 22, level: "Part-Whole" },
  { name: 'do', score: 423, index: 4, season: "fall", alph: 14, level: "Part-Whole" },
  { name: 'tbe', score: 422, index: 3, season: "fall", alph: 2, level: "Part-Whole" },
  { name: 'rr', score: 422, index: 2, season: "fall", alph: 17, level: "Part-Whole" },
  { name: 'bn', score: 411, index: 1, season: "fall", alph: 13, level: "pre-Part-Whole" },
  { name: 'my', score: 414, index: 0, season: "fall", alph: 24, level: "pre-Part-Whole" },
  { name: 'bg', score: 453, index: 24, season: "winter", alph: 5, level: "Fair Shares"  },
  { name: 'jr', score: 452, index: 23, season: "winter", alph: 16, level: "Fair Shares" },
  { name: 'plo', score: 455, index: 22, season: "winter", alph: 10, level: "Fair Shares" },
  { name: 'rk', score: 455, index: 21, season: "winter", alph: 9, level: "Fair Shares" },
  { name: 'mf', score: 447, index: 20, season: "winter", alph: 4, level: "Transition PW -> FS" },
  { name: 'vg', score: 445, index: 19, season: "winter", alph: 7, level: "Transition PW -> FS" },
  { name: 'kg', score: 442, index: 18, season: "winter", alph: 6, level: "Transition PW -> FS" },
  { name: 'rt', score: 448, index: 17, season: "winter", alph: 20, level: "Transition PW -> FS" },
  { name: 'qm', score: 440, index: 16, season: "winter", alph: 12, level: "Transition PW -> FS" },
  { name: 'zp', score: 441, index: 15, season: "winter", alph: 15, level: "Transition PW -> FS" },
  { name: 'ps', score: 443, index: 14, season: "winter", alph: 18, level: "Transition PW -> FS" },
  { name: 'ly', score: 444, index: 13, season: "winter", alph: 23, level: "Transition PW -> FS" },
  { name: 'rw', score: 437, index: 12, season: "winter", alph: 21, level: "Transition PW -> FS" },
  { name: 'ub', score: 437, index: 11, season: "winter", alph: 1, level: "Transition PW -> FS" },
  { name: 'va', score: 434, index: 10, season: "winter", alph: 0, level: "Transition PW -> FS" },
  { name: 'xd', score: 428, index: 9, season: "winter", alph: 3, level: "Part-Whole" },
  { name: 'lk', score: 430, index: 8, season: "winter", alph: 8, level: "Part-Whole" },
  { name: 'mm', score: 429, index: 7, season: "winter", alph: 11, level: "Part-Whole" },
  { name: 'gt', score: 423, index: 6, season: "winter", alph: 19, level: "Part-Whole" },
  { name: 'sw', score: 426, index: 5, season: "winter", alph: 22, level: "Part-Whole" },
  { name: 'do', score: 426, index: 4, season: "winter", alph: 14, level: "Part-Whole" },
  { name: 'tbe', score: 425, index: 3, season: "winter", alph: 2, level: "Part-Whole" },
  { name: 'rr', score: 420, index: 2, season: "winter", alph: 17, level: "Part-Whole" },
  { name: 'bn', score: 419, index: 1, season: "winter", alph: 13, level: "Part-Whole" },
  { name: 'my', score: 418, index: 0, season: "winter", alph: 24, level: "pre-Part-Whole" },
  { name: 'bg', score: 475, index: 24, season: "spring", alph: 5, level: "Number Line" },
  { name: 'jr', score: 472, index: 23, season: "spring", alph: 16, level: "Number Line" },
  { name: 'plo', score: 472, index: 22, season: "spring", alph: 10, level: "Number Line" },
  { name: 'rk', score: 470, index: 21, season: "spring", alph: 9, level: "Number Line" },
  { name: 'mf', score: 466, index: 20, season: "spring", alph: 4, level: "Transition FS -> NL" },
  { name: 'vg', score: 465, index: 19, season: "spring", alph: 7, level: "Transition FS -> NL" },
  { name: 'kg', score: 464, index: 18, season: "spring", alph: 6, level: "Transition FS -> NL" },
  { name: 'rt', score: 464, index: 17, season: "spring", alph: 20, level: "Transition FS -> NL" },
  { name: 'qm', score: 460, index: 16, season: "spring", alph: 12, level: "Transition FS -> NL" },
  { name: 'zp', score: 459, index: 15, season: "spring", alph: 15, level: "Fair Shares" },
  { name: 'ps', score: 457, index: 14, season: "spring", alph: 18, level: "Fair Shares" },
  { name: 'ly', score: 455, index: 13, season: "spring", alph: 23, level: "Fair Shares" },
  { name: 'rw', score: 453, index: 12, season: "spring", alph: 21, level: "Fair Shares" },
  { name: 'ub', score: 450, index: 11, season: "spring", alph: 1, level: "Fair Shares" },
  { name: 'va', score: 450, index: 10, season: "spring", alph: 0, level: "Fair Shares" },
  { name: 'xd', score: 447, index: 9, season: "spring", alph: 3, level: "Transition PW -> FS" },
  { name: 'lk', score: 444, index: 8, season: "spring", alph: 8, level: "Transition PW -> FS" },
  { name: 'mm', score: 443, index: 7, season: "spring", alph: 11, level: "Transition PW -> FS" },
  { name: 'gt', score: 442, index: 6, season: "spring", alph: 19, level: "Transition PW -> FS" },
  { name: 'sw', score: 442, index: 5, season: "spring", alph: 22, level: "Transition PW -> FS" },
  { name: 'do', score: 441, index: 4, season: "spring", alph: 14, level: "Transition PW -> FS" },
  { name: 'tbe', score: 440, index: 3, season: "spring", alph: 2, level: "Transition PW -> FS" },
  { name: 'rr', score: 436, index: 2, season: "spring", alph: 17, level: "Transition PW -> FS" },
  { name: 'bn', score: 435, index: 1, season: "spring", alph: 13, level: "Transition PW -> FS" },
  { name: 'my', score: 434, index: 0, season: "spring", alph: 24, level: "Transition PW -> FS" },
];

const studentData = [
  { name: 'G2 Fall', score: 415, index: 0, season: "fall" },
  { name: 'G2 Winter', score: 418, index: 1, season: "winter" },
  { name: 'G2 Spring', score: 430, index: 2, season: "spring" },
  { name: 'G3 Fall', score: 429, index: 3, season: "fall" },
  { name: 'G3 Winter', score: 439, index: 4, season: "winter" },
  { name: 'G3 Spring', score: 449, index: 5, season: "spring" },
  { name: 'G4 Fall', score: 450, index: 6, season: "fall" },
  { name: 'G4 Winter', score: 465, index: 7, season: "winter" },
  { name: 'G4 Spring', score: 470, index: 8, season: "spring" }
];

const lpLevelCutoffs = [419, 430, 449, 459, 469, 481, 494]

const lpLevels = [
  { level: 'Part-Whole', score: 424},
  { level: 'Fair Shares', score: 454},
  { level: 'Number Line', score: 472},
  { level: 'Multiply & Divide', score: 500},

]

const grade4descriptors = [
  { level: 'Name parts of whole (grade 3)', score: 427},
  { level: 'Partition objects (grade 3)', score: 443},
  { level: 'Represent fractions on a number line (grade 4)', score: 460},
  { level: 'Equivalent fractions (grade 4)', score: 473},
  { level: 'Multiply two fractions (grade 5)', score: 499},
]

const grade4cutoffs = [427, 443, 460, 473, 499]

const renderOrderedXAxisTick = ({ x, y, payload }) => {
  // get name to render from scoreData
  var d = scoreData.slice(0, 25)
  var sorted = d.sort((a, b) => (a.index > b.index) ? 1 : -1)
  var dat = sorted[payload.value];
  var name = dat.name
  return (
    <text x={x} y={y+20} fill="#666" textAnchor="middle"> {name} </text>
  );
};

const renderAlphXAxisTick = ({ x, y, payload }) => {
  // get name to render from scoreData
  var d = scoreData.slice(0, 25)
  var sorted = d.sort((a, b) => (a.alph > b.alph) ? 1 : -1)
  var dat = sorted[payload.value];
  var name = dat.name
  return (
    <text x={x} y={y+20} fill="#666" textAnchor="middle"> {name} </text>
  );
};

const renderStudentXAxisTick = ({ x, y, payload }) => {
  var dat = studentData[payload.value];
  var name = dat.name
  return (
    <text x={x} y={y+20} fill="#666" textAnchor="middle"> {name} </text>
  );
};

const renderCustomYAxisTick = ({ x, y, payload }) => {
  for(var z in lpLevels){
    if(lpLevels[z].score===payload.value){
      return (
          <foreignObject x={x+10} y={y-25} width="150" height="50">
          <button className="yaxisbutton" xmlns="http://www.w3.org/1999/xhtml">{lpLevels[z].level}</button>
          </foreignObject>
      );
    }
  }
};

const CustomYAxisLabel = ({ viewBox }) => {
    return (
        <Text
          className='lpLevelLabel'
          x={viewBox['x']}
          y={viewBox['y']}
          dx={70}
          dy={40}
          textAnchor="middle"
          width={50}
        >
          Understanding of Fractions
        </Text>
    );
};

const renderGradeYAxisTick = ({ x, y, payload }) => {
  for(var z in grade4descriptors){
    if(grade4descriptors[z].score===payload.value){
      return (
          <foreignObject x={x+25} y={y-20} width="120" height="93">
            <button className="yaxisbutton" xmlns="http://www.w3.org/1999/xhtml">{grade4descriptors[z].level}</button>
          </foreignObject>
      );
    }
  }

};

const downloadTxtFile = () => {
    console.log("download logic goes here")
}

function Option(props)  {
  const dispatch = useDispatch();
  const {value, isSelected} = props;
  if(value==="growth") {
    if(isSelected){
      dispatch(enableGrowth());
    } else {
      dispatch(disableGrowth());
    }
  }

  if(value==="showColor") {
    if(isSelected){
      dispatch(enableColor())
    } else{
      dispatch(disableColor())
    }
  }

  if(value==="uncertainty") {
    if(isSelected){
      dispatch(enableUncertainty())
    } else{
      dispatch(disableUncertainty())
    }
  }

  if(value==="graderange") {
    if(isSelected){
      dispatch(enableGradeRange())
    } else{
      dispatch(disableGradeRange())
    }
  }

  if(value==="align") {
    if(isSelected){
      dispatch(enableAlign())
    } else{
      dispatch(disableAlign())
    }
  }

  if(value==="scoreordering") {
    if(isSelected){
      dispatch(enableStudentOrdering())
    } else{
      dispatch(disableStudentOrdering())
    }
  }

  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }

  handleChange = (selected) => {
    this.setState({
      optionSelected: selected
    });
  };

  render() {
    return (
      <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please select"
      >
        <ReactSelect
          options={displayOptions}
          isMulti
          isClearable={false}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
        />
      </span>
    );
  }
}

class StudentDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }

  handleChange = (selected) => {
    this.setState({
      optionSelected: selected
    });
  };

  render() {
    return (
      <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please select"
      >
        <ReactSelect
          options={studentDisplayOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
        />
      </span>
    );
  }
}

const CustomShape = (props) => {
  const {cx, cy, payload, growth, uncertainty} = props;
  var season = payload.season
  var f = "#97E909"
  var vis = "visible"

  if(season==="winter"){
    f = "#02A1F5"
    if(growth===false){
      vis = "hidden"
    }
  }
  if(season==="fall"){
    f = "#F55F02"
    if(growth===false){
      vis = "hidden"
    }
  }

  if(uncertainty===true){
    return (
      <g>
        <ellipse cx={cx} cy={cy} rx={7} ry={15} fill={f} stroke="gray" visibility={vis} opacity="0.7"/>
        <circle cx={cx} cy={cy} r={7} fill={f} stroke="gray" visibility={vis} />
      </g>
     );
  } else{
    return (
      <g>
        <circle cx={cx} cy={cy} r={7} fill={f} stroke="gray" visibility={vis} />
      </g>
     );
   }
};

const CustomTooltip_Ordered = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    var dat;
    for(var z in scoreData){
      if(scoreData[z].score===payload[1].value & scoreData[z].index === payload[0].value){
        dat = scoreData[z];
      }
    }
    return (
      <div className="custom-tooltip">
        <p className="label"> Student: {dat.name}</p>
        <p className="intro">Score: {payload[1].value}</p>
        <p className="intro">Season: {dat.season}</p>
        <p className="intro">Level: {dat.level}</p>
      </div>
    );
  }

  return null;
};

const CustomTooltip_Alph = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    var dat;
    for(var z in scoreData){
      if(scoreData[z].score===payload[1].value & scoreData[z].alph === payload[0].value){
        dat = scoreData[z];
      }
    }
    return (
      <div className="custom-tooltip">
        <p className="label"> Student: {dat.name}</p>
        <p className="intro">Score: {payload[1].value}</p>
        <p className="intro">Season: {dat.season}</p>
        <p className="intro">Level: {dat.level}</p>
      </div>
    );
  }

  return null;
};

function ScoreGridFull() {
  const dispatch = useDispatch()
  const growth = useSelector((state) => state.global.growth)
  const uncertainty = useSelector((state) => state.global.uncertainty)
  const graderange = useSelector((state) => state.global.graderange)
  const studentOrdering = useSelector((state) => state.global.studentOrdering)
  const showColor=useSelector((state) => state.global.showColor)

  return (
    <div>
      <div className="title">
        Learning Progression View <a href={lpexpl} download="Fractions LP" target='_blank'><button>?</button></a>
      </div>
      <div className="grid">
        <ResponsiveContainer classname="sgf" width={1300} height={600}>
            <ScatterChart
              width="100%"
              height="100%"
              data={scoreData}
              margin={{ top: 20, right: 150, bottom: 30, left: 30 }}
            >
            {<CartesianGrid className="fullLPGrid" vertical={false} fill={showColor?"url(#LPGradient)":""}/>}
              <XAxis type="number" tickCount={25} dataKey={studentOrdering ? "index" : "alph"} tick={studentOrdering?renderOrderedXAxisTick:renderAlphXAxisTick}
                label={{ value: 'Student Initials', position: 'outsideBottom', dy: 30 }}
              />
              <YAxis
                data={lpLevels}
                yAxisId="right"
                orientation="right"
                domain={[400, 525]}
                label={<CustomYAxisLabel />}
                ticks={[424, 454, 472, 500]}
                tick={renderCustomYAxisTick}
                tickLine={false}
                onClick={(e) => {
                  var item = "";
                  for(var z in lpLevels){
                    if(lpLevels[z].score===e.value){
                      item = lpLevels[z].level;
                    }
                  }
                  dispatch(toggleItemView(item));
                }}
              />
              <YAxis yAxisId="left" dataKey="score" domain={[400, 525]} ticks = {[400, 425, 450, 475, 500, 525]}
                label={{ value: 'i-Ready scale score', angle: -90, position: 'insideLeft' }}
                tickLine={false}
              />
              <Tooltip content={studentOrdering? <CustomTooltip_Ordered /> : <CustomTooltip_Alph />}/>
              <ZAxis range={[100, 100]} />
              <ReferenceArea yAxisId="left" x1={0.01} x2={24} y1={490} y2={525} fill="gray" fillOpacity={graderange ? 0.8 : 0} />
              <ReferenceArea yAxisId="left" x1={0.01} x2={24} y1={400} y2={440} fill="gray" fillOpacity={graderange ? 0.8 : 0} />
              <Scatter
                yAxisId="left"
                data={scoreData}
                shape={<CustomShape growth={growth} uncertainty={uncertainty}/>}
                onClick={() => dispatch(enableStudentView())}
              />
            </ScatterChart>
        </ResponsiveContainer>
        <div className="bottomArrow">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-triangle" width='25' height='30' fill="black"
            fill-opacity="0.8" stroke-opacity="0">
            <polygon points="5,20 15,0 25,20"/>
            <polygon points="11,20 11,30 19,30 19,20"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ScoreGridFullWithItem() {
    const dispatch = useDispatch()
    const growth = useSelector((state) => state.global.growth)
    const uncertainty = useSelector((state) => state.global.uncertainty)
    const graderange = useSelector((state) => state.global.graderange)
    const itemDisplay = useSelector((state) => state.global.itemDisplay)
    const studentOrdering = useSelector((state) => state.global.studentOrdering)
    const showColor=useSelector((state) => state.global.showColor)
    const showSolution=useSelector((state) => state.global.solution)

    var itemPath = "";
    var levelText = "";
    var levelName = "";
    switch (itemDisplay) {
      case "Number Line":
        itemPath = showSolution?msolution:mitem;
        levelName = "Level 3: Number Line";
        levelText =  (
          <ul>
            <li>A fraction is a real number that can be uniquely represented on a number line.</li>
            <li>Fractional values can be converted to decimals or percentages while maintaining their numerical value:  1/5=.20=20%</li>
            <li>Fractions with different denominators may be readily compared, added, or subtracted if they are put into the same units: 1/2−1/5=5/10−2/10=3/10</li>
            <li>Students at this level may not understand the function and method of fraction multiplication or division.</li>
          </ul>
        );
        break;
      case "Multiply & Divide":
        itemPath = showSolution?osolution:opitem;
        levelName = "Level 4: Multiply & Divide";
        levelText =  (
          <ul>
            <li>Students use ratios as multipliers to find a proportional amount of an original value.</li>
            <li>Student may think of fractions as the multiplication of the numerator followed by the division of the denominator, or consider a fraction as a way to stretch or shrink a different value.</li>
            <li>Students must understand that multiplication can lead to the decrease in magnitude of a value.</li>
          </ul>
        );
        break;
      case "Fair Shares":
        itemPath = showSolution?qsolution:qitem;
        levelName = "Level 2: Understand Unit Fractions (Finding Fair Shares)";
        levelText =  (
          <ul>
            <li>Fractional parts must be equal (“fair shares”) but may not visually appear the same (i.e., a square could be cut into diagonal 4ths or perpendicular 4ths, but still comprise 4 parts of the whole)</li>
            <li>Unit fractions can be iterated to reproduce the original whole or part of the whole</li>
            <li>Can provide conceptual explanation for the reasoning used to solve 1/5+3/5+1/5=?</li>
            <li>Have operational understanding that the fraction  a/b represents the division of a by b</li>
            <li>Students at this level may have difficulty comparing fractions with different denominators</li>
          </ul>
        );
        break;
      default:
        itemPath = showSolution?pwsolution:pwitem;
        levelName = "Level 1: See Part-Whole";
        levelText =  (
          <ul>
            <li>A fraction represents a specified number of parts out of the total number of parts.</li>
            <li>Students at this level may have difficulty partitioning a whole (i.e., not using all parts of a whole) and comparing fractions.</li>
          </ul>
        );
    }

    return (
      <div>
        <div className="title">
          Learning Progression View <a href={lpexpl} download="Fractions LP" target='_blank'><button>?</button></a>
        </div>
        <div className="grid">
          <ResponsiveContainer classname="sgf" width={900} height={600}>
              <ScatterChart
                width="100%"
                height="100%"
                data={scoreData}
                margin={{ top: 20, right: 150, bottom: 30, left: 30 }}
              >
                <XAxis type="number" tickCount={25} dataKey={studentOrdering ? "index" : "alph"} tick={studentOrdering?renderOrderedXAxisTick:renderAlphXAxisTick}
                  label={{ value: 'Student Initials', position: 'outsideBottom', dy: 30 }}
                />

                <YAxis
                  data={lpLevels}
                  yAxisId="right"
                  orientation="right"
                  domain={[400, 525]}
                  label={<CustomYAxisLabel />}
                  ticks={[424, 454, 472, 500]}
                  tick={renderCustomYAxisTick}
                  tickLine={false}
                  onClick={(e) => {
                    var item = "";
                    for(var z in lpLevels){
                      if(lpLevels[z].score===e.value){
                        item = lpLevels[z].level;
                      }
                    }
                    dispatch(toggleItemView(item));
                  }}
                />
                <YAxis yAxisId="left" dataKey="score" domain={[400, 525]} ticks = {[400, 425, 450, 475, 500, 525]}
                  label={{ value: 'i-Ready scale score', angle: -90, position: 'insideLeft' }}
                  tickLine={false}
                />
                <Tooltip content={studentOrdering? <CustomTooltip_Ordered /> : <CustomTooltip_Alph />}/>
                <ZAxis  range={[90, 90]} />
                {<CartesianGrid className="fullLPGrid" fill={showColor?"url(#LPGradient)":""}/>}
                <ReferenceArea yAxisId="left" x1={0.01} x2={24} y1={490} y2={525} fill="gray" fillOpacity={graderange ? 0.8 : 0} />
                <ReferenceArea yAxisId="left" x1={0.01} x2={24} y1={400} y2={440} fill="gray" fillOpacity={graderange ? 0.8 : 0} />
                <Scatter
                  yAxisId="left"
                  data={scoreData}
                  shape={<CustomShape growth={growth} uncertainty={uncertainty}/>}
                  onClick={() => dispatch(enableStudentView())}
                />
              </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="itemImage">
          <button onClick = {() => dispatch(toggleItemView(""))}>X</button>
          <div className="levelText">
            <text class="levelName">
              {levelName}
            </text>
            <br/>
            <text className="levelDescriptor">
              {levelText}
            </text>
            <br/>
          </div>
          <div className="exampleText">
            Example item for {itemDisplay}
          </div>
          <div>
            <img class="itempng" src={itemPath} alt="Example item" width="350" />
            <button className="solutionButton" onClick={() => dispatch(toggleSolution())} >
              {showSolution ? "Show example item" : "Solution"}
            </button>
          </div>
        </div>
      </div>
    );
}

function ScoreGridGrade() {
  const dispatch = useDispatch()
  const growth = useSelector((state) => state.global.growth)
  const uncertainty = useSelector((state) => state.global.uncertainty)
  const graderange = useSelector((state) => state.global.graderange)
  const studentOrdering = useSelector((state) => state.global.studentOrdering)

    return (
      <div>
        <div className="title">
          Grade-specific Content
        </div>
        <div className="grid">
          <ResponsiveContainer classname="sgf" width={1300} height={600}>
              <ScatterChart
                width="100%"
                height="100%"
                data={scoreData}
                margin={{ top: 20, right: 150, bottom: 30, left: 30 }}
              >
                <XAxis type="number" tickCount={25} dataKey="index" tick={studentOrdering?renderOrderedXAxisTick:renderAlphXAxisTick}
                  label={{ value: 'Student Initials', position: 'outsideBottom', dy: 30 }}
                />
                <YAxis yAxisId="left" dataKey="score" domain={[427, 500]} ticks = {[427, 443, 460, 473, 499]}
                  label={{ value: 'i-Ready scale score', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={studentOrdering? <CustomTooltip_Ordered /> : <CustomTooltip_Alph />}/>
                <YAxis
                  data={grade4descriptors}
                  dataKey="score"
                  yAxisId="right"
                  orientation="right"
                  domain={[427, 500]}
                  label={ {value: 'Content descriptors', angle: 90, position: 'insideRight', dx: 140} }
                  ticks={grade4cutoffs}
                  tick={renderGradeYAxisTick}
                  tickLine={false}
                  onClick={(e) => {
                    var item = "";
                    for(var z in grade4descriptors){
                      if(grade4descriptors[z].score===e.value){
                        item = grade4descriptors[z].level;
                      }
                    }
                    dispatch(toggleItemView(item));
                  }}
                />
                <ZAxis  range={[90, 90]} />
                <CartesianGrid className="fullLPGrid" fill="url(#GradeGradient)"/>
                <ReferenceArea yAxisId="left" x1={0.01} x2={24} y1={490} y2={500} fill="gray" fillOpacity={graderange ? 0.8 : 0} />
                <ReferenceArea yAxisId="left" x1={0.01} x2={24} y1={411} y2={440} fill="gray" fillOpacity={graderange ? 0.8 : 0} />
                <Scatter
                  yAxisId="left"
                  data={scoreData}
                  shape={<CustomShape growth={growth} uncertainty={uncertainty}/>}
                  onClick={() => dispatch(enableStudentView())}
                />
              </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
}

function ScoreGridGradeWithItem() {
  const dispatch = useDispatch()
  const growth = useSelector((state) => state.global.growth)
  const uncertainty = useSelector((state) => state.global.uncertainty)
  const graderange = useSelector((state) => state.global.graderange)
  const itemDisplay = useSelector((state) => state.global.itemDisplay)
  const studentOrdering = useSelector((state) => state.global.studentOrdering)
  const showSolution=useSelector((state) => state.global.solution)

  return (
    <div>
      <div className="title">
        Grade-specific Content
      </div>
      <div className="grid">
        <ResponsiveContainer classname="sgf" width={900} height={600}>
            <ScatterChart
              width="100%"
              height="100%"
              data={scoreData}
              margin={{ top: 20, right: 90, bottom: 30, left: 30 }}
            >
              <XAxis type="number" tickCount={25} dataKey="index" tick={studentOrdering?renderOrderedXAxisTick:renderAlphXAxisTick}
                label={{ value: 'Student Initials', position: 'outsideBottom', dy: 30 }}
              />
              <YAxis yAxisId="left" dataKey="score" domain={[427, 500]} ticks = {[427, 443, 460, 473, 499]}
                label={{ value: 'i-Ready scale score', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={studentOrdering? <CustomTooltip_Ordered /> : <CustomTooltip_Alph />}/>
              <YAxis
                data={grade4descriptors}
                dataKey="score"
                yAxisId="right"
                orientation="right"
                domain={[427, 500]}
                ticks={grade4cutoffs}
                tick={renderGradeYAxisTick}
                tickLine={false}
                onClick={(e) => {
                  var item = "";
                  for(var z in grade4descriptors){
                    if(grade4descriptors[z].score===e.value){
                      item = grade4descriptors[z].level;
                    }
                  }
                  dispatch(toggleItemView(item));
                }}
              />
              <ZAxis  range={[90, 90]} />
              <CartesianGrid className="fullLPGrid" fill="url(#GradeGradient)"/>
              <ReferenceArea yAxisId="left" x1={0.01} x2={24} y1={490} y2={500} fill="gray" fillOpacity={graderange ? 0.8 : 0} />
              <ReferenceArea yAxisId="left" x1={0.01} x2={24} y1={411} y2={440} fill="gray" fillOpacity={graderange ? 0.8 : 0} />
              <Scatter
                yAxisId="left"
                data={scoreData}
                shape={<CustomShape growth={growth} uncertainty={uncertainty}/>}
                onClick={() => dispatch(enableStudentView())}
              />
            </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="itemImage">
        <div className="exampleText">
          Placeholder for item for {itemDisplay}
        </div>
        <div>
          <img class="itempng" src={mitem} alt="Example item" width="300" height="150" />
          <button className="solutionButton" onClick={() => dispatch(toggleSolution())} >
            {showSolution ? "Show example item" : "Solution"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StudentView(){
  const dispatch = useDispatch()
  const align = useSelector((state) => state.global.align)
  const itemDisplay = useSelector((state) => state.global.itemDisplay)
  const uncertainty = useSelector((state) => state.global.uncertainty)
  const showColor=useSelector((state) => state.global.showColor)
  const showSolution=useSelector((state) => state.global.solution)

  var itemPath = "";
  var levelText = "";
  var levelName = "";
  switch (itemDisplay) {
    case "Number Line":
      itemPath = showSolution?msolution:mitem;
      levelName = "Level 3: Number Line";
      levelText =  (
        <ul>
          <li>A fraction is a real number that can be uniquely represented on a number line.</li>
          <li>Fractional values can be converted to decimals or percentages while maintaining their numerical value:  1/5=.20=20%</li>
          <li>Fractions with different denominators may be readily compared, added, or subtracted if they are put into the same units: 1/2−1/5=5/10−2/10=3/10</li>
          <li>Students at this level may not understand the function and method of fraction multiplication or division.</li>
        </ul>
      );
      break;
    case "Multiply & Divide":
      itemPath = showSolution?osolution:opitem;
      levelName = "Level 4: Multiply & Divide";
      levelText =  (
        <ul>
          <li>Students use ratios as multipliers to find a proportional amount of an original value.</li>
          <li>Student may think of fractions as the multiplication of the numerator followed by the division of the denominator, or consider a fraction as a way to stretch or shrink a different value.</li>
          <li>Students must understand that multiplication can lead to the decrease in magnitude of a value.</li>
        </ul>
      );
      break;
    case "Fair Shares":
      itemPath = showSolution?qsolution:qitem;
      levelName = "Level 2: Understand Unit Fractions (Finding Fair Shares)";
      levelText =  (
        <ul>
          <li>Fractional parts must be equal (“fair shares”) but may not visually appear the same (i.e., a square could be cut into diagonal 4ths or perpendicular 4ths, but still comprise 4 parts of the whole)</li>
          <li>Unit fractions can be iterated to reproduce the original whole or part of the whole</li>
          <li>Can provide conceptual explanation for the reasoning used to solve 1/5+3/5+1/5=?</li>
          <li>Have operational understanding that the fraction  a/b represents the division of a by b</li>
          <li>Students at this level may have difficulty comparing fractions with different denominators</li>
        </ul>
      );
      break;
    default:
      itemPath = showSolution?pwsolution:pwitem;
      levelName = "Level 1: See Part-Whole";
      levelText =  (
        <ul>
          <li>A fraction represents a specified number of parts out of the total number of parts.</li>
          <li>Students at this level may have difficulty partitioning a whole (i.e., not using all parts of a whole) and comparing fractions.</li>
        </ul>
      );
  }

  const studentViewItem = (itemDisplay !== "") ? (
    <div className="itemImage">
      <button onClick = {() => dispatch(toggleItemView(""))}>X</button>
      <div className="levelText">
        <text class="levelName">
          {levelName}
        </text>
        <br/>
        <text className="levelDescriptor">
          {levelText}
        </text>
        <br/>
      </div>
      <div className="exampleText">
        Example item for {itemDisplay}
      </div>
      <div>
        <img class="itempng" src={itemPath} alt="Example item" width="350" />
        <button className="solutionButton" onClick={() => dispatch(toggleSolution())} >
          {showSolution ? "Show example item" : "Solution"}
        </button>
      </div>
    </div>
  ) : (<div/>)

  return (
    <div>
      <div className="title">
        Example View for One Student
      </div>
      <div className="grid">
        <ResponsiveContainer classname="sgf" width={(itemDisplay!=="")?900:1300} height={600}>
            <LineChart
              width="100%"
              height="100%"
              data={studentData}
              margin={{ top: 20, right: 150, bottom: 30, left: 30 }}
            >
              <XAxis type="number" tickCount={9} dataKey="index" tick={renderStudentXAxisTick}
                label={{ value: 'Grade and Season', position: 'outsideBottom', dy: 30 }}
              />
              <YAxis
                data={lpLevels}
                yAxisId="right"
                orientation="right"
                domain={[400, 525]}
                label={<CustomYAxisLabel />}
                ticks={[424, 454, 472, 500]}
                tick={renderCustomYAxisTick}
                tickLine={false}
                onClick={(e) => {
                  var item = "";
                  for(var z in lpLevels){
                    if(lpLevels[z].score===e.value){
                      item = lpLevels[z].level;
                    }
                  }
                  dispatch(toggleItemView(item));
                }}
              />
              <YAxis yAxisId="left" dataKey="score" domain={[400, 525]} ticks = {[400, 425, 450, 475, 500, 525]}
                label={{ value: 'i-Ready scale score', angle: -90, position: 'insideLeft' }}
              />
              <ZAxis range={[100, 100]} />
              <CartesianGrid className="fullLPGrid" fill={showColor?"url(#LPGradient)":""}/>
              <ReferenceArea yAxisId="left" x1={0} x2={2} y1={425} y2={525} fill="gray" fillOpacity={align ? 0.8 : 0} />
              <ReferenceArea yAxisId="left" x1={2} x2={5} y1={470} y2={525} fill="gray" fillOpacity={align ? 0.8 : 0} />
              <ReferenceArea yAxisId="left" x1={5} x2={8} y1={400} y2={460} fill="gray" fillOpacity={align ? 0.8 : 0} />
              <ReferenceArea yAxisId="left" x1={5} x2={8} y1={500} y2={525} fill="gray" fillOpacity={align ? 0.8 : 0} />
              <Line
                yAxisId="left"
                dataKey="score"
                stroke="#808080"
                dot={<CustomShape growth={true} uncertainty={uncertainty}/>}
              />
            </LineChart>
        </ResponsiveContainer>
        {(itemDisplay === "") ?
        <div className="bottomArrow">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-triangle" width='25' height='30' fill="black"
            fill-opacity="0.8" stroke-opacity="0">
            <polygon points="5,20 15,0 25,20"/>
            <polygon points="11,20 11,30 19,30 19,20"/>
          </svg>
        </div> : <div />
      }
      </div>
      {studentViewItem}
    </div>
  );
}

function Prototype() {
  const view = useSelector((state) => state.global.view)
  const studentView = useSelector((state) => state.global.studentView)
  const itemDisplay = useSelector((state) => state.global.itemDisplay)
  const growth = useSelector((state) => state.global.growth)
  const dispatch = useDispatch()

  if(studentView===true){
    return (
      <div className = "prototype">
        <div style={{width: '500px'}}>
          <button
             aria-label="Return to class view"
             onClick={() => dispatch(disableStudentView())}
             style={{width: '300px', position: 'absolute', left: '90px'}}
           >
            Return to class view
          </button>
          <br/>
          <br/>
          <StudentDropdown  />
        </div>
        <StudentView />
        <div className={itemDisplay==="" ? "seasonKey" : "seasonKey itemViewKey"}>
          <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#F55F02" stroke="gray" /></svg> <div className="seasonText"> Fall </div>
          <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#02A1F5" stroke="gray" /></svg> <div className="seasonText"> Winter </div>
          <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#97E909" stroke="gray" /></svg> <div className="seasonText"> Spring </div>
        </div>
      </div>
    );
  }
  else{
    if(view==="fullLP"){
      if(itemDisplay===""){
        return (
          <div className = "prototype">
            <div style={{width: '500px'}}>
              {/*<button
                 aria-label="Switch to grade 4 view"
                 onClick={() => dispatch(switchView())}
                 style={{width: '300px', position: 'absolute', left: '90px'}}
               >
                Switch to grade 4 view
              </button>
              <br/>*/}
              <br/>
              <Dropdown  />
            </div>
            <ScoreGridFull />
            {growth &&
              <div className="seasonKey">
                <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#F55F02" stroke="gray" /></svg> <div className="seasonText"> Fall </div>
                <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#02A1F5" stroke="gray" /></svg> <div className="seasonText"> Winter </div>
                <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#97E909" stroke="gray" /></svg> <div className="seasonText"> Spring </div>
              </div>
            }
          </div>
        );
      } else{
        return (
          <div className = "prototype">
            <div style={{width: '500px'}}>
              {/*<button
                 aria-label="Switch to grade 4 view"
                 onClick={() => dispatch(switchView())}
                 style={{width: '300px', position: 'absolute', left: '90px'}}
               >
                Switch to grade 4 view
              </button>
              <br/>*/}
              <br/>
              <Dropdown  />
            </div>
            <ScoreGridFullWithItem />
            {growth &&
              <div className="seasonKey itemViewKey">
                <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#F55F02" stroke="gray" /></svg> <div className="seasonText"> Fall </div>
                <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#02A1F5" stroke="gray" /></svg> <div className="seasonText"> Winter </div>
                <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#97E909" stroke="gray" /></svg> <div className="seasonText"> Spring </div>
              </div>
            }
          </div>
        );
      }
    } else if (view==="grade4"){
      if(itemDisplay===""){
        return(
          <div className = "prototype">
            <div style={{width: '500px'}}>
              <button
                 aria-label="Switch to full LP view"
                 onClick={() => dispatch(switchView())}
                 style={{width: '300px', position: 'absolute', left: '90px'}}
               >
                Switch to full LP view
              </button>
              <br/>
              <br/>
              <Dropdown  />
            </div>
            <ScoreGridGrade />
            {growth &&
              <div className="seasonKey">
                <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#F55F02" stroke="gray" /></svg> <div className="seasonText"> Fall </div>
                <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#02A1F5" stroke="gray" /></svg> <div className="seasonText"> Winter </div>
                <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#97E909" stroke="gray" /></svg> <div className="seasonText"> Spring </div>
              </div>
            }
          </div>
        )
      } else{
        return(
          <div className = "prototype">
            <div style={{width: '500px'}}>
              <button
                 aria-label="Switch to full LP view"
                 onClick={() => dispatch(switchView())}
                 style={{width: '300px', position: 'absolute', left: '90px'}}
               >
                Switch to full LP view
              </button>
              <br/>
              <br/>
              <Dropdown  />
            </div>
            <ScoreGridGradeWithItem />
            {growth &&
              <div className="seasonKey itemViewKey">
                <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#F55F02" stroke="gray" /></svg> <div className="seasonText"> Fall </div>
                <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#02A1F5" stroke="gray" /></svg> <div className="seasonText"> Winter </div>
                <svg className="keycircle"><circle cx={10} cy={10} r={7} fill="#97E909" stroke="gray" /></svg> <div className="seasonText"> Spring </div>
              </div>
            }
          </div>
        )
      }
    }
  }
}

function App () { //extends React.Component {

  //render() {
    return(
      <div>
        <svg height={0}>
          <linearGradient id="LPGradient" gradientTransform="rotate(90)">
            <stop offset="18%" stop-color="#B100CD" />
            <stop offset="40%" stop-color="#FFE800" />
            <stop offset="58%" stop-color="#0200C6" />
            <stop offset="77%" stop-color="#FF8B00" />
          </linearGradient>
          <linearGradient id="GradeGradient" gradientTransform="rotate(90)">
            <stop offset="14%" stop-color="#A58AFF" />
            <stop offset="42%" stop-color="#53B400" />
            <stop offset="55%" stop-color="#C49A00" />
            <stop offset="65%" stop-color="#C49A00" />
            <stop offset="93%" stop-color="#F8766D" />
          </linearGradient>
        </svg>
        <Provider store={store}>
          <Prototype />
        </Provider>
      </div>
    );
}


export default App;
