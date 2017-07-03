
//object to hold top level bio data
 var bio = {
    "name": "Uthra Ramaswamy",
    "role": "Web Developer",
    "contacts": {
        "mobile": "201-***-1555",
        "email" : "uramaswamy@yearup.org",
        "github": "https://github.com/UT-24",
        "twitter": "@u_cat",
        "location": "Atlanta, GA"
    },
    "welcomeMessage": "Hope you enjoy viewing my resume!",
    "skills": ['Programming', 'Teaching', 'Curriculum Design', 'Project Management'],
    "biopic": "images/LinkedIn.jpg",
    display: function()
    {
        var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
        $("#header").prepend(formattedRole);

        var formattedName = HTMLheaderName.replace("%data%", bio.name);
        $("#header").prepend(formattedName);

        var formattedMobile = HTMLmobile.replace("%data%", bio.contacts["mobile"]);
        $("#topContacts").append(formattedMobile);

        var formattedEmail = HTMLemail.replace("%data%", bio.contacts["email"]);
        $("#topContacts").append(formattedEmail);

        var formattedGithub = HTMLgithub.replace("%data%", bio.contacts["github"]);
        $("#topContacts").append(formattedGithub);

        var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts["twitter"]);
        $("#topContacts").append(formattedTwitter);

        var formattedLocation = HTMLlocation.replace("%data%", bio.contacts["location"]);
        $("#topContacts").append(formattedLocation);

        var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);
        $("#header").append(formattedBioPic);

        var formattedWelcomeMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
        $("#header").append(formattedWelcomeMessage);

        if (bio.skills.length > 0)
        {
            $("#header").append(HTMLskillsStart);
            bio.skills.forEach(function(element)
            {
                var formattedSkill = HTMLskills.replace("%data%", element);
                $("#header").append(formattedSkill);
            });
        }
    }
 };

//object to hold specifics about previous work experience
  var work = {
    "jobs" : [
    {
        "employer" : "Year Up",
        "title" : "IT Instructor II",
        "dates" : "Apr 2016 - current",
        "location" : "Atlanta, GA",
        "description" : "Instructed courses in HTML, CSS, JavaScript, Databases, Advanced Excel, Quality Assurance and Software Testing, and Computer Applications. Developed curriculum. Coached students. Worked on stretch projects for Year Up National to revamp the Quality Assurance curriculum, and improve middle management processes, and in the process earned a Diploma in the Emerging Leaders Program."
    },
    {
        "employer" : "Year Up",
        "title" : "IT Instructor",
        "dates" : "Jan 2015 - Apr 2016",
        "location" : "Atlanta, GA",
        "description" : "Designed and developed the Software Development Track for Year Up Atlanta. Instructed courses in Java, Databases, Advanced Excel, Quality Assurance and Software Testing, and Computer Applications. Developed curriculum. Coached students. Worked on stretch projects such as serving on the Women's group in Atlanta and developing assessments for entry into the Software Development Track during admissions."
    },
    {
        "employer" : "Goldman Sachs",
        "title" : "Vice President",
        "dates" : "Oct 2012 - Dec 2014",
        "location" : "New York, NY",
        "description" : "Designed and developed framework to build applications in .NET, managed projects, supported deployed applications, assisted in interviewing and hiring, served on the Securities Division Women In Technology Committee."
    },
    {
        "employer" : "Goldman Sachs",
        "title" : "Senior Analyst",
        "dates" : "Oct 2005 - Oct 2012",
        "location" : "New York, NY",
        "description" : "Designed and developed framework to build applications in .NET, managed projects, supported deployed applications."
    },
    {
        "employer" : "Goldman Sachs",
        "title" : "Analyst",
        "dates" : "Oct 2004 - Oct 2005",
        "location" : "New York, NY",
        "description" : "Developed framework to build applications in .NET, supported deployed applications."
    }
    ],
    display: function()
    {
        var jobs = work.jobs;

        for (var i = 0; i < jobs.length; i++)
        {
            $("#workExperience").append(HTMLworkStart);

            var formattedEmployer = HTMLworkEmployer.replace("%data%", jobs[i].employer);
            var formattedTitle = HTMLworkTitle.replace("%data%", jobs[i].title);
            var formattedWorkDetails = formattedEmployer + formattedTitle;
            var formattedWorkDates = HTMLworkDates.replace("%data%", jobs[i].dates);
            var formattedWorkLocation = HTMLworkLocation.replace("%data%", jobs[i].location);
            var formattedWorkDescription = HTMLworkDescription.replace("%data%", jobs[i].description);

            $(".work-entry:last").append(formattedWorkDetails);
            $(".work-entry:last").append(formattedWorkDates);
            $(".work-entry:last").append(formattedWorkLocation);
            $(".work-entry:last").append(formattedWorkDescription);
        }
    }
};

