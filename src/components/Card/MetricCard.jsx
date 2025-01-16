import * as React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';

const MetricCard = ({
  title,
  value,
  icon: Icon,
  bgColor,
  iconColor,
  hoverBgColor,
  hoverIconColor,
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        bgcolor: bgColor,
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out', // Smooth transition for hover
        '&:hover': {
          bgcolor: hoverBgColor, // Custom hover background color
        },
      }}
    >
      <IconButton
        sx={{
          bgcolor: iconColor,
          color: 'white',
          padding: 2,
          borderRadius: 2,
          transition: 'all 0.3s ease-in-out', // Smooth transition for icon hover
          '&:hover': {
            bgcolor: hoverIconColor, // Custom hover color for the icon
          },
        }}
      >
        <Icon />
      </IconButton>
      <CardContent>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          {title}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
