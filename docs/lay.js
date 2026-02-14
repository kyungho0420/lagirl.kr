/**
 * LA GIRL - Elegant & Chic
 */
const siteConfig = {
    meta: {
        framework: 'V4',
        type: 'page',
        mode: 'demo',
        lang: 'ko',
        theme: true,
        scroll_smooth: true
    },
    api: {
        server: 'damso',
        turnstile: '0x4AAAAAABrG4DQP8tkp1_TI',
        redirect: '../'
    },
    canvas: {
        target: '#home',
        effect: 'particleEffect',
        overlay: 'dotted',

        image_type: 'cover',
        image_count: 1,
        image_slide: 8,
        image_path: './section/home/',
        image_format: 'webp'
    },
    buttons: [
        { name: 'Profile', icon: 'perm_identity', url: '#profile' },
        { name: 'Lookbook', icon: 'style', url: '#lookbook' },
        { name: 'Classes', icon: 'fitness_center', url: '#overview' }
    ]
};

// [Tier 3] Custom Effect: Elegant Particles (Gold/White Dust)
window.particleEffect = {
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    particles: [],
    animationFrameId: null,

    init(container) {
        this.container = container;
        this.canvas = container.querySelector('.damso-canvas__effect');
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.className = 'damso-canvas__effect';
            container.appendChild(this.canvas);
        }
        this.ctx = this.canvas.getContext('2d');

        this.resize = this.resize.bind(this);
        this.animate = this.animate.bind(this);

        window.addEventListener('resize', this.resize);
        this.resize();
        this.createParticles();
        this.animate();
    },

    resize() {
        if (!this.container) return;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    createParticles() {
        const count = 60;
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle());
        }
    },

    createParticle() {
        return {
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            size: Math.random() * 2 + 0.5, // Small, refined particles
            speedX: (Math.random() - 0.5) * 0.2, // Very slow movement
            speedY: (Math.random() - 0.5) * 0.2,
            alpha: Math.random() * 0.5 + 0.1,
            color: Math.random() > 0.8 ? '255, 215, 0' : '255, 255, 255' // Gold (20%) or White (80%)
        };
    },

    animate() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around edges
            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;

            // Pulse alpha
            p.alpha += (Math.random() - 0.5) * 0.02;
            if (p.alpha < 0.1) p.alpha = 0.1;
            if (p.alpha > 0.6) p.alpha = 0.6;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            this.ctx.fill();
        });

        this.animationFrameId = requestAnimationFrame(this.animate);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.V4) {
        window.V4.init(siteConfig).then(app => {
            app.registerEffect('particleEffect', window.particleEffect);
        });
    }
});