# Arron-Justice-Music

Freelance project building a personal site for a musician using google firebase as a backend. Site will have contact, events, footer, gallery, and music all easily updated by the user via an admin portal. Project is built in react, using firebase. 

- FRI 9/22/2023
Project started, react helloWorld works, set up basic components and connected the firebase "backEnd" for the admin portal. Admin portal works, CRUD functions for events. Still need to impliment music and image uploads. Will set a cap on these so the user doesn't exceed bandwidth limits. Originally set up a protectedroute.js, but will remove because the admin route now requires login to be successful. No need for JWT since admin route is a single page. No styling, will put a very-very basic bootstrap next before custom styling. Will not be able to work on this until Monday.

- MON 09/25/2023
Having issue pulling an entire image folder from firebase. I can hardcode single images fine, but the goal is to make this site easily accessable for the user to make changes quickly like they would do with a personal facebook page. Admin page is almost finished, uploading images works fine, have issue with deleting though. I'm wondering if these two issues are related? Didn't add styling, I'm more concerned about functionality right now. Friday is when I see the customer, I can make a decent mock styling fast so my time is better spent working on functionality right now. Time to lurk stuckoverflow and ask the oracle...

- TUE 09/26/2023
Good Lord... So when uploading the images the saveState name was not the same that uploaded to firebase. So file "0139240134901.jpeg" is being uploaded as "a24.jpeg" on firebase. Only after console.logging everything and dropping every bit of code I found on stack overflow... Still incredibly buggy. Deleted images are still remaining as broken links on the admin portal etc. I know what the issue is now so fixing this should be easier. Iffy on implimenting the music upload since I'm watching that database ticker grow faster than expected. I may just set it to a text and from the admin portal the owner can just drop embedded links. Still need to setup JWT for the admin portal, only because it's getting annoying. -- Doing a gitpush now, will come back later today.

Alright, images are deleting and are no longer persistent on the frontEnd. Talked with some friends from the "blue websight" and the issue is/was frontEnd mac doesn't play well with backEnd linux on image naming conventions. using a uuid was recommended, but I found another work around. I'm debating the audio upload, while it does look good portfolio wise, it goes beyond the scope of this project. The original plane of just storing the html embedded links in an array on the backend will save on storage space.

Very cool, will probably start styling tomorrow. 