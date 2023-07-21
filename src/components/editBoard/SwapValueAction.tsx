import {Button, Grid, Typography} from '@mui/material';
import {useDispatch} from 'react-redux';
import {
  updateModificationAction
} from '../../model/slices/currantFieldModification.ts';


export default function SwapValueAction() {
  const dispatch = useDispatch()

  const handleAction = () => {
    dispatch(updateModificationAction({actionType: null}))
  }


  return (
      <Grid container justifyContent={'center'}>
        <Typography variant={'h5'} sx={{
          marginTop: '24px',
          padding: '4px 12px',
          borderRadius: '8px',
          background: '#333232'
        }}>
          Please, selected second field

          <Grid>
            <Button variant={'outlined'} onClick={handleAction}>
              Choose another action
            </Button>
          </Grid>
        </Typography>
      </Grid>
  )
}