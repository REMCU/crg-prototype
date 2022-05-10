import logo from './logo.svg';
import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './store'
import {switchView, toggleItemView, enableGrowth, enableUncertainty,
disableGrowth, disableUncertainty, enableGradeRange, disableGradeRange,
enableStudentView, disableStudentView, enableAlign, disableAlign} from './stateslice'
import {
  ScatterChart, Scatter,
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, ZAxis, ReferenceLine,
  CartesianGrid, CartesianAxis, Label,
  ReferenceArea, Tooltip
} from 'recharts';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";



// dropdown definitions
const displayOptions = [
  { value: "growth", label: "Show Prior Scores" },
  { value: "uncertainty", label: "Show Score Uncertainty" },
  { value: "graderange", label: "Show Grade 4 Score Range" }
];

const studentDisplayOptions = [
  { value: "align", label: "Align LP with Grade" },
  { value: "uncertainty", label: "Show Score Uncertainty" },
];

const viewOptions = [
  { value: "fullLP", label: "Show Full LP" },
  { value: "grade4View", label: "Zoom in on Class" }
];

// create nine students to start
// eventually will be filled with results from grade 2, 3, 4, fall/winter/spring
const scoreData = [
  { name: 'bg', score: 455, index: 0, season: "fall" },
  { name: 'jr', score: 447, index: 1, season: "fall" },
  { name: 'plo', score: 450, index: 2, season: "fall" },
  { name: 'rk', score: 453, index: 3, season: "fall" },
  { name: 'mf', score: 449, index: 4, season: "fall" },
  { name: 'vg', score: 435, index: 5, season: "fall" },
  { name: 'kg', score: 440, index: 6, season: "fall" },
  { name: 'rt', score: 443, index: 7, season: "fall" },
  { name: 'qm', score: 437, index: 8, season: "fall" },
  { name: 'zp', score: 436, index: 9, season: "fall" },
  { name: 'ps', score: 441, index: 10, season: "fall" },
  { name: 'ly', score: 440, index: 11, season: "fall" },
  { name: 'rw', score: 430, index: 12, season: "fall" },
  { name: 'ub', score: 430, index: 13, season: "fall" },
  { name: 'va', score: 432, index: 14, season: "fall" },
  { name: 'xd', score: 423, index: 15, season: "fall" },
  { name: 'lk', score: 426, index: 16, season: "fall" },
  { name: 'mm', score: 427, index: 17, season: "fall" },
  { name: 'gt', score: 420, index: 18, season: "fall" },
  { name: 'sw', score: 420, index: 19, season: "fall" },
  { name: 'do', score: 423, index: 20, season: "fall" },
  { name: 'tbe', score: 422, index: 21, season: "fall" },
  { name: 'rr', score: 422, index: 22, season: "fall" },
  { name: 'bn', score: 411, index: 23, season: "fall" },
  { name: 'my', score: 414, index: 24, season: "fall" },
  { name: 'bg', score: 453, index: 0, season: "winter" },
  { name: 'jr', score: 452, index: 1, season: "winter" },
  { name: 'plo', score: 455, index: 2, season: "winter" },
  { name: 'rk', score: 455, index: 3, season: "winter" },
  { name: 'mf', score: 447, index: 4, season: "winter" },
  { name: 'vg', score: 445, index: 5, season: "winter" },
  { name: 'kg', score: 442, index: 6, season: "winter" },
  { name: 'rt', score: 448, index: 7, season: "winter" },
  { name: 'qm', score: 440, index: 8, season: "winter" },
  { name: 'zp', score: 441, index: 9, season: "winter" },
  { name: 'ps', score: 443, index: 10, season: "winter" },
  { name: 'ly', score: 444, index: 11, season: "winter" },
  { name: 'rw', score: 437, index: 12, season: "winter" },
  { name: 'ub', score: 437, index: 13, season: "winter" },
  { name: 'va', score: 434, index: 14, season: "winter" },
  { name: 'xd', score: 428, index: 15, season: "winter" },
  { name: 'lk', score: 430, index: 16, season: "winter" },
  { name: 'mm', score: 429, index: 17, season: "winter" },
  { name: 'gt', score: 423, index: 18, season: "winter" },
  { name: 'sw', score: 426, index: 19, season: "winter" },
  { name: 'do', score: 426, index: 20, season: "winter" },
  { name: 'tbe', score: 425, index: 21, season: "winter" },
  { name: 'rr', score: 420, index: 22, season: "winter" },
  { name: 'bn', score: 419, index: 23, season: "winter" },
  { name: 'my', score: 418, index: 24, season: "winter" },
  { name: 'bg', score: 475, index: 0, season: "spring" },
  { name: 'jr', score: 472, index: 1, season: "spring" },
  { name: 'plo', score: 472, index: 2, season: "spring" },
  { name: 'rk', score: 470, index: 3, season: "spring" },
  { name: 'mf', score: 466, index: 4, season: "spring" },
  { name: 'vg', score: 465, index: 5, season: "spring" },
  { name: 'kg', score: 464, index: 6, season: "spring" },
  { name: 'rt', score: 464, index: 7, season: "spring" },
  { name: 'qm', score: 460, index: 8, season: "spring" },
  { name: 'zp', score: 459, index: 9, season: "spring" },
  { name: 'ps', score: 457, index: 10, season: "spring" },
  { name: 'ly', score: 455, index: 11, season: "spring" },
  { name: 'rw', score: 453, index: 12, season: "spring" },
  { name: 'ub', score: 450, index: 13, season: "spring" },
  { name: 'va', score: 450, index: 14, season: "spring" },
  { name: 'xd', score: 447, index: 15, season: "spring" },
  { name: 'lk', score: 444, index: 16, season: "spring" },
  { name: 'mm', score: 443, index: 17, season: "spring" },
  { name: 'gt', score: 442, index: 18, season: "spring" },
  { name: 'sw', score: 442, index: 19, season: "spring" },
  { name: 'do', score: 441, index: 20, season: "spring" },
  { name: 'tbe', score: 440, index: 21, season: "spring" },
  { name: 'rr', score: 436, index: 22, season: "spring" },
  { name: 'bn', score: 435, index: 23, season: "spring" },
  { name: 'my', score: 434, index: 24, season: "spring" },
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

const lpLevelCutoffs = [418, 430, 449, 459, 469, 481, 494]

// set file paths for items
const lpLevelItems = new Map();
// Part-Whole
lpLevelItems.set(418, './images/Part-Whole Item.png')
// Quotient
lpLevelItems.set(449, './images/Quotient Item.png')
// Measurement
lpLevelItems.set(469, './images/Measurement Item.png')
// Operation
lpLevelItems.set(494, './images/Operation Item.png')

const lpLevels = [
  { level: 'Part-Whole', score: lpLevelCutoffs[0]},
  { level: 'Quotient', score: lpLevelCutoffs[2]},
  { level: 'Measurement', score: lpLevelCutoffs[4]},
  { level: 'Operation', score: lpLevelCutoffs[6]},

]

const grade4descriptors = [
  { level: 'Name parts of whole (grade 3)', score: 427},
  { level: 'Partition objects (grade 3)', score: 443},
  { level: 'Represent fractions on a number line (grade 4)', score: 460},
  { level: 'Equivalent fractions (grade 4)', score: 473},
  { level: 'Multiply two fractions (grade 5)', score: 499},
]

const grade4cutoffs = [427, 443, 460, 473, 499]

const renderCustomXAxisTick = ({ x, y, payload }) => {
  // get name to render from scoreData
  var dat = scoreData[payload.value];
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
          <foreignObject x={x+25} y={y-40} width="120" height="50">
            <button className="yaxisbutton" xmlns="http://www.w3.org/1999/xhtml">{lpLevels[z].level}</button>
          </foreignObject>
      );
    }
  }
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
  const {cx, cy, season, growth, uncertainty} = props;
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

