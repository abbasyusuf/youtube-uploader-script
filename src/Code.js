var CLIENT_ID = 'YOUR_CLIENT_ID_HERE'; // From your OAuth client
var CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE'; // From your OAuth client

function getService() {
  return OAuth2.createService('YouTube')
    .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
    .setTokenUrl('https://oauth2.googleapis.com/token')
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties())
    .setScope('https://www.googleapis.com/auth/youtube.force-ssl')
    .setParam('access_type', 'offline')
    .setParam('prompt', 'consent');
}

function authCallback(request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Authorization failed.');
  }
}

function getAuthorizationUrl() {
  var service = getService();
  if (!service.hasAccess()) {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s', authorizationUrl);
  } else {
    Logger.log('Service already has access.');
  }
}

function uploadRandomVideoToYouTube() {
  var service = getService();
  if (!service.hasAccess()) {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Authorization required. Open this URL to authorize the application, then re-run this function:');
    Logger.log(authorizationUrl);
    return;
  }

  // Get the list of channels the user has access to
  var channels = listChannels();
  if (channels.length === 0) {
    Logger.log('No channels found');
    return;
  }

  // You might want to store the selected channel ID in user properties
  var selectedChannelId = PropertiesService.getUserProperties().getProperty('SELECTED_CHANNEL_ID');
  if (!selectedChannelId) {
    Logger.log('Available channels:');
    for (var i = 0; i < channels.length; i++) {
      Logger.log(i + ': ' + channels[i].snippet.title + ' (' + channels[i].id + ')');
    }
    Logger.log('Please set the selected channel ID using setSelectedChannel(index) function');
    return;
  }

  // Rest of your existing uploadRandomVideoToYouTube function...
  // Make sure to use the selectedChannelId when making API calls
}

function listChannels() {
  var service = getService();
  if (!service.hasAccess()) {
    Logger.log('Authorization required.');
    return [];
  }

  var response = UrlFetchApp.fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', {
    headers: {
      Authorization: 'Bearer ' + service.getAccessToken()
    }
  });

  var result = JSON.parse(response.getContentText());
  return result.items || [];
}

function setSelectedChannel(index) {
  var channels = listChannels();
  if (index >= 0 && index < channels.length) {
    var channelId = channels[index].id;
    PropertiesService.getUserProperties().setProperty('SELECTED_CHANNEL_ID', channelId);
    Logger.log('Selected channel set to: ' + channels[index].snippet.title + ' (' + channelId + ')');
  } else {
    Logger.log('Invalid index. Please choose a number between 0 and ' + (channels.length - 1));
  }
}