//object to hold information about educational background
var education =
{
  "schools": [
    {
        "name" : "Pennsylvania State University",
        "location" : "State College, PA",
        "degree" : "Master of Science",
        "majors" : ["Computer Science and Engineering"],
        "dates" : "Aug 2002 - Aug 2004",
        "url" : "http://www.psu.edu/"

    },
    {
        "name" : "Birla Institute of Technology and Science",
        "location" : "Pilani, Rajasthan",
        "degree" : "Bachelor of Engineering (Honors)",
        "majors" : ["Computer Science"],
        "dates" : "Sep 1998 - Jun 2002",
        "url" : "http://www.bits-pilani.ac.in/",
    }
    ],
  "onlineCourses": [
    {
        "title": "Front-End Web Developer Nanodegree",
        "school": "Udacity",
        "dates": "Feb 2017 - current",
        "url": "http://www.udacity.com/"
    }
    ],
    display: function()
    {
        for (var i = 0; i < this.schools.length; i++)
        {
            $("#education").append(HTMLschoolStart);

            var formattedSchoolName = HTMLschoolName.replace("%data%", this.schools[i].name);
            var formattedDegree = HTMLschoolDegree.replace("%data%", this.schools[i].degree);
            var formattedDegreeDetails = formattedSchoolName + formattedDegree;
            formattedDegreeDetails = formattedDegreeDetails.replace("#", this.schools[i].url)
            var formattedSchoolDates = HTMLschoolDates.replace("%data%", this.schools[i].dates);
            var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", this.schools[i].location);
            var formattedMajor = HTMLschoolMajor.replace("%data%", this.schools[i].majors);
            $(".education-entry:last").append(formattedDegreeDetails);
            $(".education-entry:last").append(formattedSchoolDates);
            $(".education-entry:last").append(formattedSchoolLocation);
            $(".education-entry:last").append(formattedMajor);
        }

        $("#education").append(HTMLonlineClasses);

        for (var i = 0; i < this.onlineCourses.length; i++)
        {
            $("#education").append(HTMLschoolStart);
            var formattedTitle = HTMLonlineTitle.replace("%data%", this.onlineCourses[i].title);
            var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", this.onlineCourses[i].school);
            var formattedOnlineCourseDetails = formattedTitle + formattedOnlineSchool;
            formattedOnlineCourseDetails = formattedOnlineCourseDetails.replace("#", this.onlineCourses[i].url);
            var formattedOnlineSchoolDates = HTMLonlineDates.replace("%data%", this.onlineCourses[i].dates);
            var formattedURL = HTMLonlineURL.replace("%data%", this.onlineCourses[i].url);
            $(".education-entry:last").append(formattedOnlineCourseDetails);
            $(".education-entry:last").append(formattedOnlineSchoolDates);
            $(".education-entry:last").append(formattedURL);
        }
    }
};

//object to hold information about projects completed on Udacity
var projectDetails = {
projects: [
{
    "title": "Mockup to Article",
    "dates": "Feb 2017-Mar 2017",
    "description": "Converted a mock up of a web page into an HTML page. Used tags for strike-throughs, super-scripts, images, links, horizontal rules, emphasis, bold, paragraphs and headings. First Udacity project to demonstrate HTML understanding.",
    "images": ["images/mockup.jpg"]
},
{
    "title": "Animal Trading Cards",
    "dates": "Mar 2017-Apr 2017",
    "description": "Used CSS to create and format an animal trading card. Demonstrated skills by using borders, padding, margin, font styles etc. Second Udacity project to demonstrate CSS skills.",
    "images": ["images/animalTradingCard.jpg"]
},
{
    "title": "Portfolio",
    "dates": "Apr 2017-May 2017",
    "description": "Created a portfolio page using responsive design. Learned how to leverage bootstrap and media queries to design a responsive webpage. Third Udacity project to demonstrate combination of HTML and CSS skills.",
    "images": ["images/portfolio.jpg"]
}
],
display: function()
{
    for (var i = 0; i < this.projects.length; i++)
    {
        $("#projects").append(HTMLprojectStart);

        var formattedTitle = HTMLprojectTitle.replace("%data%", this.projects[i].title);
        var formattedProjectDates = HTMLprojectDates.replace("%data%", this.projects[i].dates);
        var formattedProjectDescription = HTMLprojectDescription.replace("%data%", this.projects[i].description);
        $(".project-entry:last").append(formattedTitle);
        $(".project-entry:last").append(formattedProjectDates);
        $(".project-entry:last").append(formattedProjectDescription);

        for (var j = 0; j < this.projects[i].images.length; j++)
        {
            var formattedProjectImage = HTMLprojectImage.replace("%data%", this.projects[i].images[j]);
            $(".project-entry:last").append(formattedProjectImage);
        }
     }
   }
};

function setUpMap()
{
    $("#mapDiv").append(googleMap);
}

/*function locationizer(work)
{
    var workLocations = [];

    for (var i = 0; i < work.jobs.length; i++)
    {
        workLocations.push(work.jobs[i].location);
    }

    return workLocations;
}

console.log(locationizer(work));
*/

//adds button to internationalize name
function setUpInternationalizeName()
{
    $("#main").append(internationalizeButton);
}

//makes name internationalized
function inName(name)
{
    var names = name.split(" ");
    names[1] = names[1].toUpperCase();
    var internationalizedName = names.join(" ");
    return internationalizedName;
}

bio.display();
work.display();
education.display();
projectDetails.display();
setUpMap();
setUpInternationalizeName();

//jquery click events below
$(document).ready(function()
{
    //send email when someone clicks on "Let's Connect" in the resume
    $("#lets-connect").click(function()
    {
         var email = bio.contacts["email"];
         var subject = bio.name + ": About your resume";
         var emailBody = "Dear " + bio.name;
         window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;
    });

    //collapse work information when heading is clicked
     $("#workExperience h2").click(function()
    {
         $(".work-entry").toggle();
    });

    //collapse project information when heading is clicked
     $("#projects h2").click(function()
    {
         $(".project-entry").toggle();
    });

     //collapse education information when heading is clicked
     $("#education h2").click(function()
    {
         $(".education-entry").toggle();
    });
});