---
title: Launching modded Bethesda games from Steam
header: Launching modded Bethesda games from Steam
description: A guide on how to launch any exe from Steam.
permalink: /blog/guides/launching-modded-game-steam
layout: post
author: datapagan
---


Steam obviously offers a lot of convenience by having the ability of launching all of the games from it.

Bethesda games are best experienced modded, in some way or another, whether fixing the bugs or adding new content.

Some tools like *[Wabbajack](https://www.wabbajack.org/#/)* offer to mod your game for you by picking from a list of pre-compiled mod packs, someone else has already worked out all the crashing issues before you.

Problem is that you lose the convenience from launching a game with one click, in my case I need to open *[Mod Organizer 2](https://www.modorganizer.org/)* then launch the game from there, if only there was a simple way to unite everything together...

Well there is, it's slightly *janky* but it works well enough to be worth considering.

This guide will use Fallout New Vegas as its example, using the Viva New Vegas modpack.

You will need:
* The ability to use the file explorer, you will need to enable `File name extensions` in the `View` tab.
* Windows, but I bet that proton/wine installs could use this too, in some way.
* *[Slimm Bat to Exe](https://misterslimm.wordpress.com/slimm-solutions/)*, a tool to create an exe from a bat file.
* Shortcut to the modded game.

If you didn't already know (not sure how that is possible), Steam always launches Fallout New Vegas (and others) using a special launcher where you change your settings and stuff, it gets quite annoying after the first time,
but if you were to simply rename an exe to the specific exe of the launcher, then Steam will open the exe you want. This is the main point of the tutorial.

1. Once you have *Mod Organizer 2* set up the way you want, open it and click on the `Shortcut` dropdown menu and select the `Desktop` option. This places a shortcut that runs *MO2* and then *FNV*.

2. Right click on the shortcut on your desktop, select `Properties`, and copy the `Target` path to a notepad program.

3. Save the text document with the extension `.bat`, The file you have just made is an executable script that runs the same arguments as the shortcut.

4. Using *Slimm Bat to Exe*, select `Windowless Express` and select the `.bat` file you just saved.

5. Now you have an `.exe` in the same directory as the `.bat` file, copy this to the your game folder.

6. In my case, the `.exe` name for *Fallout New Vegas* we need to change is `FalloutNVLauncher.exe`, rename the file and change to `FalloutNVLauncher.exe.original`, this doesn't actually change the file but how the OS reads it, to revert back to the original executable just remove `.original` from the name.

7. Rename the `.exe` you created to `FalloutNVLauncher.exe`, and thats it, open Steam and try to launch *NV*,
it should open *MO2* and then your modded game.

8. Enjoy, thats all to it.

I toyed with the idea of making this an image guide but it I honestly don't think its worth the bandwidth.

I am not sure if a better idea exists, this is the easiest one I could think of, I will be using this for my playthrough of Fallout 4, if I get around to it.


