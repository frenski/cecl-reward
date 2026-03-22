/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();

	if (tParams.hasOwnProperty("fontSize")) {
		$('.popup-specific').css('font-size', tParams.fontSize);
	}

	// Setting the theme and the background
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBackground( tParams.backColor );
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	if( typeof tParams.reference !== 'undefined'){
		$('#reference-block-img').attr('src', '../files/'+tParams.reference);
	}

	yLearnTmpl.pageResized();

  class ChatSimulator {
      constructor(containerId, config) {
          this.container = document.getElementById(containerId);
          this.nextBtn = document.getElementById('nextBtn');
          this.progress = document.getElementById('progress');
          this.conversation = config.conversation || [];
          this.currentIndex = 0;
          this.avatarColors = {};

          this.init();
      }

      init() {
          this.updateProgress();
          this.nextBtn.addEventListener('click', () => this.showNext());

          // Auto-assign colors and avatars to participants
          this.conversation.forEach(msg => {
              if (!this.avatarColors[msg.sender]) {
                  this.avatarColors[msg.sender] = this.getRandomColor();
              }
          });
      }

      getRandomColor() {
          const colors = [
              '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
              '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
          ];
          return colors[Math.floor(Math.random() * colors.length)];
      }

      getInitials(name) {
          return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      }

      showNext() {
          if (this.currentIndex >= this.conversation.length) return;

          const msg = this.conversation[this.currentIndex];
          const messageDiv = document.createElement('div');
          messageDiv.className = `message ${msg.type}`;

          const avatar = document.createElement('div');
          avatar.className = 'avatar';

          // Use image if available, otherwise use colored initials
          if (msg.avatar) {
              const img = document.createElement('img');
              img.src = msg.avatar;
              img.alt = msg.sender;
              avatar.appendChild(img);
          } else {
              avatar.style.background = this.avatarColors[msg.sender];
              avatar.textContent = this.getInitials(msg.sender);
          }

          const contentDiv = document.createElement('div');
          contentDiv.className = 'message-content';

          const senderName = document.createElement('div');
          senderName.className = 'sender-name';
          senderName.textContent = msg.sender;

          const text = document.createElement('div');
          text.textContent = msg.text;

          contentDiv.appendChild(senderName);
          contentDiv.appendChild(text);

          messageDiv.appendChild(avatar);
          messageDiv.appendChild(contentDiv);

          this.container.appendChild(messageDiv);
          this.container.scrollTop = this.container.scrollHeight;

          this.currentIndex++;
          this.updateProgress();

					const disableText = typeof(tParams.disableText !== 'undefined') ? tParams.disableText : "End";

          if (this.currentIndex >= this.conversation.length) {
              this.nextBtn.disabled = true;
              this.nextBtn.textContent = disableText;
          }
      }

      updateProgress() {
          this.progress.textContent = `${this.currentIndex}/${this.conversation.length}`;
      }
  }

	// loading the page
	yLearnTmpl.loadPage();

	// conversation object defined separately, but just the same as in the
	// "Basic chat-bubble Example" (1-basics.html)

	if( typeof tParams.convo !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
		var convo = tParams.convo;
    const chatConfig = {
        conversation: tParams.convo
    };

    // Initialize the chat simulator
    const chat = new ChatSimulator('chatMessages', chatConfig);

	}


});
