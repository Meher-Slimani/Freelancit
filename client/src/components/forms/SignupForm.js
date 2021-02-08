import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Paper, Avatar, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button} from "@material-ui/core"
import AddCircleoutlineOutlibnedIcon from "@material-ui/icons/AddCircleOutlineOutlined"

const useStyles = makeStyles((theme) => ({
    paperStyle:{padding: "30px 20px", width: 300, margin:"90px auto"},
    avatarstyle:{backgroundColor: "green"},
    formControl: {
    margin: theme.spacing(1),
    marginLeft: 0,
    marginBottom: "15px",
    minWidth: 120,
  }
    }))

const SignupForm = () => {
    const classes = useStyles()
    
    return (
        <Grid>
            <Paper elevation={20} className={classes.paperStyle}>
                <Grid align="center">
                    <Avatar className={classes.avatarstyle}>
                        <AddCircleoutlineOutlibnedIcon />
                    </Avatar>
                    <h2>Sign Up</h2>
                    <Typography variant="caption">Please fill this form to create an account</Typography>
                </Grid>
                <form>
                    <TextField fullWidth mt="25px" label="First Name" />
                    <TextField fullWidth mt="25px" label="Last Name" />
                    <TextField fullWidth mt="25px" label="Phone Number" />
                    <TextField fullWidth mt="25px" label="Email" />
                    <TextField fullWidth mt="25px" label="Password" />
                    <FormControl fullWidth className={classes.formControl}>
                    <InputLabel>Status</InputLabel>
                    <Select>
                    <MenuItem value="Freelancer">Freelancer</MenuItem>
                    <MenuItem value="Freelance Seeker">Freelance Seeker</MenuItem>
                    </Select>
                    </FormControl>
                    <Button fullWidth type="submit" variant="contained" color="primary" >SIGN UP</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default SignupForm
