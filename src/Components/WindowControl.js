import React, {Component} from 'react';
import Icon from "./Icon";
const remote = window.require('electron').remote;

class WindowControl extends Component {

    closeClickHandler = e => {
        const window = remote.getCurrentWindow();

        if (window.closable) {
            window.close();
        }
    };

    screenResizeHandler = e => {
        const window = remote.getCurrentWindow();

        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    };

    minimizeHandler = e => {
        const window = remote.getCurrentWindow();
        window.webContents.openDevTools();
        // if (window.minimizable) {
        //     window.minimize();
        // }
    };

    render() {
        return (
            <div className='window-control'>
                <div className="window-control__drag">
                    <div className="window-control__title">
                        Adora player
                    </div>
                </div>
                <div className="window-control__actions">
                    <div className="button btn-minimize" onClick={this.minimizeHandler}><Icon iconName='far fa-window-minimize'/></div>
                    <div className="button btn-screen-resize" onClick={this.screenResizeHandler}><Icon iconName='far fa-window-restore'/></div>
                    <div className="button btn-close" onClick={this.closeClickHandler}><Icon iconName='far fa-times'/></div>
                </div>
            </div>
        );
    }
}

export default WindowControl;