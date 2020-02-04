import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const MuiTooltipButton = ({
  children,
  title,
  placement,
  onClick,
  className,
  containerClassName,
  routeLink,
  destination,
  disabled
}) => {
  return (
    <Tooltip
      title={title}
      placement={placement}
      className={containerClassName}
      component={routeLink}
      to={destination}
    >
      <IconButton onClick={onClick} className={className} disabled={disabled}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default MuiTooltipButton;
