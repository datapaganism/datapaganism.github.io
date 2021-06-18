---
title: Building a custom keyboard - 01 - designing a layout
header: designing a layout for a custom keyboard
description: Rationale for my keyboard design.
permalink: /blog/keyboard-log/01
layout: post
author: datapagan
---


# The preamble

This is that part in online recipes where they make you sit through someones entire life story before getting to the ingredients.

Custom keyboards are an interesting topic, there is a lot of choice to be had in building and making one.

Earlier this year I made my own keyboard, a Preonic design but one that is split, I like the concept of a split keyboard as I found it to a lot more comfortable that cramping my hands together over a conventional keyboard, while I liked the concept of an ortholinear design but I would say a modified staggered layout would be optimal since I wouldn't need to relearn a new layout.

My biggest problem with the Preonic design is that you need to hit key combos for symbols like -+={}[], when when writing code this simply won't do.

So I decided to look into what already exists on the market for alternatives.

The [UHK / Ultimate Hacking Keyboard](https://ultimatehackingkeyboard.com/), is a very nice keyboard, it's split, normal-ish layout and looks cool. You don't even notice the fact that one side is bigger than the other.

But there are 2 things I don't like,
* No function keys | function keys are cool, not just for quick saving and ALT-F4, have their uses in debugging as well.
* No arrow key cluster | I like having arrow keys for cursor navigation, web page navigation and video controls.

75% Keyboards, Now these are more my style, you get everything but the number pad which saves a lot of space but you get the same functionality as an ANSI 104 with a smaller footprint.

But again there is something I don't like,
* This design has keys that are quite redundant (to me) namely Pause, PageUp, PageDown, ScrollLock, Home, End, and who could forget Insert.

My design for a layout would take the ideas of the styles but incorporate changes to the designs to create my "ultimate" keyboard.

## The Design Criteria
* As close to an ANSI layout as possible | it's what I like even though I live in the UK.
* Have F-Keys
* Have Arrow Keys
* Get rid of keys I don't need
* Don't lose functionality over a normal keyboard | recreate keys through shortcuts.
* Design thats symmetrical-ish enough to look okay to be split.

# The Layout

Okay so we have a criteria and now we need a design, [Keyboard Layout Editor](http://www.keyboard-layout-editor.com/) is a fantastic tool that has so many applications, I started with an ANSI 104 layout and began trimming to what I want, but I quickly realised an issue.
We can put an arrow key cluster in the bottom right side and split the shift into two keys but the left side of the right shift key would be sized to be under 1 unit (1u), I wasn't too sure of what to do but I decided to compromise by taking the left shift which is 2.25u and reducing it to 2u, and also moving that entire row over to the left by 0.25u, this creates space for the right shift to have a 1u key but they layout shift makes it nonstandard.

I went on work around this issue by designing a few more layouts, more inspired by the UHK but then after a few weeks of on and off designing with KLE I ended up recreating my original design. I realised that slightly shifting the layout isn't a big deal since all laptop keyboards are slightly funny anyways but we get used to them just fine.

Also after I came up with this design, while I was looking at some keycaps I found a very similar design of a 60% [keyboard](https://aaronvb.com/articles/60-percent-keyboard) with an arrow cluster that also shifted the row over to the left. Guess great minds think alike and my idea has already been proven.

Okay so now as a result of this, we have a 2u left shift and a 1u right shift since I realised I exclusively use right shift to type out '?'.

The lowest key row will see massive changes that may come back to haunt me in the future.
I don't need 1.25u modifier keys, the Preonic showed me that all keys can be 1u without a problem. so we will make all keys that aren't space 1u.

The keyboard is 15u wide, 3u is taken up by the left side modifier keys, 3 more units are taken up by the bottom part of an arrow key cluster, we can give 2u away to right ALT and CTRL and that will leave us 7u for space. I went against the idea of adding two more keys as the space would become only 5u wide and that just doesn't look too good in my opinion.
7u spaces exist in the wild so its not a problem however if we want to split the keyboard then we get 2x 3.5u keys which are completely non standard obviously. I will need to create my own 3.5u keycaps and 3u stabilisers for this keyboard, this will limit the amount of keycaps sets you can use for this keyboard to 0, meaning I will have to make my entire set custom especially with a 2u and 1u shift keys.

On the right side of the up arrow we can place FN, and to bring back the functionality of PageUp, PageDown, Home and End, I think the best solution is to map them to the arrow key since they can be mapped in a logical order.
* UP -> PageUp
* DOWN -> PageDown
* LEFT -> Home
* RIGHT -> End

Since the gap between the F-Keys will be removed, that leaves us with two units to do whatever we want, I am going to place two keys, A PrintScreen since this key I use daily with Windows 10's Snip & Sketch functionality and also Delete.

The opposite of deleting is inserting (maybe?) so I will use FN + Delete to trigger Insert.

This leaves us with ScrollLock and Pause/Break and we have the functionality of 75% recreated but these I will have to figure out in the future since they aren't worth my time.