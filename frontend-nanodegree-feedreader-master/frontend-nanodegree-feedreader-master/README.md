# Project Overview

To run this project, open the **index.html** file in the same folder that this readme is located.

# Tests

## RSS Feeds
This section contains the following tests:
* A test that loops through each feed in the 'allFeeds' object and ensures it has a URL defined and that the URL is not empty.
* A test that loops through each feed in the 'allFeeds' object and ensures it has a name defined and that the name is not empty.

## The menu
This section contains the following tests:
* A test that ensures the menu element is hidden by default. 
* A test that ensures the menu changes visibility when the menu icon is clicked. This test has two expectations: does the menu display when clicked and does it hide when clicked again.

## Initial Entries
This section contains the following tests:
* A test that ensures when the 'loadFeed' function is called and completes its work, there is at least a single '.entry' element within the '.feed' container.

## New Feed Selection
This section contains the following tests:
* A test that ensures when a new feed is loaded by the 'loadFeed' function that the content actually changes.

