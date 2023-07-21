import {Button, Grid, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {selectedFieldsSelector} from '../../model/selectors.ts';
import {
  modAction,
  updateModificationAction
} from '../../model/slices/currantFieldModification.ts';

export default function ActionsList() {
  const selectedFields = useSelector(selectedFieldsSelector);
  const dispatch = useDispatch()

  const MAIN_ACTIONS = [
    {
      action: modAction.SWAP_FOR_CUSTOM,
      uiName: 'Change field value for custom value'
    },
    {
      action: modAction.SWAP_WITH_ANOTHER_FIELD,
      uiName: 'Change value for another field value'
    },
  ]

  const handleAction = (action: modAction) => {
    dispatch(updateModificationAction({actionType: action}))
  }

  return (
    <Grid container sx={{
      padding: '8px',
      backgroundColor: '#242424',
    }}>
        <Grid container flexDirection={'column'}>
          <Typography variant={'h5'} sx={{
            marginTop: '24px',
            padding: '4px 12px',
            borderRadius: '8px',
            background: '#333232'
          }}>
            Please, choose action
          </Typography>
          {MAIN_ACTIONS.map(({action,uiName}) => (
            <Grid item sx={{marginTop: '16px'}}>
              <Button variant={'outlined'} onClick={() => handleAction(action)}>{uiName}</Button>
            </Grid>
          ))}
        </Grid>
    </Grid>
  )
}