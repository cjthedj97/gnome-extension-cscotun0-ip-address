'use strict';

const Main = imports.ui.main;
const Mainloop = imports.mainloop;

const St = imports.gi.St;
const PanelMenu = imports.ui.panelMenu;
const Clutter = imports.gi.Clutter;
const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;

function _get_tun0_ip() {
    // Use moreutils ifdata command to get tun0 IP v4 address
    // spawn_command_line_sync returns an array of 4 datas, where second element - [1] - is the ifdata command ouput
    // https://docs.gtk.org/glib/func.spawn_command_line_sync.html
    var command_output_bytes = GLib.spawn_command_line_sync('ifdata -pa tun0')[1]; 
    var tun0IpAddress = String(command_output_bytes);
    tun0IpAddress = tun0IpAddress.trim();
     
    return tun0IpAddress;
}

// Our PanelMenu.Button subclass
var tun0IPAddressIndicator = class tun0IPAddressIndicator extends PanelMenu.Button {

    _init() {
        // Chaining up to the super-class
        super._init(0.0, "tun0 IP Address Indicator", false);
        
        this.buttonText = new St.Label({
            text: 'Loading...',
            y_align: Clutter.ActorAlign.CENTER
        });
        this.add_child(this.buttonText);
        this._updateLabel();
    }

    _updateLabel() {
        const refreshTime = 5 // in seconds

        if (this._timeout) {
                Mainloop.source_remove(this._timeout);
                this._timeout = null;
        }
        this._timeout = Mainloop.timeout_add_seconds(refreshTime, () => {this._updateLabel();});

        this.buttonText.set_text(_get_tun0_ip());
    }

    stop() {
        if (this._timeout) {
            Mainloop.source_remove(this._timeout);
        }
        this._timeout = undefined;

        this.menu.removeAll();
    }
}

// In gnome-shell >= 3.32 this class and several others became GObject
// subclasses. We can account for this change simply by re-wrapping our
// subclass in `GObject.registerClass()`
tun0IPAddressIndicator = GObject.registerClass(
    {GTypeName: 'tun0IPAddressIndicator'},
    tun0IPAddressIndicator
);

let _indicator;

function enable() {
    _indicator = new tun0IPAddressIndicator();
    Main.panel.addToStatusArea('tun0-ip-address-indicator', _indicator);
}

function disable() {
    _indicator.stop();
    _indicator.destroy();
    _indicator = null;
}

