function checkInput(input) {
    const form = input.closest('.notify-form');
    const submitBtn = form?.querySelector('button');
    const isValid = input.value.includes('@') && input.checkValidity();
  
    if (submitBtn) {
      submitBtn.classList.toggle('active', isValid);
      submitBtn.disabled = !isValid;
    }
  }
  
  async function submitEmail(button) {
    const form = button.closest('.notify-form');
    const input = form?.querySelector('input');
    const content = document.querySelector('.content');
  
    const email = input?.value || '';
    const url = 'https://script.google.com/macros/s/AKfycbxaC5hvIIHRdlpvzxszz6cfEYeH1_dZ9ckhlDOMcUTPlzvr6x7eFPJrMPrNHXDPkMlv/exec';
  
    if (!email || !button) return;
  
    const originalHTML = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `
      <span>Submitting...</span>
      <svg width="20" height="20" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="20" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
        </circle>
      </svg>
    `;
  
    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
  
      const successMessage = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <h1 class="title">Thanks for signing up! 🎉</h1>
          <p style="color: rgba(255,255,255,0.8); font-size: 18px;">We'll notify you as soon as we're live.</p>
        </div>
      `;
  
      if (content) content.innerHTML = successMessage;
  
    } catch (error) {
      console.error('Error:', error);
      alert('Sorry, there was an error. Please try again.');
      button.innerHTML = originalHTML;
      button.disabled = false;
    }
  }
  