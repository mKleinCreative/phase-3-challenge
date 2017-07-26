(() => {
  this.Modal = () => {

    this.closeButton = null;
    this.modal = null;
    this.overlay = null;

    this.transitionEnd = transitionSelect();

    const defaults = {
      className: 'fade-and-drop',
      closeButton: true,
      content: "",
      maxWidth: 600,
      minWidth: 280,
      overlay: true
    }
    if (arguments[0] && typeof arguements[0] === "object") {
      this.options = extendDefaults( defaults, arguments[0]);
    }
  }
  
  Modal.prototype.open = () => {
    
    buildOut.call(this)
    
    intializeEvents.call(this)
    
    window.getComputedStyle(this.modal).height;
    
    this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " cart-open cart-anchored" : " cart-open")
    this.overlay.className = this.overlay.className + " cart-open";
  }
  
  Modal.prototype.close = () => {
    var _ = this;
    
    this.modal.className = this.modal.className.replace(" cart-open", "");
    this.overlay.className = this.overlay.className.replace(" 
    cart-open", "")
    
    this.modal.addEventListender(this.transitionEnd, () => {
      _.modal.parentNode.removeChild(_.modal);
    })
    this.overlay.addEventListener(this.transitionEnd, () => {
      if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
    })
  }
  
  
  
  function buildOut() {
    const content, contentHolder, docFrag;
    
    if (typeof this.options.content === "string") {
      content = this.options.content;
    } else {
      content = this.options.content.innerHTML
    }
    
    docFrag = document.createDocumentFragment();
    
    this.modal = document.createElement("div")
    this.modal.className = "cart " + this.options.className;
    this.modal.style.minWidth = this.options.minWidth + "px";
    this.modal.style.maxWidth = this.options.maxWidth + "px";
    
    if ( this.options.closeButton === true) {
      this.closeButton = document.createElement("button");
      this.closeButton.className = "cart-close close-button"
      this.closeButton.innerHTML = "x";
      this.modal.appendChild(this.closeButton)
    }
    
    if (this.options.overlay === true) {
      this.overlay = document.createElemet("div");
      this.overlay.className = "cart-overlay " + this.options.className;
      docFrag.appendChild(this.overlay);
      
      contentHolder = document.createElement("div")
      contentHolder.className = "cart-content"
      contentHolder.innerHTML = content
      this.modal.appendChild(contentHolder);
      
      docFrag.appendChild(this.modal);
      
      document.body.appendChild(docFrag);
    }
  }

  function extendDefaults(source, properties) {
    const property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property]
      }
    }
    return source
  }

  function initializeEvents() {
    if ( this.closeButton ) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }
    
    if ( this.overlay ) {
      this.overlay.addEventListener('click', this.close.bind(this));
    }
  }

  function transitionSelect() {
    let el = document.createElement("div");
    if (el.style.WebkitTransition) return "webkitTransitionEnd";
    if (el.style.OTransition) return "oTransitionEnd";
    return 'transitionend';
  }

}())

var myModal = new Modal({
  content: 'howdy'
  maxWidth: 600
})
