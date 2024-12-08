// Styles
document.body.style.margin = "0";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.backgroundColor = "#f9f9f9";

// Header with Navigation
const header = document.createElement("header");
header.style.backgroundColor = "#FF0000";
header.style.color = "white";
header.style.padding = "1em";
header.style.display = "flex";
header.style.justifyContent = "space-between";
header.style.alignItems = "center";
header.style.position = "sticky";
header.style.top = "0";
header.style.zIndex = "1000";

// Logo
const logo = document.createElement("div");
logo.innerText = "New Animation Premium 2.0";
logo.style.fontSize = "1.5em";
logo.style.fontWeight = "bold";
header.appendChild(logo);

// Navigation buttons
const nav = document.createElement("nav");
header.appendChild(nav);

const buttons = ["Home", "Channels", "Videos"];
buttons.forEach((btnText) => {
  const button = document.createElement("button");
  button.innerText = btnText;
  button.style.margin = "0 10px";
  button.style.padding = "0.5em 1em";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.backgroundColor = "#ffffff";
  button.style.color = "#FF0000";
  button.style.fontWeight = "bold";
  button.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  button.addEventListener("click", () => handleNavigation(btnText));
  nav.appendChild(button);
});
document.body.appendChild(header);

// Main container
const main = document.createElement("div");
main.style.padding = "1em";
main.style.marginTop = "1em";
document.body.appendChild(main);

// Video data (local video file paths)
const videos = [
  { title: "Let's welcome Wlang to the world!", filePath: "videos/video1.mp4", channel: "Carti-Drillman" },
  { title: "First Jet Plane spotting | MAI embraer E190 jet XY-ALP #planespotting #cartisaviation", filePath: "videos/video2.mp4", channel: "Carti-Drillman" },
  { title: "I make a burmese coding language.", filePath: "videos/video3.mp4", channel: "Unknown-user" },
  { title:"Thank you so much", url: "https://www.youtube.com/watch?v=rxUqkKNzQKQ", channel: "Nightmare X Daylight"}
];

// Channel data
const channels = [
  { name: "Carti-Drillman", description: "callsign: @carti221" },
  { name: "Unknown-user", description: "callsign: @Unknown-user" },
  { name: "Nightmare X Daylight", description: "callsign: @nightmare"}
];

// Dynamic Content Function
function handleNavigation(page) {
  // Clear existing content
  main.innerHTML = "";

  if (page === "Home") {
    // Home content with videos
    const welcomeMessage = document.createElement("h1");
    welcomeMessage.innerText = "Welcome to the Home Page!";
    welcomeMessage.style.textAlign = "center";
    main.appendChild(welcomeMessage);

    // Load videos on the home page
    loadVideos();
  } else if (page === "Channels") {
    // Channels content
    const channelsList = document.createElement("div");
    channelsList.style.display = "grid";
    channelsList.style.gridTemplateColumns = "repeat(auto-fit, minmax(320px, 1fr))";
    channelsList.style.gap = "1em";

    channels.forEach(channel => {
      const channelCard = document.createElement("div");
      channelCard.style.border = "1px solid #ccc";
      channelCard.style.borderRadius = "8px";
      channelCard.style.overflow = "hidden";
      channelCard.style.backgroundColor = "white";
      channelCard.style.padding = "1em";
      channelCard.style.textAlign = "center";

      const channelName = document.createElement("h2");
      channelName.innerText = channel.name;
      channelName.style.marginBottom = "0.5em";
      channelCard.appendChild(channelName);

      const channelDesc = document.createElement("p");
      channelDesc.innerText = channel.description;
      channelDesc.style.fontSize = "0.9em";
      channelCard.appendChild(channelDesc);

      channelCard.addEventListener("click", () => {
        main.innerHTML = "";
        const channelTitle = document.createElement("h1");
        channelTitle.innerText = `Videos from ${channel.name}`;
        channelTitle.style.textAlign = "center";
        main.appendChild(channelTitle);

        // Load videos related to the clicked channel
        loadVideos(channel.name);
      });

      channelsList.appendChild(channelCard);
    });

    main.appendChild(channelsList);
  } else if (page === "Videos") {
    // Videos content
    loadVideos();
  }
}

// Load Videos Function
function loadVideos(channelName) {
  const videoGrid = document.createElement("div");
  videoGrid.style.display = "grid";
  videoGrid.style.gridTemplateColumns = "repeat(auto-fit, minmax(320px, 1fr))";
  videoGrid.style.gap = "1em";

  // Render video files, optionally filtered by channel
  const filteredVideos = channelName
    ? videos.filter(video => video.channel === channelName)
    : videos;

  filteredVideos.forEach(video => {
    const videoCard = document.createElement("div");
    videoCard.style.border = "1px solid #ccc";
    videoCard.style.borderRadius = "8px";
    videoCard.style.overflow = "hidden";
    videoCard.style.backgroundColor = "white";
    videoCard.style.cursor = "pointer";

    // Create a video element for each video
    const videoElement = document.createElement("video");
    videoElement.src = video.filePath;
    videoElement.controls = true;
    videoElement.style.width = "100%";
    videoElement.style.height = "180px";
    videoCard.appendChild(videoElement);

    const title = document.createElement("p");
    title.innerText = video.title;
    title.style.padding = "0.5em";
    title.style.margin = "0";
    title.style.fontWeight = "bold";
    videoCard.appendChild(title);

    // Click event to open video in a larger player
    videoCard.addEventListener("click", () => {
      main.innerHTML = "";

      const videoPlayer = document.createElement("video");
      videoPlayer.src = video.filePath;
      videoPlayer.controls = true;
      videoPlayer.style.width = "100%";
      videoPlayer.style.height = "480px";
      main.appendChild(videoPlayer);

      const videoTitle = document.createElement("h2");
      videoTitle.innerText = video.title;
      videoTitle.style.textAlign = "center";
      main.appendChild(videoTitle);
    });

    videoGrid.appendChild(videoCard);
  });

  main.appendChild(videoGrid);
}

// Default Page
handleNavigation("Home");
