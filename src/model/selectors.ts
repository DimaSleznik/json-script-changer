import {RootState} from './store.ts';

export const jsonDataSelector = (state: RootState) => state.jsonData;
export const selectedFieldsSelector = (state: RootState) => state.currantFieldModification.selectedFields;
export const selectedActionSelector = (state: RootState) => state.currantFieldModification.action;
export const selectedConditionSelector = (state: RootState) => state.currantFieldModification.condition;
export const currentStageSelector = (state: RootState) => state.currantFieldModification.currentStage;
