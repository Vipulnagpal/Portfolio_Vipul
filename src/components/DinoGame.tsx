import React, { useEffect, useRef, useState } from 'react';

interface DinoGameProps {
  width?: number;
  height?: number;
}

interface Obstacle {
  x: number;
  width: number;
  height: number;
  type: 'cactus' | 'bird';
}

const DinoGame: React.FC<DinoGameProps> = ({ width = 600, height = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  // Separate state for tracking frame count
  const frameCountRef = useRef(0);
  const scoreCountRef = useRef(0);
  const lastObstacleRef = useRef(0);
  
  const GROUND_HEIGHT = 10;
  const DINO_WIDTH = 40;
  const DINO_HEIGHT = 50;
  const DINO_GROUND_Y = height - GROUND_HEIGHT - DINO_HEIGHT;
  const GRAVITY = 0.8;  // Increased gravity for faster falls
  const JUMP_POWER = 16;  // Slightly higher jump to compensate for faster gravity
  const OBSTACLE_SPEED = 6; // Doubled speed for faster game pace
  const OBSTACLE_START_DELAY = 50; // Shorter delay before first obstacle
  
  // Game state in a single ref with time tracking
  const gameState = useRef({
    isPlaying: false,
    isJumping: false,
    jumpVelocity: 0,
    dinoY: DINO_GROUND_Y,
    obstacles: [] as Obstacle[],
    gameOver: false,
    frameCount: 0,
    lastTime: 0, // Track last frame time for delta calculation
    timeSinceLastObstacle: 0 // Time-based obstacle generation
  });
  
  // Draw a cactus obstacle - CORRECTLY FIXED
  const drawCactus = (ctx: CanvasRenderingContext2D, x: number, width: number, height: number, frameHeight: number) => {
    // Position the cactus so its bottom edge is at ground level
    // This is the correct y position for a cactus of the given height
    const cactusY = frameHeight - GROUND_HEIGHT - height;
    
    // Draw the filled cactus
    ctx.fillStyle = '#00FF00'; // Bright green 
    ctx.fillRect(x, cactusY, width, height);
    
    // Add details to the cactus
    ctx.fillStyle = '#00CC00'; // Darker green for details
    ctx.fillRect(x + width/4, cactusY + 5, width/2, height - 10); 
    
    // Add outline
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, cactusY, width, height);
    
    // Add position label
    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';
    ctx.fillText(`x: ${Math.round(x)}`, x, cactusY - 5);
  };
  
  // Draw the current state of the game
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Background
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, width, height);
    
    // Ground
    ctx.fillStyle = '#333';
    ctx.fillRect(0, height - GROUND_HEIGHT, width, GROUND_HEIGHT);
    
    if (!gameState.current.isPlaying) {
      if (gameState.current.gameOver) {
        // Game over screen
        ctx.fillStyle = '#000';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', width / 2, height / 2 - 20);
        ctx.font = '18px Arial';
        ctx.fillText(`Score: ${scoreCountRef.current}`, width / 2, height / 2 + 10);
        ctx.fillText('Press SPACE to play again', width / 2, height / 2 + 40);
      } else {
        // Welcome screen
        ctx.fillStyle = '#000';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Click button below to start', width / 2, height / 2);
        ctx.fillText('Press SPACE or click canvas to jump', width / 2, height / 2 + 30);
      }
      
      // Draw a simple dino on the ground
      ctx.fillStyle = 'green';
      ctx.fillRect(50, DINO_GROUND_Y, DINO_WIDTH, DINO_HEIGHT);
    } else {
      // Game playing - draw score
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${scoreCountRef.current}`, 10, 30);
      
      // Safe zone indicator - draw a red line where obstacles will appear
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width, 0);
      ctx.lineTo(width, height);
      ctx.stroke();
      
      // Draw the dino at its current position
      ctx.fillStyle = 'green';
      ctx.fillRect(50, gameState.current.dinoY, DINO_WIDTH, DINO_HEIGHT);
      
      // Draw eyes to make the dino more visible
      ctx.fillStyle = 'white';
      ctx.fillRect(75, gameState.current.dinoY + 10, 8, 8);
      
      // Draw a shadow below to see the height more clearly
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(50, DINO_GROUND_Y + DINO_HEIGHT - 5, DINO_WIDTH, 5);
      
      // Draw all obstacles
      gameState.current.obstacles.forEach((obstacle) => {
        if (obstacle.type === 'cactus') {
          drawCactus(ctx, obstacle.x, obstacle.width, obstacle.height, height);
        }
      });
    }
  };
  
  // Check for collision between dino and obstacles
  const checkCollision = () => {
    const dinoLeft = 50;
    const dinoRight = dinoLeft + DINO_WIDTH;
    const dinoTop = gameState.current.dinoY;
    const dinoBottom = dinoTop + DINO_HEIGHT;
    
    // Add grace area for better gameplay
    const collisionMargin = 8;
    
    for (const obstacle of gameState.current.obstacles) {
      const obstacleLeft = obstacle.x + collisionMargin;
      const obstacleRight = obstacle.x + obstacle.width - collisionMargin;
      // Fix collision detection to match the new drawing method
      const obstacleTop = height - GROUND_HEIGHT - obstacle.height + collisionMargin; 
      const obstacleBottom = height - GROUND_HEIGHT - collisionMargin;
      
      // Check for collision (boxes overlapping)
      if (
        dinoRight > obstacleLeft && 
        dinoLeft < obstacleRight && 
        dinoBottom > obstacleTop && 
        dinoTop < obstacleBottom
      ) {
        return true;
      }
    }
    
    return false;
  };
  
  // Make the dino jump
  const jump = () => {
    if (gameState.current.isPlaying && !gameState.current.isJumping) {
      gameState.current.isJumping = true;
      gameState.current.jumpVelocity = -JUMP_POWER;
    }
  };
  
  // Generate a new obstacle
  const generateObstacle = () => {
    // Small cactus size
    const height = 30; // Small height
    const width = 20; // Small width
    
    // Create obstacle at the right edge of the canvas
    gameState.current.obstacles.push({
      x: 600, // Position at the right edge of the canvas (canvas width)
      width,
      height,
      type: 'cactus'
    });
    
    lastObstacleRef.current = 0;
    console.log("Generated obstacle at right edge, x=600");
  };
  
  // Update game state with time-based movement
  const updateGameState = (timestamp: number) => {
    if (!gameState.current.isPlaying) return;
    
    // Calculate time delta (in seconds) for consistent movement regardless of frame rate
    const deltaTime = gameState.current.lastTime ? (timestamp - gameState.current.lastTime) / 1000 : 0.016;
    gameState.current.lastTime = timestamp;
    
    // Cap delta time to prevent huge jumps if the game lags
    const cappedDelta = Math.min(deltaTime, 0.1);
    
    // Update frame count
    gameState.current.frameCount++;
    
    // Handle jumping with time-based physics
    if (gameState.current.isJumping) {
      // Apply gravity to velocity (scaled by time)
      gameState.current.jumpVelocity += GRAVITY * cappedDelta * 60;
      
      // Update position (scaled by time)
      gameState.current.dinoY += gameState.current.jumpVelocity * cappedDelta * 60;
      
      // Check if dino has landed
      if (gameState.current.dinoY >= DINO_GROUND_Y) {
        gameState.current.dinoY = DINO_GROUND_Y;
        gameState.current.isJumping = false;
        gameState.current.jumpVelocity = 0;
      }
    }
    
    // Calculate speed based on time delta for consistent movement
    const moveAmount = OBSTACLE_SPEED * cappedDelta * 60;
    
    // Move obstacles and remove off-screen ones
    gameState.current.obstacles = gameState.current.obstacles
      .map(obstacle => ({
        ...obstacle,
        x: obstacle.x - moveAmount
      }))
      .filter(obstacle => obstacle.x + obstacle.width > -50);
    
    // Time-based obstacle generation
    gameState.current.timeSinceLastObstacle += cappedDelta;
    
    // Generate obstacles at a consistent rate based on time
    const timeBetweenObstacles = 2.0; // seconds between obstacles
    if (gameState.current.timeSinceLastObstacle > timeBetweenObstacles && gameState.current.frameCount > OBSTACLE_START_DELAY) {
      generateObstacle();
      gameState.current.timeSinceLastObstacle = 0;
    }
    
    // Check for collisions
    if (checkCollision()) {
      gameState.current.isPlaying = false;
      gameState.current.gameOver = true;
      setGameOver(true);
      setIsPlaying(false);
      
      // Stop animation
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      
      return;
    }
    
    // Time-based score updating (increase every 0.1 seconds)
    frameCountRef.current += cappedDelta * 10;
    if (frameCountRef.current >= 1) {
      scoreCountRef.current += Math.floor(frameCountRef.current);
      frameCountRef.current = frameCountRef.current % 1; // Keep the remainder
    }
  };
  
  // The animation frame loop with timestamp
  const animate = (timestamp: number) => {
    updateGameState(timestamp);
    draw();
    
    if (gameState.current.isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };
  
  // Start the game
  const startGame = () => {
    // Reset game state with time tracking
    gameState.current = {
      isPlaying: true,
      isJumping: false,
      jumpVelocity: 0,
      dinoY: DINO_GROUND_Y,
      obstacles: [],
      gameOver: false,
      frameCount: 0,
      lastTime: 0,
      timeSinceLastObstacle: 0
    };
    
    setIsPlaying(true);
    setGameOver(false);
    scoreCountRef.current = 0;
    frameCountRef.current = 0;
    lastObstacleRef.current = 0;
    
    // Start animation loop
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    requestRef.current = requestAnimationFrame(animate);
    
    // Position first obstacle exactly at the right edge
    gameState.current.obstacles.push({
      x: width, // Right edge of the canvas
      width: 20, 
      height: 30,
      type: 'cactus'
    });
    
    console.log("Initial obstacle created at the right edge");
  };
  
  // Stop the game
  const stopGame = () => {
    gameState.current.isPlaying = false;
    setIsPlaying(false);
    
    // Stop animation
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    
    // Final draw to show stop state
    draw();
  };
  
  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState.current.gameOver || !gameState.current.isPlaying) {
          startGame();
        } else {
          jump();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Canvas click handler
  const handleCanvasClick = () => {
    if (gameState.current.gameOver) {
      startGame();
    } else if (gameState.current.isPlaying) {
      jump();
    } else {
      startGame();
    }
  };
  
  // Draw initial screen when component loads
  useEffect(() => {
    // Set initial position
    gameState.current.dinoY = DINO_GROUND_Y;
    
    // Initial draw
    draw();
    
    // Cleanup on unmount
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  return (
    <div className="dino-game-container">
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height} 
        className="dino-canvas" 
        style={{ border: '2px solid #333' }}
        onClick={handleCanvasClick}
      />
      
      <div style={{ marginTop: '1rem' }}>
        {!isPlaying ? (
          <button 
            className="dino-action-button"
            onClick={startGame}
            style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {gameOver ? 'Play Again' : 'Start Game'}
          </button>
        ) : (
          <button 
            className="dino-action-button"
            onClick={stopGame}
            style={{ padding: '10px 20px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Stop Game
          </button>
        )}
      </div>
      
    </div>
  );
};

export default DinoGame;
