// fetch channels from API
let idList = [];

async function getChannels() {
  await fetch("http://api.sr.se/api/v2/channels/?mp3&format=json")
    .then((response) => response.json())
    .then((randomChannel) =>
      saveChannelIdsAndGetChannel(randomChannel.channels)
    )
    .catch((err) => console.log(err));
}

function saveChannelIdsAndGetChannel(channelList) {
  channelList.map((item) => {
    idList.push(item.id);
    console.log(item.id); // console logging item.id
  });

  const randomNumber = Math.floor(Math.random() * idList.length);
  var channelId = idList[randomNumber];

  getChannel(channelId);
}

async function getChannel(channelId) {
  await fetch(
    "http://api.sr.se/api/v2/channels/" + channelId + "/?mp3&format=json"
  )
    .then((response) => response.json())
    .then((randomChannel) => renderHtml(randomChannel.channel))
    .catch((err) => console.log(err));
  }
// render all HTML needed for playing channels
function renderHtml(channel) {
  let audioControlElement = document.getElementById("audioControl");
   let nameLabel = document.getElementById("channelName");
   nameLabel.innerHTML = channel.name;

  if (audioControlElement != undefined) {
    audioControlElement.src = channel.liveaudio.url;
  }
}
