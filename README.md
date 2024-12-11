Flippinotes

How to run:

Go to a terminal and run
git clone https://github.com/Kylie-f/FlippiNote.git

Then change directory to the cloned git repository:
cd /path/to/project/directory
(Check to see the installed files are there with ls)

Then to install the program use the following commands:
For Windows:
python -m venv .venv
.venv\Scripts\Activate.ps1

For Mac/Linux:
python3 -m venv.venv
source .venv/bin/activate

From the venv line you can install the requirements from the txt file by:
pip install -r requirements.txt

From this, the project should work out of the box, when you are trying to run the webserver locally, do:

python manage.py runserver

Then navigate to a web browser of choice, and navigate to either 127.0.0.1:8000 or localhost:8000 and you should see the server running.

Welcome to FlippiNote
A collaborative note-taking app built using Django.

About the Project
FlippiNote is a web application designed to make collaborative note-taking efficient and user-friendly. Users can securely log in, manage their notes, and collaborate with others.

Features include:

Secure user authentication
Customizable note organization
Responsive and visually appealing design

Meet the Team:
  Nate Adams: 
    Contributions:......
  Sydney Escobar: 
    Contributions:......
 Kylie Fannin: 
    Contributions: Crafted the visual design and layout of the website using extensive HTML and CSS, created tests for functionality, and prepared the final project presentation.
