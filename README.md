
# Table of Contents

1.  [Meowser](#org8cf1807)
2.  [Goals](#org337a9b1)
3.  [Stretch Goals](#org554aeff)
4.  [Installation](#org8ffc9d6)


<a id="org8cf1807"></a>

# Meowser

This is an app that allows a user to enter a zipcode, and find cats with specific breeds in a given area

The design focus is heavily influenced by Rover.com, which is a separate website designed for pet owners looking for pet sitters.


<a id="org337a9b1"></a>

# Goals

The main goals of this project include the following:

1.  Create a mobile responsive web page using the Bootstrap CSS library with a similar layout to 'Rover.com'

2.  Use the search bar with corresponding search button to search for a pet breed by zip code

3.  Display the results in individual result cards on screen

4.  Display individual cat results as separate pins on a Google Maps <iframe>


<a id="org554aeff"></a>

# Stretch Goals

The related stretch goals for this project include:

-   The ability to filter by pet breed
-   A sign in page so that users can be remembered
-   After a user then logs in, they would be given the ability to like a pet, which would then be saved to a 'json.db' database
-   The ability for the user to be able to click a related email address to then externally open up the email address via a 'mail-to' hyperlink


<a id="org8ffc9d6"></a>

# Installation

Simply deploy the contents of this directory to the web server of your choice (ex: "Nginx", "Apache HTTP Server", etc.)

Ideally, this would be done on a Virtual Private Server (VPS) from a VPS provider ("Digital Ocean", "Vultr", "Linode", etc) running a Linux server based virtual machine (Debian, Ubuntu, etc).

Then, configure the networking entailed for your given webserver so that related 'index.html' website is presented properly.

For Nginx (After 'nginx' is installed properly):

-   An example 'nginx' config within '/etc/nginx/available-sites' is as follows:

    # Test script comment

-   You can then symlink the new 'nginx' configuration you made with this command so that it links to the 'sites-enabled' directory:

    ln -s /etc/sites-available/meowser /etc/sites-enabled/meowser

-   You will then have to configure the DNS of the website itself to then be able to have its 'AAA' record point to the desired website accordingly
-   NOTE: If this is not done, then you will have to specify the IP address and port which is not user-friendly
