import * as React from 'react';
import { DateTime } from 'luxon';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AssignmentIcon from '@mui/icons-material/Assignment';


import './Carousel.css'

export default function Carousel({ items }) {
  console.log(items);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = items.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return <Box sx={{
    maxWidth: 800,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }}>
    {items.length === 0 &&
      <Paper sx={{
        width: 'calc(100% - 10px)',
        height: 'calc(100% - 10px)',
        margin: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant="body2" color="text.secondary">No transactions</Typography>
      </Paper>
    }
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
      style = {{
        overflow: 'hidden',
        flexGrow: 1
      }}
    >
      {items.map((item, index) => (
        <div style={{ height: 'calc(100% - 5px)' }} key={item.id}>
          {Math.abs(activeStep - index) <= 2 ? (
            <Box sx={{
              height: '100%',
              overflow: 'hidden',
            }}>
              <Avatar sx={{
                // bgcolor: green[500],
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '-35px',
                top: 0,
                width: '60px',
                height: '60px',
              }}>
                <AssignmentIcon />
              </Avatar>
              <Card sx={{ height: 'calc(100% - 10px)', overflow: 'hidden', margin: '5px' }}>
                <CardContent sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '30px'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    {DateTime.fromSeconds(item.time).toLocaleString(DateTime.DATETIME_FULL)}
                  </Typography>
                  <Typography variant="h6" color="text.primary" sx={{ marginTop: '20px' }}>
                    {item.description}
                  </Typography>
                  <Typography color="text.primary" paragraph variant="h2" sx={{ marginTop: '30px', marginBottom: '50px' }}>
                    {item.amount/100} ₴
                  </Typography>
                  <Box sx={{
                    width: '100%'
                  }}>
                    {item.comment &&
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '7px',
                      }}>
                        <Typography variant="body2">Comment:&nbsp;&nbsp;</Typography>
                        <Typography variant="body2"><b>{item.comment}</b></Typography>
                      </Box>
                    }
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: '7px',
                    }}>
                      <Typography variant="body2">Original amount:&nbsp;&nbsp;</Typography>
                      <Typography variant="body2"><b>{item.originalAmount/100} ₴</b></Typography>
                    </Box>
                    {!!item.commissionRate &&
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '7px',
                      }}>
                        <Typography variant="body2">Commission amount:&nbsp;&nbsp;</Typography>
                        <Typography variant="body2"><b>{item.commissionRate/100} ₴</b></Typography>
                      </Box>
                    }
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: '7px',
                    }}>
                      <Typography variant="body2">Jar amount:&nbsp;&nbsp;</Typography>
                      <Typography variant="body2"><b>{item.jarAmount/100} ₴</b></Typography>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: '7px',
                    }}>
                      <Typography variant="body2">MCC:&nbsp;&nbsp;</Typography>
                      <Typography variant="body2"><b>{item.mcc}</b></Typography>
                    </Box>
                    {!!item.shortDescription &&
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '7px',
                      }}>
                        <Typography variant="body2">MCC description:&nbsp;&nbsp;</Typography>
                        <Typography variant="body2"><b>{item.shortDescription}&nbsp;–&nbsp;{item.fullDescription}</b></Typography>
                      </Box>
                    }
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ) : null}
        </div>
      ))}
    </SwipeableViews>
    <MobileStepper
      variant="progress"
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      sx={{ paddingBottom: '52px' }}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1 || items.length === 0}
        >
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0 || items.length === 0}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  </Box>
};
