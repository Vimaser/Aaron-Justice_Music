# Arron-Justice-Music

Freelance project building a personal site for a musician using google firebase as a backend. Site will have contact, events, footer, gallery, and music all easily updated by the user via an admin portal. Project is built in react, using firebase. 

- FRI 9/22/2023
Project started, react helloWorld works, set up basic components and connected the firebase "backEnd" for the admin portal. Admin portal works, CRUD functions for events. Still need to impliment music and image uploads. Will set a cap on these so the user doesn't exceed bandwidth limits. Originally set up a protectedroute.js, but will remove because the admin route now requires login to be successful. No need for JWT since admin route is a single page. No styling, will put a very-very basic bootstrap next before custom styling. Will not be able to work on this until Monday.

- MON 09/25/2023
Having issue pulling an entire image folder from firebase. I can hardcode single images fine, but the goal is to make this site easily accessable for the user to make changes quickly like they would do with a personal facebook page. Admin page is almost finished, uploading images works fine, have issue with deleting though. I'm wondering if these two issues are related? Didn't add styling, I'm more concerned about functionality right now. Friday is when I see the customer, I can make a decent mock styling fast so my time is better spent working on functionality right now. Time to lurk stuckoverflow and ask the oracle...