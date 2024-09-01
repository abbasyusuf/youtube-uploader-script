Clone this repository or copy the script to your Google Apps Script project.
Set up a Google Cloud Project and enable the YouTube Data API.
Configure the OAuth consent screen with the necessary information.
Update the CLIENT_ID and CLIENT_SECRET in the script with your OAuth 2.0 credentials.
Run the getAuthorizationUrl() function to authorize the application.
Use listChannels() to see available channels, then setSelectedChannel(index) to choose your brand account.
Prepare your Google Sheet with video information (title, URL, tags, description).
Run uploadRandomVideoToYouTube() to start the upload process.
