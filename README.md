# Content Moderation Tool

The Content Moderation Tool is a powerful solution to filter and moderate NSFW (Not Safe For Work) content in images and videos from the internet in real-time. The tool is equipped with three main components:

- **Image Filter Extension**
- **Internet Video Filter Extension**
- **Video Filter Web Application**

## Features

- Real-time NSFW content filtering for images and videos.
- Browser extensions for seamless integration into web browsing.
- Web application for custom video processing with blur effects.

## Components

### Image Filter Extension

A browser extension that automatically blurs images with NSFW content while browsing the internet.

### Internet Video Filter Extension

A browser extension that provides real-time NSFW content filtering for videos across the entire internet.

### Video Filter Web Application

A web application where users can upload videos, and the tool processes them to produce an output video with a blur effect on exposed nudity content.

## Installation

### Image Filter Extension

1. Clone the repository or download the extension files.
2. Open your browser and navigate to the extensions page.
    - For Chrome: `chrome://extensions/`
    - For Firefox: `about:addons`
3. Enable "Developer mode" (if required).
4. Click "Load unpacked" and select the extension folder.
5. The extension will be installed and active.

### Internet Video Filter Extension

1. Clone the repository or download the extension files.
2. Open your browser and navigate to the extensions page.
    - For Chrome: `chrome://extensions/`
    - For Firefox: `about:addons`
3. Enable "Developer mode" (if required).
4. Click "Load unpacked" and select the extension folder.
5. The extension will be installed and active.

### Video Filter Web Application

1. Clone the repository: `git clone https://github.com/yourusername/content-moderation-tool.git`
2. Navigate to the project directory: `cd content-moderation-tool`
3. Install the necessary dependencies: `pip install -r requirements.txt`
4. Run the web application: `python app.py`
5. Open your web browser and go to `http://localhost:5000` to access the application.

## Usage

### Image Filter Extension

Once installed, the Image Filter Extension will automatically blur images containing NSFW content as you browse the internet.

### Internet Video Filter Extension

After installation, the Internet Video Filter Extension will provide real-time NSFW content filtering for videos across the internet, blurring inappropriate content.

### Video Filter Web Application

1. Open the Video Filter Web Application in your browser.
2. Upload a video file through the provided interface.
3. The tool will process the video and generate an output video with blurred NSFW content.
4. Download the processed video from the application.

## Model Architecture

- **Base Model**: ResNet-101, fine-tuned on a custom NSFW dataset.
- **Pruning Techniques**: Applied to reduce model size without significantly affecting accuracy.
- **Deployment**: Converted to TensorFlow Lite (TFLite) for efficient edge inference on CPU.

## Technologies Used

- **Frameworks**: TensorFlow, Keras
- **Deployment**: Flask, TensorFlow Lite
- **Other Tools**: Docker, OpenCV

## Team

- [Narla Venkata Anand Sai Kumar](https://github.com/narla-venkata-anand-sai-Kumar)
- [Karthik Taraka Sai Bolla](https://github.com/karthikbolla)
- [Kumar Srnivas Bobba]()
- [Jaswanth Sabbeneni]()

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

