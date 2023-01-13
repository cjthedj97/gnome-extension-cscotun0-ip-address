# gnome-extension-cscotun0-ip-address
This is the code built to give you you VPN IP of an anyconnect tunnel

## Impetus
I specifically made this as I was looking for an exterion that listed the IP from anyconnect VPN.

## Privacy
This extension also respects your privacy and bandwidth, as it makes absolutely zero requests to the Internet and sends zero packets to the Internet. The plugin gets its information from the output of ifdata command (moreutils package dependency) and only displays the result in the GNOME panel; this information never leaves your computer.

## Requirements
moreutils package so *ifdata* command works.

**Debian**
```sh
sudo apt install moreutils
```

**Red Hat**
```sh
sudo yum install moreutils
```

**Arch**
```sh
sudo pacman -S moreutils
```

## How it works - in detail
To get the cscotun0 IP address, internally this extension runs a shell command:
```sh
ifdata -pa cscotun0
```
The above command returns the IP address associated to your cscotun0 interface. You need first to be connected to a VPN service (using openVPN, for example).
Within the (Javascript) extension code, I am simply matching the result to show it in Gnome panel.

## Scope
**What if you want to see your WAN or LAN IP address, too ?** This is out of scope for this simple extension. This extension by design only shows your cscotun0 IP address, just as the name suggests. It is designed for everyone who only need to see their cscotun0 address in a convenient place, and with total privacy (no calls to the Internet).
If you actually want your WAN IP address or IPv6 addresses, check out this extension instead: [All IP Addresses](https://extensions.gnome.org/extension/3994/all-ip-addresses/)
If you actually want your LAN IP address, check out the extension this fork is based one instead: [LAN IP address](https://extensions.gnome.org/extension/1762/lan-ip-address/). Finally if you want an extenstion that checks the tun0 interface see [TUN0 IP address](https://github.com/AdamantisSpinae/gnome-extension-tun0-ip-address)

## Nota Bene
As it is my first Gnome extension please be understanding when repoeting bugs.
