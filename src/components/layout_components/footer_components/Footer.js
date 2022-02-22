import React, { Component } from 'react'
import qcsLogo from './qcs_logo.png'
export default class Footer extends Component {
    render() {
        return (
            <>
               <footer className="footer">
                    <div className="row align-items-center justify-content-xl-between">
                        <div className="col-xl-6">
                            <div className="copyright text-center text-xl-left text-muted">
                                <p className="text-sm font-weight-500">Copyright 2020 © All Rights Reserved. <a data-toggle="tooltip" title="" href="#" target="_blank" data-original-title="Hardwarechacha">Hardwarechacha</a></p>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <p className="float-right text-sm font-weight-500" align="right">Power by
                            <a data-toggle="tooltip" data-placement="top" title="Hardwarechacha" target="_blank" data-original-title="Hardwarechacha"> Hardwarechacha</a>
                            </p>
                        </div>
                    </div>
                </footer> 
            </>
        )
    }
}
