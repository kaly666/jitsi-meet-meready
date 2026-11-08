import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { IDisplayProps } from '../ConferenceTimer';

const useStyles = makeStyles()(theme => {
    return {
        timer: {
            ...theme.typography.labelRegular,
            color: theme.palette.action01,
            fontWeight: 700,
            padding: '6px 12px 6px 8px',
            backgroundColor: 'rgba(24, 24, 24, 0.75)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: 'inset -1px 1px 0 0 rgba(255, 255, 255, 0.10), inset 0 -1px 0 0 rgba(255, 255, 255, 0.10)',
            boxSizing: 'border-box',
            height: '28px',
            borderRadius: '0 14px 14px 0',
            marginRight: '2px',

            '@media (max-width: 300px)': {
                display: 'none'
            }
        }
    };
});

/**
 * Returns web element to be rendered.
 *
 * @returns {ReactElement}
 */
export default function ConferenceTimerDisplay({ timerValue, textStyle: _textStyle }: IDisplayProps) {
    const { classes } = useStyles();

    return (
        <span className = { classes.timer }>{ timerValue }</span>
    );
}
