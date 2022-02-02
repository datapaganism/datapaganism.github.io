---
title: How to diff & patch STL models.md
header: How to diff & patch STL models
description: A quick guide on how to patch STL models.
permalink: /blog/guides/stl-diff-patch
layout: post
author: datapagan
---

This is the annoying part of every recipe you try to look up, the preamble.

Say you were creating a model to sell, the model itself is your own work but you remix someone else's model as part of the assembly.
Depending on the licence you could include the remix of their work and sell it, but most likely you aren't able to, what is the solution to this problem?

Patching.

Just like patching ROMS we can provide a patch alongside our models to a person and let themselves source the model and easily modify so they can use for the required purproses.

Using the Linux shell (Windows users can install a distro through WSL2), we can quickly create a patch file and use it to modify the original STL file.

First let's create the patch, in your distro's shell (I used Ubuntu) type in 
```
diff -u <(xxd <originalFile>) <(xxd <updatedFile>) > <originalFile>.patch
```
Where *\<originalFile\>* and *\<updatedFile\>* represent the path to the respective files
This will create the patch, this is what I would include alongside with my models when I'd sell them.

To patch the original file with the diff use
```
xxd <originalFile> > <originalFile>.hex && patch <originalFile>.hex < <patchFile>  && xxd -r <originalFile>.hex > <originalFile>
rm <originalFile>.hex
```
Where *\<originalFile\>* and *\<patchFile\>* represent the path to the respective files.
This will temporarily copy and convert the STL to a hex file and then patch it using the provided patch, and then convert the hex back to STL and finally delete the temporary file.
I would tell the customer to source the model and then use those commands to convert it to the required version of the STL.

And that's it.

I have converted these to shell scripts and they are available in gist form.

*[create_stl_patch.sh](https://gist.github.com/datapaganism/b388dfb21a4d856beb7ed80be95a2ce0)*

*[patch_stl.sh](https://gist.github.com/datapaganism/b1e325695e36ebefe3b4b2482d5a58d8)*

Both contain quick instructions and how to use them, it is the same as the code above but with input parameters
