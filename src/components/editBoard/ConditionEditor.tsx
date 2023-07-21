import {Button, Grid, Typography} from '@mui/material';
import {useDispatch} from 'react-redux';
import {ModConditions, updateModificationCondition,} from '../../model/slices/currantFieldModification.ts';

export default function ConditionEditor() {
  const dispatch = useDispatch()

  const MAIN_CONDITIONS = [
    {
      action: ModConditions.IF_ANOTHER_FIELD_EQUAL,
      uiName: 'If another field equal'
    },
    {
      action: ModConditions.IF_THIS_VALUE_EQUAL,
      uiName: 'If this field equal'
    },
    {
      action: ModConditions.SKIP,
      uiName: 'Skip condition'
    },
  ]

  const handleAction = (action: ModConditions) => {
    if(action === ModConditions.SKIP) {
      dispatch(updateModificationCondition({skip: true}))
    } else {
      dispatch(updateModificationCondition({conditionType: action}))
    }
  }

  return (
    <Grid container sx={{
      marginTop: '32px',
      padding: '8px',
      backgroundColor: '#242424',
    }}>
      <Grid container flexDirection={'column'} gap={'8px'} alignItems={'flexStart'}>
        <Typography variant={'h5'} sx={{
          marginTop: '24px',
          padding: '4px 12px',
          borderRadius: '8px',
          background: '#333232'
        }}>
          Please, choose condition
        </Typography>
        {MAIN_CONDITIONS.map(({action,uiName}) => (
          <Grid item>
            <Button variant='outlined' onClick={() => handleAction(action)}>
              {uiName}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}