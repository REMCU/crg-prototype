import { createSlice } from '@reduxjs/toolkit'

export const stateSlice = createSlice({
  name: 'global',
  initialState: {
    view: "fullLP",
    growth: false,
    uncertainty: false,
    graderange: false,
    itemDisplay: "",
    studentView: false,
    align: false,
    studentOrdering: false
  },
  reducers: {
    switchView: (state) => {
      if(state.view === "fullLP"){
        state.view = "grade4"
      } else {
        state.view = "fullLP"
      }

      state.itemDisplay = ""
    },
    toggleItemView: (state, action) => {
      if(action.payload===state.itemDisplay){
        state.itemDisplay = ""
      } else{
        state.itemDisplay = action.payload
      }
    },
    enableStudentOrdering: (state, action) => {
        state.studentOrdering = true
    },
    disableStudentOrdering: (state, action) => {
        state.studentOrdering = false
    },
    enableGrowth: (state) => {
      state.growth = true
    },
    disableGrowth: (state) => {
      state.growth = false
    },
    enableUncertainty: (state) => {
      state.uncertainty = true
    },
    disableUncertainty: (state) => {
      state.uncertainty = false
    },
    enableGradeRange: (state) => {
      state.graderange = true
    },
    disableGradeRange: (state) => {
      state.graderange = false
    },
    enableStudentView: (state) => {
      state.studentView = true
      state.itemDisplay = ""
    },
    disableStudentView: (state) => {
      state.studentView = false
      state.align = false
      state.itemDisplay = ""
      state.growth = false
      state.graderange = false
    },
    enableAlign: (state) => {
      state.align = true
    },
    disableAlign: (state) => {
      state.align = false
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  switchView, toggleItemView, enableGrowth, enableUncertainty,
  disableGrowth, disableUncertainty, enableGradeRange, disableGradeRange,
  enableStudentView, disableStudentView, enableAlign, disableAlign, enableStudentOrdering,
  disableStudentOrdering
} = stateSlice.actions

export default stateSlice.reducer
