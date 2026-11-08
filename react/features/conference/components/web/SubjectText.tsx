import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { getConferenceName } from '../../../base/conference/functions';
import Tooltip from '../../../base/tooltip/components/Tooltip';

const useStyles = makeStyles()(theme => {
    return {
        container: {
            ...theme.typography.bodyLongRegular,
            color: theme.palette.conferenceSubjectText,
            padding: '2px 16px',
            backgroundColor: 'rgba(24, 24, 24, 0.55)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: 'inset 1px 1px 0 0 rgba(255, 255, 255, 0.10), inset 0 -1px 0 0 rgba(255, 255, 255, 0.10)',
            fontWeight: 600,
            maxWidth: '324px',
            boxSizing: 'border-box',
            height: '28px',
            borderRadius: '14px 0 0 14px',
            marginLeft: '2px',

            '@media (max-width: 300px)': {
                display: 'none'
            }
        },
        content: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }
    };
});

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const SubjectText = () => {
    const subject = useSelector(getConferenceName);
    const { classes } = useStyles();

    return (
        <Tooltip
            content = { subject }
            position = 'bottom'>
            <div className = { classes.container }>
                <div className = { clsx('subject-text--content', classes.content) }>{subject}</div>
            </div>
        </Tooltip>
    );
};

export default SubjectText;
