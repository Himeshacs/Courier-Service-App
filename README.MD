## Client Setup


Navigate to the directory where client-side code resides.

Run `pnpm install` to install dependencies.

Run `pnpm run dev` to start the development server for the client-side code.


## Server Setup


Navigate to the directory where  server-side code resides.

Run `npm install` to install server-side dependencies.

Run `npm start` to start the server.



## Sample ENV for the Server (backend)


PORT=

SECRET=

DB_NAME=

DB_USERNAME=

DB_PASSWORD=

DB_HOST=



### Note: For admin login, you need to create an account with the username 'admin'.


## User Stories

* Implement real-time package tracking using GPS technology so that clients can track their shipments with greater accuracy and confidence.

* Integrate automated notifications for shipment updates, including when a package is out for delivery or has been successfully delivered, to improve communication and transparency with clients.

* Implement a feedback system where clients can rate their delivery experience and provide comments, allowing us to gather valuable insights for continuous improvement.

* Introduce a feature for clients to schedule pickups for their shipments at their preferred time and location, streamlining the process and enhancing convenience.

* Integrate with e-commerce platforms to offer seamless integration for businesses, allowing them to directly generate shipping labels and track orders from their own systems.

## Additional 

### Client's Features 

When logged in as a client, you can only update and delete your shipment details.

You can view all other shipments.

Access client functionalities through clicking the profile picture, which will display options for creating shipments, tracking shipments, and updating your profile.

You can update your profile as well.

### Admin's Features

Admins can create shipments.

Admins can view all shipments and update them.

Admins can update shipment status as well.