  let localStream;
  let peer;
  const audioIcon = document.getElementById('audioIcon');
  const localVideo = document.getElementById('localVideo');
  const remoteVideo = document.getElementById('remoteVideo');
  const startButton = document.getElementById('startButton');
  const shareScreenButton = document.getElementById('shareScreenButton');
  const toggleVideoButton = document.getElementById('toggleVideoButton');
  const toggleAudioButton = document.getElementById('toggleAudioButton');
  const muteButton = document.getElementById('muteButton');
  const chatInput = document.getElementById('chatInput');
  const sendButton = document.getElementById('sendButton');
  const chatArea = document.getElementById('chatArea');
  let isVideoEnabled = true;
  let isAudioEnabled = true;
  let isMuted = false;
  
  // Function to start video call
  function startCall() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localStream = stream;
        localVideo.srcObject = stream;
        // Initialize peer
        peer = new SimplePeer({ initiator: true, stream });
        // Handle peer events
        peer.on('signal', data => {
          // Send signal to remote peer
          // You should have some mechanism to transmit this signal to the other peer
        });
        peer.on('stream', stream => {
          remoteVideo.srcObject = stream;
        });
      })
      .catch(error => {
        console.error('Error accessing media devices:', error);
      });
  }
    
    // Function to handle screen sharing
    function shareScreen() {
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
          const senders = peer._pc.getSenders();
          const videoSender = senders.find(sender => sender.track.kind === 'video');
          videoSender.replaceTrack(stream.getTracks()[0]);
        })
        .catch(error => {
          console.error('Error accessing screen sharing:', error);
        });
    }
    
    // Function to toggle video stream
    function toggleVideo() {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      isVideoEnabled = !isVideoEnabled;
      toggleVideoButton.textContent = isVideoEnabled ? 'Turn Off Video' : 'Turn On Video';
    }
    
    // Function to toggle audio stream
    function toggleAudio() {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      isAudioEnabled = !isAudioEnabled;
      audioIcon.textContent = isAudioEnabled ? '🔊' : '🔇';
    }
    
    // Function to mute/unmute audio
    function toggleMute() {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
      isMuted = !isMuted;
    }

    // Function to send chat message
    function sendMessage() {
      const message = chatInput.value.trim();
      if (message !== '') {
        // Send the message
        appendMessage('You', message); // Display the message locally
        console.log('Sending message:', message);
        chatInput.value = ''; // Clear the input field
        // Implement your logic to send the message to the other peer
      }
    }

    // Function to display chat message
    function appendMessage(sender, message) {
      const messageElement = document.createElement('div');
      messageElement.textContent = `${sender}: ${message}`;
      chatArea.appendChild(messageElement);
      // Scroll chat area to the bottom
      chatArea.scrollTop = chatArea.scrollHeight;
    }
    
    // Event listeners
    startButton.addEventListener('click', startCall);
    shareScreenButton.addEventListener('click', shareScreen);
    toggleVideoButton.addEventListener('click', toggleVideo);
    toggleAudioButton.addEventListener('click', toggleAudio);
    muteButton.addEventListener('click', toggleMute);
    sendButton.addEventListener('click', sendMessage);
