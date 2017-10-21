/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have defined URLs', function() {
                allFeeds.forEach(function(feed) {
                    expect(feed).toBeDefined();
                    expect(feed.url).toBeDefined();
                    expect(feed.url.length).not.toBe(0);
                });
         });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have defined names', function() {
                allFeeds.forEach(function(feed) {
                    expect(feed).toBeDefined();
                    expect(feed.name).toBeDefined();
                    expect(feed.name.length).not.toBe(0);
                });
         });
    });


    /* This is a new test suite named "The menu" */
    describe('The menu', function() {
        /* This is a test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function() {
                var bodyHidden = $(document.body).hasClass("menu-hidden");
                expect(bodyHidden).toBe(true);
          });
         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility when clicked', function() {
               $('.menu-icon-link').click();
             var bodyHidden = $(document.body).hasClass("menu-hidden");
                expect(bodyHidden).toBe(false);
                 
               $('.menu-icon-link').click();            
                bodyHidden = $(document.body).hasClass("menu-hidden");
                expect(bodyHidden).toBe(true);
         });
    });


    /* This is a new test suite named "Initial Entries" */
    describe('Intial Entries', function() {
        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);       
        });

         it ('should load one feed', function() {
            var container = $('.feed');
            expect(container.length).toBeGreaterThan(0);
            var entry = container.find(".entry");
            expect(entry.length).toBeGreaterThan(0);
         });
    });
    /* This is a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         var oldContainerHTML, newContainerHTML;

         beforeEach(function(done) {
            loadFeed(0, function() {
                    oldContainerHTML = $(".feed").html();
                    loadFeed(1, function() {
                        newContainerHTML = $(".feed").html();
                        done();
                    });
                });
            });         

        it ('feed content should change when selection changed', function() {
            expect(oldContainerHTML.length).toBeGreaterThan(0); 
            expect(newContainerHTML.length).toBeGreaterThan(0); 
            expect(newContainerHTML).not.toBe(oldContainerHTML);
         });
    });
});