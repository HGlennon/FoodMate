import React, { useState } from 'react'; 
import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, SvgIcon, Button, ButtonGroup, CardActionArea, Input, InputBase, IconButton, Menu, MenuItem  } from '@mui/material';
//import SearchIcon from '@material-ui/icons-material/Search';

export default function LoadMore() {
    return (
    <>
        <Container align='center' style={{marginBottom: '10px'}}>
            <Grid>
                <Button>
                    <Typography align='center'>
                        Load More
                    </Typography>
                </Button>
            </Grid>
        </Container>
    </>
    );
};
