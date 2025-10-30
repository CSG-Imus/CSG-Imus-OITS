# CSG-Imus-OITS — Transparency Site (Static)

This is a minimal static transparency portal for the Central Student Government — Imus Campus. It contains sections for approved resolutions, activity proposals, project proposals, minutes of meeting, and officer lists for the current and last term.

How to edit content
- Open `Static/main.js` and edit the `data` object at the top to add/change entries. Each document item should have `id`, `title`, `date`, and `file` (URL or path to document).
- Edit officer lists under `data.officers.current` and `data.officers.last`.

Changing term palette
- In the site UI use the "Term palette" selector on the Home page. It toggles CSS classes (`term-blue`, `term-green`, `term-gold`) which set accent and background colors.
- You can add new palettes by editing `Static/main.css` and adding a corresponding class which sets CSS variables.

Deploying
- Copy the `Static` folder to any static web server (Apache, nginx, GitHub Pages) or open `Static/main.html` in a browser for local testing.

License
- Free to use and modify for the CSG-Imus community.
# Central Student Governement - Online Information Transparency System

<b>Project Overview</b>
The Central Student Government - Online Information Transparency System is a web-based platform designed to enhance transparency and communication between the student government and the student body. This system allows for the publication of meeting minutes, financial reports, event announcements, and other relevant information in an easily accessible manner.

<b>Features</b>
- User-friendly interface for easy navigation and information retrieval.
- Secure login for student government to upload and manage content.
- Public access to view published documents and announcements.
- Search functionality to quickly find specific information.
- Responsive design for accessibility on various devices.
- Integration with social media platforms for broader reach.