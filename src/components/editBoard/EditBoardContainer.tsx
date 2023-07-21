import {Grid, Typography} from '@mui/material';
import {useSelector} from 'react-redux';

import {
  currentStageSelector,
  selectedActionSelector,
  selectedConditionSelector,
  selectedFieldsSelector
} from '../../model/selectors.ts';

import ActionsList from './ActionsList.tsx';
import SwapValueAction from './SwapValueAction.tsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import CustomFieldValue from './CustomFieldValue.tsx';
import {EditStages, modAction, ModConditions} from '../../model/slices/currantFieldModification.ts';
import ConditionEditor from './ConditionEditor.tsx';

export default function EditBoardContainer() {
  const selectedFields = useSelector(selectedFieldsSelector);
  const selectedAction = useSelector(selectedActionSelector);
  const {conditionType} = useSelector(selectedConditionSelector);
  const currentStage = useSelector(currentStageSelector);

  const isSelectedExist = !!selectedFields.length;
  const isActionSwapAction = selectedAction.actionType === modAction.SWAP_WITH_ANOTHER_FIELD;
  const isActionSelected = !!selectedAction.actionType;

  const isActionFullySelected = selectedAction.customValue || selectedAction.fieldValue;

  const isSelectValueCondition = conditionType &&  [ModConditions.IF_THIS_VALUE_EQUAL, ModConditions.IF_ANOTHER_FIELD_EQUAL].includes(conditionType);

  const ActionEditElement = isActionSwapAction && !conditionType ? <SwapValueAction/> : <CustomFieldValue isActionType={!(isActionFullySelected && isSelectValueCondition)}/>;
  const isShowEditElement = (isActionSelected && (selectedFields?.length < 2) && !selectedAction.customValue) || conditionType;


    return (
        <Grid container sx={{
          padding: '24px',
          borderRadius: '2px',
          height: '100%',
          backgroundColor: '#242424',
          color: '#FCFCFC !important',
          border: '1px solid #303030',
        }} flexDirection={'column'}>
          {currentStage === EditStages.START ?
              <Grid item wrap={'nowrap'} container gap={'10px'}>
                {selectedFields.map((item, index) => {
                  const isSecondField = index > 0;
                  return (
                    <>
                      {isSecondField && <ArrowBackIcon/>}
                <Typography variant={'body1'}
                            sx={{
                  padding: '4px 12px',
                  borderRadius: '8px',
                  background: '#1C1C1C'
                }}>
                  {item}
                </Typography>
                      {!isSecondField && selectedAction.customValue &&
                        <>
                        <ArrowBackIcon/>
                          <Typography variant={'body1'}
                                      sx={{
                                        padding: '4px 12px',
                                        borderRadius: '8px',
                                        background: '#1C1C1C'
                                      }}>
                            {selectedAction.customValue}
                          </Typography>
                        </>
                      }
                </>
                )})}
              </Grid>
            :
            <Typography variant={'h5'} sx={{
              padding: '4px 12px',
              borderRadius: '8px',
              margin: 'auto 0px',
              background: '#333232'
            }}>
              Please, selected some field
            </Typography>
          }
          {isSelectedExist && !isActionSelected &&
            <ActionsList/>
          }
          {isShowEditElement && ActionEditElement}
          {isActionFullySelected && <ConditionEditor/>}
        </Grid>
    )
}