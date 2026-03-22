// Asset Loader Class
class AssetLoader {
    constructor() {
        this.images = {};
        this.totalAssets = 0;
        this.loadedAssets = 0;
    }

    async loadImage(src) {
        if (this.images[src]) {
            return this.images[src];
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                this.images[src] = img;
                this.loadedAssets++;
                this.updateProgress();
                resolve(img);
            };
            img.onerror = () => {
                console.warn(`Failed to load image: ${src}`);
                this.loadedAssets++;
                this.updateProgress();
                resolve(null);
            };
            img.src = src;
        });
    }

    async loadAllAssets(config) {
        const imagesToLoad = [];

        // Collect all image URLs
        Object.values(config.scenes).forEach(scene => {
            if (scene.background.type === 'image' && scene.background.src) {
                imagesToLoad.push(assetsPath + scene.background.src);
            }

            scene.sprites.forEach(sprite => {
                if (sprite.type === 'image' && sprite.src) {
                    imagesToLoad.push(assetsPath + sprite.src);
                }
            });
        });

        this.totalAssets = imagesToLoad.length;
        this.updateProgress();

        // Load all images
        const promises = imagesToLoad.map(src => this.loadImage(src));
        await Promise.all(promises);
    }

    updateProgress() {
        const progress = this.totalAssets > 0
            ? Math.round((this.loadedAssets / this.totalAssets) * 100)
            : 100;

        const loadingBar = document.getElementById('loadingBar');
        const loadingText = document.getElementById('loadingText');
        const startButton = document.getElementById('startButton');

        if (loadingBar) loadingBar.style.width = `${progress}%`;
        if (loadingText) loadingText.textContent = `${progress}%`;

        // Show start button when loading is complete
        if (progress === 100 && startButton) {
            startButton.classList.add('ready');
        }
    }

    getImage(src) {
        return this.images[assetsPath + src] || null;
    }
}

// Game Engine Class
class GameEngine {
    constructor(config) {
        this.config = config;
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentScene = null;
        this.animating = false;
        this.hoveredSprite = null;
        this.canvas.width = config.canvasWidth;
        this.canvas.height = config.canvasHeight;
        this.assetLoader = new AssetLoader();
        this.easingFunctions = this.createEasingFunctions();
        this.animationsPlaying = {};

        this.init();
    }