const CustomTooltip = ({ active, payload, label }) => {
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

  return (
    <div>
      <div className="title">
        Learning Progression View
      </div>
      <div className="grid">
        <ResponsiveContainer classname="sgf" width={1300} height={600}>
            <ScatterChart
              width="100%"
              height="100%"
              data={scoreData}
              margin={{ top: 20, right: 150, bottom: 30, left: 30 }}
            >
              <CartesianGrid className="fullLPGrid" fill="url(#LPGradient)"/>
              <XAxis type="number" tickCount={25} dataKey="index" tick={renderCustomXAxisTick}
                label={{ value: 'Student', position: 'outsideBottom', dy: 30 }}
              />
              <YAxis yAxisId="left" dataKey="score" domain={[400, 525]} ticks = {[400, 425, 450, 475, 500, 525]}
                label={{ value: 'i-Ready scale score', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />}/>
              <YAxis
                data={lpLevels}
                yAxisId="right"
                orientation="right"
                domain={[400, 525]}
                label={ {value: 'LP Level', angle: 90, position: 'insideRight', dx: 140} }
                ticks={lpLevelCutoffs}
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

    var itemPath = "";
    switch (itemDisplay) {
      case "Measurement":
        itemPath = "/images/Measurement%20Item.png";
        break;
      case "Operation":
        itemPath = "/images/Operation%20Item.png";
        break;
      case "Quotient":
        itemPath = "/images/Quotient%20Item.png";
        break;
      default:
        itemPath = "/images/Partwhole%20Item.png";
    }

    return (
      <div>
        <div className="title">
          Learning Progression View
        </div>
        <div className="grid">
          <ResponsiveContainer classname="sgf" width={900} height={600}>
              <ScatterChart
                width="100%"
                height="100%"
                data={scoreData}
                margin={{ top: 20, right: 90, bottom: 30, left: 30 }}
              >
                <XAxis type="number" tickCount={25} dataKey="index" tick={renderCustomXAxisTick}
                  label={{ value: 'Student', position: 'outsideBottom', dy: 30 }}
                />
                <YAxis yAxisId="left" dataKey="score" domain={[400, 525]} ticks = {[400, 425, 450, 475, 500, 525]}
                  label={{ value: 'i-Ready scale score', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />}/>
                <YAxis
                  data={lpLevels}
                  yAxisId="right"
                  orientation="right"
                  domain={[400, 525]}
                  ticks={lpLevelCutoffs}
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
                <ZAxis  range={[90, 90]} />
                <CartesianGrid className="fullLPGrid" fill="url(#LPGradient)"/>
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
          <div className="exampleText">
            Example item for {itemDisplay}:
          </div>
          <img src={itemPath} alt="Example item" width="300" />
          <button className="linkButton">
            Suggested followup activity
          </button>
        </div>
      </div>
    );
}

function ScoreGridGrade() {
  const dispatch = useDispatch()
  const growth = useSelector((state) => state.global.growth)
  const uncertainty = useSelector((state) => state.global.uncertainty)
  const graderange = useSelector((state) => state.global.graderange)

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
                <XAxis type="number" tickCount={25} dataKey="index" tick={renderCustomXAxisTick}
                  label={{ value: 'Student', position: 'outsideBottom', dy: 30 }}
                />
                <YAxis yAxisId="left" dataKey="score" domain={[427, 500]} ticks = {[427, 443, 460, 473, 499]}
                  label={{ value: 'i-Ready scale score', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />}/>
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
              <XAxis type="number" tickCount={25} dataKey="index" tick={renderCustomXAxisTick}
                label={{ value: 'Student', position: 'outsideBottom', dy: 30 }}
              />
              <YAxis yAxisId="left" dataKey="score" domain={[427, 500]} ticks = {[427, 443, 460, 473, 499]}
                label={{ value: 'i-Ready scale score', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />}/>
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
        <img src="/images/Measurement%20Item.png" alt="Example item" width="300" height="150" />
        <button className="linkButton">
          Suggested followup activity
        </button>
      </div>
    </div>
  );
}

function StudentView(){
  const dispatch = useDispatch()
  const align = useSelector((state) => state.global.align)
  const itemDisplay = useSelector((state) => state.global.itemDisplay)
  const uncertainty = useSelector((state) => state.global.uncertainty)

  var itemPath = "";
  switch (itemDisplay) {
    case "Measurement":
      itemPath = "/images/Measurement%20Item.png";
      break;
    case "Operation":
      itemPath = "/images/Operation%20Item.png";
      break;
    case "Quotient":
      itemPath = "/images/Quotient%20Item.png";
      break;
    default:
      itemPath = "/images/Partwhole%20Item.png";
  }

  const studentViewItem = (itemDisplay !== "") ? (<div className="itemImage">
    <div className="exampleText">
      Example item for {itemDisplay}
    </div>
    <img src={itemPath} alt="Example item" width="300" />
    <button className="linkButton">
      Suggested followup activity
    </button>
  </div>) : (<div/>)

  return (
    <div>
      <div className="title">
        Example View for One Student
      </div>
      <div className="grid">
        <ResponsiveContainer classname="sgf" width={(itemDisplay!=="")?900:1300} height={600}>
            <ScatterChart
              width="100%"
              height="100%"
              data={studentData}
              margin={{ top: 20, right: 150, bottom: 30, left: 30 }}
            >
              <XAxis type="number" tickCount={9} dataKey="index" tick={renderStudentXAxisTick}
                label={{ value: 'Occasion', position: 'outsideBottom', dy: 30 }}
              />
              <YAxis yAxisId="left" dataKey="score" domain={[400, 525]} ticks = {[400, 425, 450, 475, 500, 525]}
                label={{ value: 'i-Ready scale score', angle: -90, position: 'insideLeft' }}
              />
              <YAxis
                data={lpLevels}
                yAxisId="right"
                orientation="right"
                domain={[400, 525]}
                ticks={lpLevelCutoffs}
                tick={renderCustomYAxisTick}
                label={ {value: 'LP Level', angle: 90, position: 'insideRight', dx: 140} }
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
              <ZAxis range={[100, 100]} />
              <CartesianGrid className="fullLPGrid" fill="url(#LPGradient)"/>
              <ReferenceArea yAxisId="left" x1={0} x2={2} y1={425} y2={525} fill="gray" fillOpacity={align ? 0.8 : 0} />
              <ReferenceArea yAxisId="left" x1={2} x2={5} y1={470} y2={525} fill="gray" fillOpacity={align ? 0.8 : 0} />
              <ReferenceArea yAxisId="left" x1={5} x2={8} y1={400} y2={460} fill="gray" fillOpacity={align ? 0.8 : 0} />
              <ReferenceArea yAxisId="left" x1={5} x2={8} y1={500} y2={525} fill="gray" fillOpacity={align ? 0.8 : 0} />
              <Scatter
                yAxisId="left"
                data={studentData}
                shape={<CustomShape growth={true} uncertainty={uncertainty} />}
              />
            </ScatterChart>
        </ResponsiveContainer>
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
             aria-label="Switch to grade 4 view"
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
        <div className="seasonKey">
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
              <button
                 aria-label="Switch to grade 4 view"
                 onClick={() => dispatch(switchView())}
                 style={{width: '300px', position: 'absolute', left: '90px'}}
               >
                Switch to grade 4 view
              </button>
              <br/>
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
              <button
                 aria-label="Switch to grade 4 view"
                 onClick={() => dispatch(switchView())}
                 style={{width: '300px', position: 'absolute', left: '90px'}}
               >
                Switch to grade 4 view
              </button>
              <br/>
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
            <stop offset="27%" stop-color="#A58AFF" />
            <stop offset="42%" stop-color="#53B400" />
            <stop offset="55%" stop-color="#C49A00" />
            <stop offset="65%" stop-color="#C49A00" />
            <stop offset="83%" stop-color="#F8766D" />
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
