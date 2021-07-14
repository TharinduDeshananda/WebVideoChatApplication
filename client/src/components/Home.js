import { Grid, Typography } from '@material-ui/core';
import StepCard from './StepsCard';
import react from 'react';

export default function Home(props){


    return <Grid container direction='column' spacing={2}>
        <Grid item>
            <Typography variant="h3">Home Tab</Typography>
            
        </Grid>
        <Grid sm={12} item container direction='row' justifyContent='center'>
            <Grid sm={1} item></Grid>
            <Grid item container spacing={2} sm={10} xs={12}>
                <Grid item><StepCard imgurl='room1.png' step={'Create a Room'} stepDesc={'Create Room'}/></Grid>
                <Grid item><StepCard imgurl='room2.png' step={'Invite Others'} stepDesc={'Invite Others'}/></Grid>
                <Grid item><StepCard imgurl='room3.png' step={'Join Session'} stepDesc={'Join Session by Using ID'}/></Grid>
                
            </Grid>
            <Grid sm={1} item></Grid>
        </Grid>

    </Grid>;
}