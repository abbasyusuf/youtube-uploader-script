# YouTube Uploader Script

This repository contains a Google Apps Script project designed to automate the process of uploading videos to YouTube, specifically tailored for brand accounts. The script interacts with the YouTube Data API to select random videos from a Google Sheet and upload them to a designated YouTube channel.

## Features

- OAuth2 authentication for secure access to YouTube API
- Support for YouTube brand accounts
- Random video selection from a Google Sheet
- Automated video uploading with customizable metadata (title, description, tags)
- Resumable upload support for large video files

## Setup

1. Clone this repository or copy the script to your Google Apps Script project.
2. Set up a Google Cloud Project and enable the YouTube Data API.
3. Configure the OAuth consent screen with the necessary information.
4. Update the `CLIENT_ID` and `CLIENT_SECRET` in the script with your OAuth 2.0 credentials.
5. Run the `getAuthorizationUrl()` function to authorize the application.
6. Use `listChannels()` to see available channels, then `setSelectedChannel(index)` to choose your brand account.
7. Prepare your Google Sheet with video information (title, URL, tags, description).
8. Run `uploadRandomVideoToYouTube()` to start the upload process.

## Usage

Detailed usage instructions and API documentation can be found in the [USAGE.md](docs/USAGE.md) file.

## Privacy Policy

Our privacy policy is available in [PRIVACY.md](PRIVACY.md).

## Terms of Service

Please read our terms of service in [TERMS.md](TERMS.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
