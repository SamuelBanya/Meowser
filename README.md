
# Table of Contents

1.  [Link To Project](#orgf3c6186)
2.  [Meowser](#org1c65728)
3.  [Goals](#orgcc99aac)
4.  [Installation](#org7b970dc)
5.  [References](#orgd8cc827)


<a id="orgf3c6186"></a>

# Link To Project

-   [Meowser](./meowser.html)


<a id="org1c65728"></a>

# Meowser

This is a web app that allows a user to select a cat breed that was scraped from Wikipedia's list of cat breeds, and then an image of that breed, the related Wikipedia article, or a random fact about cats in general.


<a id="orgcc99aac"></a>

# Goals

The main goals of this project include the following:

1.  Allow the user to select a cat breed from a 'select' element

2.  Allow the user to then a obtain related image of the cat breed.

3.  Allow the user to view the related Wikipedia article.

4.  Allow the user to obtain a random cat fact which is displayed at the bottom of the page.


<a id="org7b970dc"></a>

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


<a id="orgd8cc827"></a>

# References

Image credits:

-   <https://en.wikipedia.org/wiki/List_of_cat_breeds>