    createEasingFunctions() {
        return {
            linear: t => t,
            easeInQuad: t => t * t,
            easeOutQuad: t => t * (2 - t),
            easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            easeInCubic: t => t * t * t,
            easeOutCubic: t => (--t) * t * t + 1,
            easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
            easeInElastic: t => {
                if (t === 0 || t === 1) return t;
                const p = 0.3;
                return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
            },
            easeOutElastic: t => {
                if (t === 0 || t === 1) return t;
                const p = 0.3;
                return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
            },
            easeInOutElastic: t => {
                if (t === 0 || t === 1) return t;
                t *= 2;
                const p = 0.45;
                if (t < 1) {
                    return -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
                }
                return Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) * 0.5 + 1;
            },
            easeInBack: t => {
                const c1 = 1.70158;
                return t * t * ((c1 + 1) * t - c1);
            },
            easeOutBack: t => {
                const c1 = 1.70158;
                return 1 + (--t) * t * ((c1 + 1) * t + c1);
            },
            easeInOutBack: t => {
                const c1 = 1.70158;
                const c2 = c1 * 1.525;
                return t < 0.5
                    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
                    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
            },
            easeInBounce: t => 1 - this.easingFunctions.easeOutBounce(1 - t),
            easeOutBounce: t => {
                const n1 = 7.5625;
                const d1 = 2.75;
                if (t < 1 / d1) {
                    return n1 * t * t;
                } else if (t < 2 / d1) {
                    return n1 * (t -= 1.5 / d1) * t + 0.75;
                } else if (t < 2.5 / d1) {
                    return n1 * (t -= 2.25 / d1) * t + 0.9375;
                } else {
                    return n1 * (t -= 2.625 / d1) * t + 0.984375;
                }
            },
            easeInOutBounce: t => {
                return t < 0.5
                    ? (1 - this.easingFunctions.easeOutBounce(1 - 2 * t)) / 2
                    : (1 + this.easingFunctions.easeOutBounce(2 * t - 1)) / 2;
            }
        };
    }

    async init() {
        await this.assetLoader.loadAllAssets(this.config);

        // Setup start button click handler
        const startButton = document.getElementById('startButton');
        const gameDescription = document.getElementById('gameDescription');
        const gameTitle = document.getElementById('gameTitle');
        startButton.addEventListener('click', () => {
            document.getElementById('loadingScreen').classList.add('hidden');
            this.loadScene(this.config.startScene);
        });

        gameDescription.innerHTML = this.config.description || '';
        gameTitle.innerHTML = this.config.gameTitle;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    loadScene(sceneId) {
        const scene = this.config.scenes[sceneId];
        if (!scene) {
            console.error(`Scene ${sceneId} not found`);
            return;
        }

        this.currentScene = {
            id: sceneId,
            ...scene
        };

        document.getElementById('sceneName').textContent = `Scenario: ${scene.name}`;
        this.render();
    }

    render() {
        // Draw background
        if (this.currentScene.background.type === 'image') {
            const bgImg = this.assetLoader.getImage(this.currentScene.background.src);
            if (bgImg) {
                this.ctx.drawImage(bgImg, 0, 0, this.canvas.width, this.canvas.height);
            } else {
                this.ctx.fillStyle = this.currentScene.background.fallbackColor;
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
        } else {
            this.ctx.fillStyle = this.currentScene.background.fallbackColor || '#000';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Draw sprites
        this.currentScene.sprites.forEach(sprite => {
            this.drawSprite(sprite);
        });

        // Draw label for hovered sprite
        if (this.hoveredSprite) {
            this.drawLabel(this.hoveredSprite);
        }
    }

    drawSprite(sprite) {
        const isHovered = sprite === this.hoveredSprite && sprite.interactable;

        if (isHovered) {
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#FFD700';
        }

        // Save context for transformations
        this.ctx.save();

        // Apply opacity
        const opacity = sprite.opacity !== undefined ? sprite.opacity : 1.0;
        this.ctx.globalAlpha = opacity;

        // Calculate center point for rotation and scale
        let centerX, centerY;
        if (sprite.type === 'circle') {
            centerX = sprite.x;
            centerY = sprite.y;
        } else {
            centerX = sprite.x + sprite.width / 2;
            centerY = sprite.y + sprite.height / 2;
        }

        // Apply transformations
        this.ctx.translate(centerX, centerY);

        // Apply scale
        const scale = sprite.scale !== undefined ? sprite.scale : 1.0;
        this.ctx.scale(scale, scale);

        // Apply rotation
        if (sprite.rotation !== undefined && sprite.rotation !== 0) {
            this.ctx.rotate((sprite.rotation * Math.PI) / 180);
        }

        this.ctx.translate(-centerX, -centerY);

        if (sprite.type === 'image') {
            const img = this.assetLoader.getImage(sprite.src);
            if (img) {
                this.ctx.drawImage(img, sprite.x, sprite.y, sprite.width, sprite.height);
            } else {
                // Fallback to color if image failed to load
                this.ctx.fillStyle = sprite.fallbackColor || '#ccc';
                this.ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
            }
        } else if (sprite.type === 'rectangle') {
            this.ctx.fillStyle = sprite.color;
            this.ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
            if (sprite.interactable) {
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.strokeRect(sprite.x, sprite.y, sprite.width, sprite.height);
            }
        } else if (sprite.type === 'circle') {
            this.ctx.fillStyle = sprite.color;
            this.ctx.beginPath();
            this.ctx.arc(sprite.x, sprite.y, sprite.radius, 0, Math.PI * 2);
            this.ctx.fill();
            if (sprite.interactable) {
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.stroke();
            }
        }

        this.ctx.restore();
        this.ctx.shadowBlur = 0;
    }

    drawLabel(sprite) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.font = '16px Arial';
        const metrics = this.ctx.measureText(sprite.label);
        const padding = 10;
        const labelX = sprite.x + (sprite.width || sprite.radius || 0) / 2 - metrics.width / 2;
        const labelY = sprite.y - 30;

        this.ctx.fillRect(labelX - padding, labelY - 20, metrics.width + padding * 2, 30);
        this.ctx.fillStyle = '#FFD700';
        this.ctx.fillText(sprite.label, labelX, labelY);
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let foundSprite = null;
        for (const sprite of this.currentScene.sprites) {
            if (!sprite.interactable) continue;

            if (sprite.type === 'rectangle' || sprite.type === 'image') {
                if (x >= sprite.x && x <= sprite.x + sprite.width &&
                    y >= sprite.y && y <= sprite.y + sprite.height) {
                    foundSprite = sprite;
                    break;
                }
            } else if (sprite.type === 'circle') {
                const dx = x - sprite.x;
                const dy = y - sprite.y;
                if (Math.sqrt(dx * dx + dy * dy) <= sprite.radius) {
                    foundSprite = sprite;
                    break;
                }
            }
        }

        if (foundSprite !== this.hoveredSprite) {
            this.hoveredSprite = foundSprite;
            this.canvas.style.cursor = foundSprite ? 'pointer' : 'default';
            this.render();
        }
    }

    handleClick(e) {
        // if (this.animating) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (const sprite of this.currentScene.sprites) {
            if (!sprite.interactable) continue;

            let clicked = false;
            if (sprite.type === 'rectangle' || sprite.type === 'image') {
                clicked = x >= sprite.x && x <= sprite.x + sprite.width &&
                          y >= sprite.y && y <= sprite.y + sprite.height;
            } else if (sprite.type === 'circle') {
                const dx = x - sprite.x;
                const dy = y - sprite.y;
                clicked = Math.sqrt(dx * dx + dy * dy) <= sprite.radius;
            }

            if (clicked) {
                this.handleInteraction(sprite);
                break;
            }
        }
    }

    handleInteraction(sprite) {
        const interaction = this.currentScene.interactions[sprite.id];
        if (!interaction) return;

        if (interaction.message) {
            document.getElementById('gameHint').textContent = interaction.message;
            setTimeout(() => {
                document.getElementById('gameHint').textContent = 'Click interactable objects';
            }, 2000);
        }

        if (interaction.type === 'multiTarget') {
            this.playMultiTargetInteraction(interaction);
        } else if (interaction.type === 'transition') {
            this.playAnimation(interaction.animation, sprite, () => {
                this.loadScene(interaction.target);
            });
        } else if (interaction.type === 'animation') {
            this.playAnimation(interaction.animation, sprite);
        } else if (interaction.type === 'objectAnimation') {
            this.playObjectAnimation(interaction);
        } else if (interaction.type === 'infoBox') {
            this.playInfoBox(interaction);
        }
    }

    playMultiTargetInteraction(interaction) {
        if (!interaction.targets || interaction.targets.length === 0) {
            console.error('No targets defined for multiTarget interaction');
            return;
        }

        // Process each target's interaction
        interaction.targets.forEach((targetConfig, index) => {
            const delay = targetConfig.delay || 0;

            setTimeout(() => {
                if (targetConfig.type === 'transition') {
                    this.playAnimation(targetConfig.animation, null, () => {
                        this.loadScene(targetConfig.target);
                    });
                } else if (targetConfig.type === 'objectAnimation') {
                    // console.log("TRigger2");
                    this.playObjectAnimation(targetConfig);
                } else if (targetConfig.type === 'animation') {
                    const sprite = this.currentScene.sprites.find(s => s.id === targetConfig.targetSprite);
                    if (sprite) {
                        this.playAnimation(targetConfig.animation, sprite);
                    }
                } else if (targetConfig.type === 'infoBox') {
                    this.playInfoBox(targetConfig);
                }
            }, delay);
        });
    }

    playAnimation(animationType, sprite, callback) {
        this.animating = true;
        const duration = 500;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            switch (animationType) {
                case 'fadeOut':
                    this.ctx.globalAlpha = 1 - progress;
                    this.render();
                    this.ctx.globalAlpha = 1;
                    break;
                case 'shake':
                    const originalX = sprite.x;
                    sprite.x = originalX + (Math.random() - 0.5) * 10;
                    this.render();
                    sprite.x = originalX;
                    break;
                case 'pulse':
                    const scale = 1 + Math.sin(progress * Math.PI * 4) * 0.1;
                    this.ctx.save();
                    const centerX = sprite.x + (sprite.width || sprite.radius || 0) / 2;
                    const centerY = sprite.y + (sprite.height || sprite.radius || 0) / 2;
                    this.ctx.translate(centerX, centerY);
                    this.ctx.scale(scale, scale);
                    this.ctx.translate(-centerX, -centerY);
                    this.render();
                    this.ctx.restore();
                    break;
                case 'glow':
                    this.ctx.shadowBlur = 20 * Math.sin(progress * Math.PI);
                    this.ctx.shadowColor = '#FFD700';
                    this.render();
                    this.ctx.shadowBlur = 0;
                    break;
                case 'slideLeft':
                    this.ctx.save();
                    this.ctx.translate(-this.canvas.width * progress, 0);
                    this.render();
                    this.ctx.restore();
                    break;
                case 'slideRight':
                    this.ctx.save();
                    this.ctx.translate(this.canvas.width * progress, 0);
                    this.render();
                    this.ctx.restore();
                    break;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.animating = false;
                if (callback) callback();
            }
        };

        animate();
    }

    playObjectAnimation(interaction) {
        const targetSprite = this.currentScene.sprites.find(s => s.id === interaction.targetSprite);
        if (!targetSprite) {
            console.error(`Target sprite ${interaction.targetSprite} not found`);
            return;
        }

        // Support both single animation (legacy) and multiple animations
        const animations = interaction.animations || [interaction.animation];

        this.animating = true;

        // Store original values
        const originalPos = { x: targetSprite.x, y: targetSprite.y };
        const originalRotation = targetSprite.rotation || 0;
        const originalScale = targetSprite.scale !== undefined ? targetSprite.scale : 1.0;
        const originalOpacity = targetSprite.opacity !== undefined ? targetSprite.opacity : 1.0;

        // Initialize properties if not present
        if (targetSprite.rotation === undefined) targetSprite.rotation = 0;
        if (targetSprite.scale === undefined) targetSprite.scale = 1.0;
        if (targetSprite.opacity === undefined) targetSprite.opacity = 1.0;

        // console.log(targetSprite);

        // Track animation states for each animation
        const animStates = animations.map(anim => ({
            anim: anim,
            startTime: Date.now() + (anim.delay || 0),
            delay: anim.delay || 0,
            duration: anim.duration || 1000,
            easingFunc: this.easingFunctions[anim.easing] || this.easingFunctions.linear,
            complete: false,
            started: false,
            elapsed: 0
        }));

        if (!this.animationsPlaying.hasOwnProperty(targetSprite.id)) {
          this.animationsPlaying[targetSprite.id] = {};
        }

        // console.log(animStates);

        animStates.forEach(state => {
            if (!this.animationsPlaying[targetSprite.id].hasOwnProperty(state.anim.type) ||
                !this.animationsPlaying[targetSprite.id][state.anim.type]) {
              this.animationsPlaying[targetSprite.id][state.anim.type] = state;
            } else {
              // this.animationsPlaying[targetSprite.id][state.anim.type]
              state.started = true;
              state.startTime =
                this.animationsPlaying[targetSprite.id][state.anim.type].startTime;
              this.animationsPlaying[targetSprite.id][state.anim.type] = state;
            }
            // console.log(state.anim);
        });

        let animationFrameId = null;

        const animate = () => {
            const now = Date.now();
            let allComplete = true;

            animStates.forEach(state => {
                if (state.complete) return;

                const elapsed = now - state.startTime;
                state.elapsed = elapsed;
                let progress = Math.min(elapsed / state.duration, 1);

                // console.log(progress);

                // Apply yoyo effect (bounce back)
                if (state.anim.yoyo) {
                    const totalDuration = state.duration * 2;
                    if (elapsed < totalDuration) {
                        allComplete = false;
                        if (progress >= 1) {
                            const yoyoProgress = (elapsed - state.duration) / state.duration;
                            progress = 1 - Math.min(yoyoProgress, 1);
                        }
                    } else {
                        state.complete = true;
                        return;
                    }
                } else if (progress < 1) {
                    allComplete = false;
                } else {
                    state.complete = true;
                    this.animationsPlaying[targetSprite.id][state.anim.type] = {};
                    return;
                }

                const easedProgress = state.easingFunc(progress);

                if (state.anim.type === 'move') {
                    // Simple move from point A to point B
                    const fromX = state.anim.from.x;
                    const fromY = state.anim.from.y;
                    const toX = state.anim.to.x;
                    const toY = state.anim.to.y;

                    targetSprite.x = fromX + (toX - fromX) * easedProgress;
                    targetSprite.y = fromY + (toY - fromY) * easedProgress;

                } else if (state.anim.type === 'path') {
                    // console.log(state.anim.name);
                    // Path animation following multiple points
                    const path = state.anim.path;
                    const totalSegments = path.length - 1;
                    const segmentProgress = easedProgress * totalSegments;
                    const currentSegment = Math.floor(segmentProgress);
                    // console.log(segmentProgress);
                    const segmentT = segmentProgress - currentSegment;

                    if (currentSegment < totalSegments) {
                        const start = path[currentSegment];
                        const end = path[currentSegment + 1];

                        targetSprite.x = start.x + (end.x - start.x) * segmentT;
                        targetSprite.y = start.y + (end.y - start.y) * segmentT;
                    } else {
                        // Animation complete, set to final position
                        const finalPos = path[path.length - 1];
                        targetSprite.x = finalPos.x;
                        targetSprite.y = finalPos.y;
                    }
                } else if (state.anim.type === 'rotate') {
                    // Rotation animation
                    const fromAngle = state.anim.from || 0;
                    const toAngle = state.anim.to || 360;

                    targetSprite.rotation = fromAngle + (toAngle - fromAngle) * easedProgress;
                } else if (state.anim.type === 'scale') {
                    // Scale animation
                    const fromScale = state.anim.from !== undefined ? state.anim.from : 1.0;
                    const toScale = state.anim.to !== undefined ? state.anim.to : 1.0;

                    targetSprite.scale = fromScale + (toScale - fromScale) * easedProgress;
                } else if (state.anim.type === 'opacity') {
                    // Opacity animation
                    const fromOpacity = state.anim.from !== undefined ? state.anim.from : 1.0;
                    const toOpacity = state.anim.to !== undefined ? state.anim.to : 1.0;

                    targetSprite.opacity = fromOpacity + (toOpacity - fromOpacity) * easedProgress;
                }
            });

            this.render();

            // Continue animation if not all complete
            if (!allComplete) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                // Reset to original values after all animations complete
                const hasYoyo = animStates.some(s => s.anim.yoyo);
                if (hasYoyo) {
                    // Check if any move/path animation had yoyo
                    const moveYoyo = animStates.some(s =>
                        (s.anim.type === 'move' || s.anim.type === 'path') && s.anim.yoyo
                    );
                    if (moveYoyo) {
                        targetSprite.x = originalPos.x;
                        targetSprite.y = originalPos.y;
                    }

                    // Check if rotation had yoyo
                    // const rotateYoyo = animStates.some(s =>
                    //     s.anim.type === 'rotate' && s.anim.yoyo
                    // );
                    // if (rotateYoyo) {
                    //     targetSprite.rotation = originalRotation;
                    // }

                    // Check if scale had yoyo
                    const scaleYoyo = animStates.some(s =>
                        s.anim.type === 'scale' && s.anim.yoyo
                    );
                    if (scaleYoyo) {
                        targetSprite.scale = originalScale;
                    }

                    // Check if opacity had yoyo
                    const opacityYoyo = animStates.some(s =>
                        s.anim.type === 'opacity' && s.anim.yoyo
                    );
                    if (opacityYoyo) {
                        targetSprite.opacity = originalOpacity;
                    }
                } else {
                    // Reset properties that were animated without yoyo
                    // const hasRotate = animStates.some(s => s.anim.type === 'rotate');
                    // if (hasRotate) {
                    //     targetSprite.rotation = originalRotation;
                    // }

                    // Keep scale and opacity at their final values if no yoyo
                }

                this.animating = false;
                this.render();
            }
        };

        animationFrameId = requestAnimationFrame(animate);
    }

    playMultiTargetAnimation(interaction) {
        if (!interaction.targets || interaction.targets.length === 0) {
            console.error('No targets defined for multiTarget interaction');
            return;
        }

        this.animating = true;

        // Collect all target sprites and their animation states
        const targetAnimations = [];

        interaction.targets.forEach(targetConfig => {
            const targetSprite = this.currentScene.sprites.find(s => s.id === targetConfig.targetSprite);
            if (!targetSprite) {
                console.warn(`Target sprite ${targetConfig.targetSprite} not found`);
                return;
            }

            const animations = targetConfig.animations || [];

            // Store original values
            const originalValues = {
                pos: { x: targetSprite.x, y: targetSprite.y },
                rotation: targetSprite.rotation || 0,
                scale: targetSprite.scale !== undefined ? targetSprite.scale : 1.0,
                opacity: targetSprite.opacity !== undefined ? targetSprite.opacity : 1.0
            };

            // Initialize properties if not present
            if (targetSprite.rotation === undefined) targetSprite.rotation = 0;
            if (targetSprite.scale === undefined) targetSprite.scale = 1.0;
            if (targetSprite.opacity === undefined) targetSprite.opacity = 1.0;

            // Track animation states for each animation
            const animStates = animations.map(anim => ({
                anim: anim,
                startTime: Date.now() + (anim.delay || 0),
                delay: anim.delay || 0,
                duration: anim.duration || 1000,
                easingFunc: this.easingFunctions[anim.easing] || this.easingFunctions.linear,
                complete: false,
                started: false
            }));

            targetAnimations.push({
                sprite: targetSprite,
                states: animStates,
                original: originalValues
            });
        });

        let animationFrameId = null;

        const animate = () => {
            const now = Date.now();
            let allComplete = true;

            // Update all targets
            targetAnimations.forEach(targetAnim => {
                const { sprite, states, original } = targetAnim;

                states.forEach(state => {
                    if (state.complete) return;

                    // Check if animation should start (delay has passed)
                    if (!state.started && now < state.startTime) {
                        allComplete = false;
                        return;
                    }

                    if (!state.started) {
                        state.started = true;
                    }

                    const elapsed = now - state.startTime;
                    let progress = Math.min(elapsed / state.duration, 1);

                    // Apply yoyo effect
                    if (state.anim.yoyo) {
                        const totalDuration = state.duration * 2;
                        if (elapsed < totalDuration) {
                            allComplete = false;
                            if (progress >= 1) {
                                const yoyoProgress = (elapsed - state.duration) / state.duration;
                                progress = 1 - Math.min(yoyoProgress, 1);
                            }
                        } else {
                            state.complete = true;
                            return;
                        }
                    } else if (progress < 1) {
                        allComplete = false;
                    } else {
                        state.complete = true;
                        return;
                    }

                    const easedProgress = state.easingFunc(progress);

                    if (state.anim.type === 'move') {
                        sprite.x = state.anim.from.x + (state.anim.to.x - state.anim.from.x) * easedProgress;
                        sprite.y = state.anim.from.y + (state.anim.to.y - state.anim.from.y) * easedProgress;
                    } else if (state.anim.type === 'path') {
                        const path = state.anim.path;
                        const totalSegments = path.length - 1;
                        const segmentProgress = easedProgress * totalSegments;
                        const currentSegment = Math.floor(segmentProgress);
                        const segmentT = segmentProgress - currentSegment;

                        if (currentSegment < totalSegments) {
                            const start = path[currentSegment];
                            const end = path[currentSegment + 1];
                            sprite.x = start.x + (end.x - start.x) * segmentT;
                            sprite.y = start.y + (end.y - start.y) * segmentT;
                        } else {
                            const finalPos = path[path.length - 1];
                            sprite.x = finalPos.x;
                            sprite.y = finalPos.y;
                        }
                    } else if (state.anim.type === 'rotate') {
                        const fromAngle = state.anim.from || 0;
                        const toAngle = state.anim.to || 360;
                        sprite.rotation = fromAngle + (toAngle - fromAngle) * easedProgress;
                    } else if (state.anim.type === 'scale') {
                        const fromScale = state.anim.from !== undefined ? state.anim.from : 1.0;
                        const toScale = state.anim.to !== undefined ? state.anim.to : 1.0;
                        sprite.scale = fromScale + (toScale - fromScale) * easedProgress;
                    } else if (state.anim.type === 'opacity') {
                        const fromOpacity = state.anim.from !== undefined ? state.anim.from : 1.0;
                        const toOpacity = state.anim.to !== undefined ? state.anim.to : 1.0;
                        sprite.opacity = fromOpacity + (toOpacity - fromOpacity) * easedProgress;
                    }
                });
            });

            this.render();

            // Continue animation if not all complete
            if (!allComplete) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                this.animating = false;
                this.render();
            }
        };

        animationFrameId = requestAnimationFrame(animate);
    }

    playInfoBox(interaction_config) {

        const parentDiv = document.getElementById('gameContainer');
        const newDiv = document.createElement('div');
        newDiv.className = 'animated-box';
        newDiv.textContent = interaction_config.content;

        parentDiv.appendChild(newDiv);

        setTimeout(() => {
          newDiv.classList.add('show');
        }, 10);

    }

}
