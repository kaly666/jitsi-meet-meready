import React, { ReactNode, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../icons/components/Icon';
import { IconArrowDown } from '../../../icons/svg';

interface IProps {

    /**
     * Icon to display in the options section.
     */
    OptionsIcon?: Function;

    /**
     * The Label of the child element.
     */
    ariaDropDownLabel?: string;

    /**
     * Whether the options popup is open. Rendered as aria-expanded on the options button, so screen
     * readers announce its open/closed state instead of a pressed/unpressed toggle.
     */
    ariaExpanded?: boolean;

    /**
     * The Label of the current element.
     */
    ariaLabel?: string;

    /**
     * Text of the button.
     */
    children: ReactNode;

    /**
     * Text css class of the button.
     */
    className?: string;

    /**
     * If the button is disabled or not. A disabled button is also taken out of the tab order,
     * so keyboard users don't stop on a control they can't activate.
     */
    disabled?: boolean;

    /**
     * If the button has options.
     */
    hasOptions?: boolean;


    /**
     * OnClick button handler.
     */
    onClick?: (e?: React.MouseEvent) => void;

    /**
     * Click handler for options.
     */
    onOptionsClick?: (e?: React.KeyboardEvent | React.MouseEvent) => void;

    /**
     * To give a role to the icon.
     */
    role?: string;

    /**
     * To navigate with the keyboard.
     */
    tabIndex?: number;

    /**
     * TestId of the button. Can be used to locate element when testing UI.
     */
    testId?: string;

    /**
     * The type of th button: primary, secondary, text.
     */
    type: string;
}

const useStyles = makeStyles()(theme => {
    return {
        actionButton: {
            ...theme.typography.bodyLongBold,
            borderRadius: 12,
            boxSizing: 'border-box',
            color: theme.palette.actionButtonText,
            cursor: 'pointer',
            display: 'inline-block',
            fontWeight: 700,
            letterSpacing: '0.01em',
            marginBottom: '16px',
            padding: '10px 20px',
            position: 'relative' as const,
            textAlign: 'center',
            transition: 'background-color .2s ease, box-shadow .2s ease, transform .15s ease',
            width: '100%',
            border: 0,

            '&.primary': {
                background: theme.palette.prejoinActionButtonPrimary,
                boxShadow: '0 4px 14px rgba(255, 252, 4, 0.18)',
                color: theme.palette.prejoinActionButtonPrimaryText,

                '& svg': {
                    fill: theme.palette.prejoinActionButtonPrimaryText
                },

                '&:hover': {
                    backgroundColor: theme.palette.prejoinActionButtonPrimaryHover,
                    boxShadow: '0 6px 20px rgba(255, 252, 4, 0.32)',
                    transform: 'translateY(-1px)'
                },

                '&:active': {
                    transform: 'translateY(0) scale(0.98)'
                }
            },

            '&.secondary': {
                background: theme.palette.ui02,
                boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.14)',
                color: theme.palette.text01,

                '& svg': {
                    fill: theme.palette.icon01
                },

                '&:hover': {
                    backgroundColor: theme.palette.ui03,
                    boxShadow: 'inset 0 0 0 1px rgba(255, 252, 4, 0.55)',
                    transform: 'translateY(-1px)'
                },

                '&:active': {
                    transform: 'translateY(0) scale(0.98)'
                }
            },

            '&.text': {
                width: 'auto',
                fontSize: '0.875rem',
                margin: '0',
                padding: '0'
            },

            '&.disabled': {
                background: theme.palette.ui02,
                border: 0,
                boxShadow: 'none',
                color: theme.palette.text03,
                cursor: 'not-allowed',
                transform: 'none',

                '&:hover': {
                    background: theme.palette.ui02,
                    boxShadow: 'none',
                    transform: 'none'
                },

                '.icon': {
                    '& > svg': {
                        fill: theme.palette.text03
                    }
                }
            },


            [theme.breakpoints.down(400)]: {
                fontSize: '1rem',
                marginBottom: 8,
                padding: '11px 16px'
            }
        },
        options: {
            borderRadius: Number(theme.shape.borderRadius) / 2,

            // The options area sits flush with the button's right edge, so its outer corners must follow the
            // button's radius, which can be customized through the theme.
            borderTopRightRadius: 'inherit',
            borderBottomRightRadius: 'inherit',
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            position: 'absolute' as const,
            right: 0,
            top: 0,
            width: 36,

            '&:hover': {
                backgroundColor: theme.palette.prejoinActionButtonOptionsHover
            },

            '& svg': {
                pointerEvents: 'none'
            }
        }
    };
});

/**
 * Button used for pre meeting actions.
 *
 * @returns {ReactElement}
 */
function ActionButton({
    children,
    className = '',
    disabled,
    hasOptions,
    OptionsIcon = IconArrowDown,
    testId,
    type = 'primary',
    onClick,
    onOptionsClick,
    tabIndex,
    role,
    ariaExpanded,
    ariaLabel,
    ariaDropDownLabel
}: IProps) {
    const { classes, cx } = useStyles();

    const onKeyPressHandler = useCallback(e => {
        if (onClick && !disabled && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            onClick(e);
        }
    }, [ onClick, disabled ]);

    const onOptionsKeyPressHandler = useCallback(e => {
        if (onOptionsClick && !disabled && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            e.stopPropagation();
            onOptionsClick(e);
        }
    }, [ onOptionsClick, disabled ]);

    const containerClasses = cx(
        classes.actionButton,
        className && className,
        type,
        disabled && 'disabled'
    );

    return (
        <div
            aria-disabled = { disabled }
            aria-label = { ariaLabel }
            className = { containerClasses }
            data-testid = { testId ? testId : undefined }
            onClick = { disabled ? undefined : onClick }
            onKeyPress = { onKeyPressHandler }
            role = 'button'
            tabIndex = { disabled ? -1 : 0 } >
            {children}
            { hasOptions
                && <div
                    aria-disabled = { disabled }
                    aria-expanded = { ariaExpanded }
                    aria-haspopup = 'dialog'
                    aria-label = { ariaDropDownLabel }
                    className = { classes.options }
                    data-testid = 'prejoin.joinOptions'
                    onClick = { disabled ? undefined : onOptionsClick }
                    onKeyPress = { onOptionsKeyPressHandler }
                    role = { role }
                    tabIndex = { disabled ? -1 : tabIndex }>
                    <Icon
                        className = 'icon'
                        size = { 24 }
                        src = { OptionsIcon } />
                </div>
            }
        </div>
    );
}

export default ActionButton;
