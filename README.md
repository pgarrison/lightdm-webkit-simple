## A minimalist LightDM Webkit greeter theme, based on lightdm-webkit-google

This is a theme for LightDM Webkit (`lightdm-webkit-greeter`).

It's designed for single-user machines and inspired by i3lock. If there's only one user, it doesn't even show any prompts.

It borrows the shutdown/restart/clock at the bottom (and most of the code) from lightdm-webkit-google.

### Features

~~I created this for use on Arch Linux on my HP Chromebook 11,~~ so it only has the basic features of:

- Selecting an available user from a dropdown (if there's more than one)
- Entering their password
- ~~Seeing their profile picture~~
- Restarting the computer
- Shutting the computer down
- A clock!

### How to install

Instructions will differ for every platform, but I can tell you how to install it on Arch Linux:

1. Install and enable `lightdm` and `lightdm-webkit-greeter`
2. In the terminal, `cd` to `/usr/share/lightdm-webkit/themes/`
3. Clone this repository here, it should create a folder called `lightdm-webkit-google`
4. Enable the theme in your `/etc/lightdm/lightdm-webkit-greeter.conf`

### License

This work is free. You can redistribute it and/or modify it under the terms of the WTFPL (Do What The Fuck You Want To Public License), Version 2, as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
