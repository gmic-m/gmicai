document.addEventListener('DOMContentLoaded', function() {
  const nav = `
  <header class="gmic-header">
    <a class="gmic-brand" href="index.html" aria-label="GMICAI home">
      <img src="img/logo.svg" alt="GMICAI">
    </a>
    <nav class="gmic-nav" aria-label="Primary navigation">
      <a href="/products/">Products</a>
      <a href="/custom-devices/">Custom Devices</a>
      <a href="/implementation/">Implementation</a>
      <a href="/proof/">Proof</a>
      <a href="/industries/">Industries</a>
      <a href="/blog/">Blog</a>
      <a href="#contact">Contact</a>
    </nav>
    <a class="gmic-header-cta" href="/quick-inquiry/">Start a Project</a>
  </header>
  `;
  document.body.insertAdjacentHTML('afterbegin', nav);
});
