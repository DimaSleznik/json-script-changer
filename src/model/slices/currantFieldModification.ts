import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export enum modAction {
  SWAP_FOR_CUSTOM = 'SWAP_FOR_CUSTOM',
  SWAP_WITH_ANOTHER_FIELD = 'SWAP_WITH_ANOTHER_FIELD'
}

export enum ModConditions {
  IF_THIS_VALUE_EQUAL = 'IF_THIS_VALUE_EQUAL',
  IF_ANOTHER_FIELD_EQUAL = 'IF_ANOTHER_FIELD_EQUAL',
  IF_ANOTHER_FIELD_EXIST = 'IF_ANOTHER_FIELD_EXIST',
  SKIP = 'SKIP'
}

export interface DataCondition {
  conditionType: ModConditions | null;
  field: string | null,
  value: string | number | null,
  condition: null,
  skip: boolean;
}

export interface Action {
  actionType: modAction | null;
  customValue: string | number | object | null;
  fieldValue: string | null;
}

export enum EditStages {
  START = 'START',
  CHOOSE_ACTION_FIELD = 'CHOOSE_ACTION_FIELD',
  CHOOSE_ACTION = 'CHOOSE_ACTION',
  WRITE_ACTION_VALUE = 'WRITE_ACTION_VALUE',
  CHOOSE_CONDITION = 'CHOOSE_CONDITION',
  WRITE_CONDITION_VALUE = 'WRITE_ACTION_VALUE',
  CHOOSE_CONDITION_FIELD = 'CHOOSE_CONDITION_FIELD'
}
export interface modificationData {
  selectedFields: string[];
  action: Action;
  condition: DataCondition;
  currentStage: EditStages;
}




const initialState: modificationData = {
  selectedFields: [],
  action: {
    actionType: null,
    customValue: null,
    fieldValue: null
  },
  condition: {
    conditionType: null,
    field: null,
    value: null,
    condition: null,
    skip: false,
  },
  currentStage: EditStages.START
}

const currantFieldModification = createSlice({
  name: 'currantFieldModification',
  initialState,
  reducers: {
    updateCurrentModification: (state, {payload}: PayloadAction<Partial<modificationData>>) => ({...state, ...payload}),
    updateModificationAction: (state, {payload}: PayloadAction<Partial<Action>>) => {
      state.action  ={...state.action, ...payload}
    },
    updateModificationCondition: (state, {payload}: PayloadAction<Partial<DataCondition>>) => {
      state.condition  ={...state.condition, ...payload}
    },
    setModificationStage: (state, {payload}: PayloadAction<EditStages>) => {
      state.currentStage  = payload
    },
  },
})


export const {
  updateCurrentModification,
  updateModificationAction,
  updateModificationCondition,
  setModificationStage
} = currantFieldModification.actions;

export default currantFieldModification.reducer;