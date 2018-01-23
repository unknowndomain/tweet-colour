# Tweet Colour
Utilises Wikipedia's colour lists to make a Twitter bot that is responsive to colour names and sends out the result via ArtNet to a DMX device.

## utilities/colour.js

You can use this utility to clean up a copy and pasted list of colours from the Wikipedia site:

1. [A-F](https://en.wikipedia.org/wiki/List_of_colors:_A%E2%80%93F)
1. [G-M](https://en.wikipedia.org/wiki/List_of_colors:_G%E2%80%93M)
1. [N-Z](https://en.wikipedia.org/wiki/List_of_colors:_N%E2%80%93Z)

When copying and pasting the table the table columns usually become tabs, the RegEx in this script check that they match a pattern where there are no special characters and only includes these lines. Additionally the script only captures the colours name and hex value.

You should be able to compile copy and pasted lists from these three pages and get an updated list of colours to replace colours.csv should that be necessary.
