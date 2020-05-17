import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { ErrorWindow } from '../components/ErrorWindow';

/** mapStateToProps */
const mapStateToProps = (state, { windowId }) => ({
  allowClose: state.config.window.allowClose,
  showJsError: state.config.window.showJsError,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  removeWindow: () => dispatch(actions.removeWindow(windowId)),
});

/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */
const styles = theme => ({
  alert: {
    '& $icon': {
      color: theme.palette.error.main,
    },
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  button: {
    marginLeft: 'auto',
  },
  window: {
    backgroundColor: theme.palette.shades.dark,
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
    width: '100%',
  },
  windowTopBarStyle: {
    backgroundColor: theme.palette.shades.main,
    borderTop: '2px solid transparent',
    minHeight: 32,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ErrorWindow'),
);

export default enhance(ErrorWindow);
