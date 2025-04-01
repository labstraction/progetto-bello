// Define the 404 Error Page as a Web Component
class ErrorPage404 extends HTMLElement {
    private canvas: HTMLCanvasElement | null = null;
  
    constructor() {
      super();
  
      // Attach a shadow root
      const shadow = this.attachShadow({ mode: "open" });
  
      // HTML template
      const template = document.createElement("template");
      template.innerHTML = `
        <style>
          :host {
            margin: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(109, 141, 88); /* Green background */
            font-family: Arial, sans-serif;
            overflow: hidden; /* Prevent scrolling */
            position: relative;
          }
  
          canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0; /* Snow layer is the background */
          }
  
          .container {
            position: relative;
            width: 200px;
            height: 680px; /* Prevent container from exceeding 90% of viewport height */
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: black; /* Vertical black stripe */
            border-radius: 99%;
            z-index: 1; /* Container is in the foreground */
            overflow: hidden; /* Hide overflowing content */
          }
  
          .content {
            text-align: center;
            color: rgb(65, 62, 62);
          }
  
          .content h1 {
            font-size: 3em;
          }
  
          .content p {
         margin: 10px 0;
         font-size: 0.9em;
         padding-bottom: 5px;
         }
  
          .content a {
            text-decoration: none;
            color: rgb(7, 7, 7);
            background-color: #222323;
            padding: 10px 20px;
            border-radius: 5px;
          }
  
          .content a:hover {
            background-color: #0f0f0f;
          }
        </style>
        <canvas id="snow"></canvas>
        <div class="container">
          <div class="content">
            <h1>404</h1>
            <p>Opss... Pagina non trovata!</p>
            <a href="index.html">Home</a>
          </div>
        </div>
      `;
  
      // Append the template content
      shadow.appendChild(template.content.cloneNode(true));
  
      // Initialize canvas reference
      this.canvas = shadow.querySelector<HTMLCanvasElement>("#snow") || null;
    }
  
    connectedCallback() {
      if (this.canvas) {
        this.initializeSnow(this.canvas);
      }
      window.addEventListener("resize", this.handleResize.bind(this));
    }
  
    disconnectedCallback() {
      window.removeEventListener("resize", this.handleResize.bind(this));
    }
  
    private initializeSnow(canvas: HTMLCanvasElement) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
  
      let width = window.innerWidth;
      let height = window.innerHeight;
      let particles: Particle[] = [];
  
      class Particle {
        x: number = 0;
        y: number = 0;
        dx: number = 0;
        dy: number = 0;
        width: number = 0;
        height: number = 0;
        rotation: number = 0;
  
        constructor() {
          this.reset();
        }
  
        reset() {
          this.x = width / 2;
          this.y = height / 2;
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2 + 1;
          this.dx = Math.cos(angle) * speed * 4;
          this.dy = Math.sin(angle) * speed * 4;
          this.width = Math.random() * 15 + 5;
          this.height = Math.random() * 5 + 2;
          this.rotation = angle;
        }
      }
  
      const createParticles = (count: number) => {
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push(new Particle());
        }
      };
  
      const updateParticles = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgba(33, 31, 31, 0.7)";
  
        particles.forEach((particle) => {
          particle.x += particle.dx;
          particle.y += particle.dy;
  
          if (
            particle.x < 0 ||
            particle.x > width ||
            particle.y < 0 ||
            particle.y > height
          ) {
            particle.reset();
          }
  
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.beginPath();
          ctx.moveTo(-particle.width, 0);
          ctx.lineTo(0, -particle.height);
          ctx.lineTo(particle.width, 0);
          ctx.lineTo(0, particle.height);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
  
        window.requestAnimationFrame(updateParticles);
      };
  
      const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        createParticles((width * height) / 5000);
      };
  
      handleResize();
      updateParticles();
    }
  
    private handleResize() {
      if (this.canvas) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
    }
  }
  
  // Register the custom element
  customElements.define("error-page-404", ErrorPage404);
  