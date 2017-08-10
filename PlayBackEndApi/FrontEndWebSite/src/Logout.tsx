import * as React from "react";
import * as ReactDOM from "react-dom";
import { hashHistory  } from 'react-router'
import { OkDialog } from "./components/OkDialog";
import { YesNoDialog } from "./components/YesNoDialog";
import { AuthService } from "./services/AuthService";

import 'bootstrap/dist/css/bootstrap.css';
import
{
    Well,
    Grid,
    Row,
    Col,
    ButtonInput
} from "react-bootstrap";

export interface LogoutState {
    okDialogOpen: boolean;
    okDialogKey: number;
    okDialogHeaderText: string;
    okDialogBodyText: string;
}

export class Logout extends React.Component<undefined, LogoutState> {

    private _authService: AuthService;

    constructor(props: any) {
        super(props);
        console.log(props);
        this._authService = props.route.authService;
        if (!this._authService.isAuthenticated()) {
            hashHistory.push('/');
        }

        this.state = {
            okDialogHeaderText: '',
            okDialogBodyText: '',
            okDialogOpen: false,
            okDialogKey: 0
        };
    }

    render() {
        return (
            <Well className="outer-well">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <h4><span>YOU ARE CURRENTLY LOGGED IN AS [{this._authService.userName()}]</span></h4>
                            <span><h6>Click the button to logout</h6></span>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <span>
                            <YesNoDialog
                                theId="logoutBtn"
                                launchButtonText="Logout"
                                yesCallBack={this._logoutYesCallBack}
                                noCallBack={this._logoutNoCallBack}
                                headerText="Cancel the job"/>

                            <OkDialog
                                open= {this.state.okDialogOpen}
                                okCallBack= {this._okDialogCallBack}
                                headerText={this.state.okDialogHeaderText}
                                bodyText={this.state.okDialogBodyText}
                                key={this.state.okDialogKey}/>
                        </span>
                    </Row>
                </Grid>
            </Well>
        )
    }

    _okDialogCallBack = () => {
        this.setState(
            {
                okDialogOpen: false
            });
    }

     _logoutYesCallBack = () => {
         this._authService.clearUser();
         this.setState(
             {
                 okDialogHeaderText: 'Logout',
                 okDialogBodyText: 'You have been logged out',
                 okDialogOpen: true,
                 okDialogKey: Math.random()
             });
     }

     _logoutNoCallBack = () => {
     }
}

