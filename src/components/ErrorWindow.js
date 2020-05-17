import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/CloseSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';

/** */
export class ErrorWindow extends Component {
  /** */
  render() {
    const {
      allowClose,
      classes,
      error,
      label,
      removeWindow,
      showJsError,
      t,
      windowId,
    } = this.props;

    return (
      <Paper
        component="section"
        elevation={1}
        id={windowId}
        className={
          cn(classes.window, ns('window'))}
        aria-label={t('window', { label })}
      >
        <AppBar position="relative" color="default">
          <Toolbar
            disableGutters
            className={cn(
              classes.windowTopBarStyle,
              ns('window-top-bar'),
            )}
            variant="dense"
          >
            {allowClose && (
              <MiradorMenuButton
                aria-label={t('closeWindow')}
                className={cn(classes.button, ns('window-close'))}
                onClick={removeWindow}
              >
                <CloseIcon />
              </MiradorMenuButton>
            )}
          </Toolbar>
        </AppBar>
        {showJsError && (
          <ExpansionPanel square className={classes.alert}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              {t('jsError', { message: error.message, name: error.name })}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <pre>{ t('jsStack', { stack: error.stack }) }</pre>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
        <PluginHook error={error} />
      </Paper>
    );
  }
}

ErrorWindow.propTypes = {
  allowClose: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  error: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.string,
  removeWindow: PropTypes.func.isRequired,
  showJsError: PropTypes.bool,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

ErrorWindow.defaultProps = {
  allowClose: true,
  label: '',
  showJsError: true,
  t: key => key,
};
