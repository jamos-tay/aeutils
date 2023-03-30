# User Documentation

- [User Documentation](#user-documentation)
  - [Using the Plugin](#using-the-plugin)
    - [Errors](#errors)
  - [Rig](#rig)

## Using the Plugin

![Plugin](img/plugin.png)

The plugin consists of separate buttons each linked to a specific script or functionality. To use a script, simply select the required properties in the timeline panel and click on the respective button.

Tips:
- You can hover over a button to see a description of what it does.
- Some scripts will require user input (usually in a specific format, such as numeric). Check each script's documentation for what input it expects.

![Pop up](img/popup.png)

- Some scripts will read a value from the Settings tab, such as the loop length, and apply different functionality based on the value. Check each script's documentation for which settings are read.
- Scripts will usually require you to select some thing(s) in the timeline before clicking the button (for example, the Anchor button will require you to select a puppet pin). You will get an error if the selection is incorrect.
- The things you need to select will differ based on the button. Hovering over a button will tell you what needs to be selected.

### Errors

If you're encountering errors:

- IMPORTANT: This plugin was intended to be used on Photoshop layers, most rigging functionality will only work on layers imported on photoshop (i.e. the layer size is the same as the composition). As such many rigging functions won't work on layers whose height and width does not match the composition.
    - Ensure that you import your .psd is imported as `Composition`, and not `Composition - Retain Layer Sizes`.

![Import comp](img/import-comp.png)

- Check that you've selected the correct properties.
- Check that you haven't accidentally selected just the property's parent. For example, if the script needs a Position property selected, you will need to select the property specifically:

![Select the correct property](img/select_property.png)

- Check that the settings and inputs are valid. Read each script's documentation for more information.

## Rig

The rig plugin contains functionality based on rigging layers together. It provides a simple rigging engine based off puppet pins and property expressions.

*IMPORTANT: This plugin was intended to be used on Photoshop layers, most rigging functionality will only work on layers imported on photoshop (i.e. the layer size is the same as the composition). As such many rigging functions won't work on layers whose height and width does not match the composition.*

### Loop Out

*Sets loopOut() on all selected properties with at least two keyframes and no expression.*

![Loop out](img/loopout.png)

Sets the all selected properties to `loopOut()`, which makes the keyframes loop endlessly. I slap this on everything.

Only affects properties that are animated (i.e. 2 or more keyframes), and does not overwrite existing expressions.

### Rig

*Rigs a layer to a puppet pin on another layer. Select a layer and a puppet pin.*

The rig function rigs a layer to a puppet pin on another layer. You can think of it as advanced parenting, where the child layer not only inherits the parent's Transform properties, but also the movement of the puppet pin:

![Rig](img/rig.gif)

This can be used as a basis for creating a simple skeleton. The Body is rigged to the Legs, the Arms and Neck to the Body and the Head to the Neck and so on.

### Link

*Links a puppet pin (child) to another puppet pin's (parent) absolute position, ignoring all parenting. Select two puppet pins on different layers.*

This forces a puppet pin to always be at the same position as a different puppet pin on a separate layer.

To use it, place two puppet pins on two layers at the same position. Then, select them both and clink 'Link', and it will ask you to confirm which is which. The child pin will be linked to the parent pin.

![Link neck to head](img/jaw-head.png)

This is handy for joining layers at multiple points, thus allowing them to feel more connected.

![Rig](img/link.gif)

The head is rigged to the neck and moves with the upper right pin. The jaw puppet pin on the neck is linked to a puppet pin placed on the head, resulting in a smoother looking connection.

*Tip: For convenience, if a puppet pin with a default name (like Puppet Pin 3) and a puppet pin with a non-default name (like Head or Jaw) is selected, the default named puppet pin will be assumed to be the child.*

### Pair Pin

*Pairs a puppet pin (child) to another puppet pin (parent) so the child pin moves with the parent. Select two puppet pins on the same layer.*

Pair pin allows for puppet pin level parenting. It forces a puppet pin (child) on a layer to move relative to a different puppet pin (parent) on the same layer. Multiple child pins can be parented to one parent pin.

![Pair pin](img/pair-pin.gif)

Additionally, the child pin can have its own animation and the movement will be stacked, much like layer parenting. 

Note: After Effects glitches out a bit if you try to move child pins that have already been parented. You have to adjust the position in the timeline, or animate the child pin first before animating. I can't find a fix.

*Tip: For convenience, if a puppet pin with a default name (like Puppet Pin 3) and a puppet pin with a non-default name (like Head or Jaw) is selected, the default named puppet pin will be assumed to be the child.*

### Stagger

*Staggers the start time of animated properties so their first keyframe starts at 0, n, 2n, 3n... etc. frames. Select multiple properties with keyframes.*

### Anchor

*Anchors a puppet pin to its current position on the composition so it does not move. Select 1 or more puppet pins.*

### Joint

*Sets up inverse kinematics on the selected puppet pins. Select 3 (Anchor, Joint, Controller) or 4 (Anchor, Joint, Inner Joint, Controller) puppet pins. Please see the user guide for more information.*

### Move Dir

*Creates a 2 keyframe loop that moves the selected item's position by a fixed amount of pixels, in a fixed direction (0 - 12, like a clock face). Select any Position property (layer Position or puppet pin Position).*

### Move Set

*Creates a 2 keyframe loop that animates the selected property's value between two given values (e.g. 10;20). Select any animatable property.*

### Swing

*Creates a 2 keyframe loop that rotates puppet pins back and forth around the layer's anchor point. The degree specifies how much to move and the stagger specifies the delay between each puppet pin's animation. Select any number of puppet pins on a layer. *

### S. Toward

*Same as swing, but the puppet pin moves toward and away from the anchor point instead of rotating around.*

### S. Offset

*Same as swing, but you can specify the start and end degrees. E.g. (0 to 12 instead of -6 to 6).*

### S. Rotate

*Same as swing, but each puppet pin will be rotated around the previous puppet pin by a specified amount. Puppet pins are ordered from bottom to top by how they're displayed on the Timeline.*

### S. Puppet

*Same as swing, but the puppet pins will be rotated around the first selected puppet pin (the bottom-most selected one in the Timeline).*

## General

### Scale

*Scales the selected keyframes by a specified amount based on the range of values covered by the keyframes. (e.g. [Rotate between 90 - 110] (scale 2x) => [Rotate between 80 - 120]). Select all keyframes of a property.*

### Loop Cmp

*Makes the current layer loop between a specified start and end time, adding a crossfade at the end which crossfades to the beginning. Select a layer (preferably a precomp with no keyframes).*

### Loop Evo

*Attempts to loop the effects of some stock After Effects plugins (i.e. sets the Evolution, Cycle Evolution and Cycle (in Revolutions) properties). Select an effect on a layer such as Fractal Noise or Turbulent Displace.*

### Clear Exp

*Clears the current expression on the selected properties.*

### Add Noise

*Adds a looping Fractal Noise layer.*

### Slider

*Given a property (or multiple properties) that has 2 keyframes, a start and an end position, links it to a slider control so the property will move from start to end as the slider moves from 0 - 1. Select any number of properties with exactly two keyframes.*

### Wiggle

*Adds a looping wiggle with the given frequency and amplitude. Select any number of properties.*

### Parallax

*Sets up fake parallax on 2D layers without using a camera. Select any number of layers. Use the X and Y properties on the new layer to control the camera, and the added slider on each layer denotes the distance from the camera. Probably don't use this.*

### Chain

*Given two parent puppet pins positioned at two corners of a rectangle, chains all other puppet pins so their X and Y position stays relative to their position in the rectangle. Select any number of puppet pins, the two bottom-most puppet pins in the Timeline will be the parents.*

### Skeleton

*Links each selected puppet pin's position to a new null object's position. Helpful for stacking position animations. Select any number of puppet pins on a single layer.*

### Stitch

*Stitches two layers together so each child layer's puppet pins are linked (same as Link button) to a puppet pin on the parent layer if they are close enough. Place puppet pins in the same locations on two layers, and select the two layers.*

### Round

*Attempts to round the corners of a position animation. The roundness is determined by the Round % variable in settings. Select any Position property's keyframes.*

### Graph Spd

*Easy ease always causes puppet pins to come to a stop at a keyframe. Bumps up the speed graph keyframes slightly so the puppet pin never has 0 speed. The minimum speed is determined by the Speed % variable in settings. Select any property's keyframes.*

## For Developers
