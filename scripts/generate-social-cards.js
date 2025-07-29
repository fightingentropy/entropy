const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configure canvas
const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;
const POST_WIDTH = 1080;
const POST_HEIGHT = 1080;

// Key quotes from The Jackpot Age post
const quotes = [
  {
    text: "The Jackpot Paradox: You can't always eat the expected value when it's squirreled away in rare jackpots.",
    author: "The Jackpot Age"
  },
  {
    text: "We're becoming a culture that worships the jackpot and increasingly prices survival at zero.",
    author: "The Jackpot Age"
  },
  {
    text: "Risk too much hunting jackpots and the volatility will turn positive expected value into a straight line to zero.",
    author: "The Jackpot Age"
  }
];

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

function createStoryCard(quote, index) {
  const canvas = createCanvas(STORY_WIDTH, STORY_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Dark gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, STORY_HEIGHT);
  gradient.addColorStop(0, '#0a0a0a');
  gradient.addColorStop(1, '#171717');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);

  // Add subtle pattern
  ctx.fillStyle = 'rgba(0, 112, 243, 0.05)';
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * STORY_WIDTH, Math.random() * STORY_HEIGHT, Math.random() * 100, 0, Math.PI * 2);
    ctx.fill();
  }

  // Quote text
  ctx.fillStyle = '#ededed';
  ctx.font = 'bold 64px Arial, sans-serif';
  ctx.textAlign = 'center';
  
  const maxWidth = STORY_WIDTH - 120;
  const lines = wrapText(ctx, quote.text, maxWidth);
  const lineHeight = 80;
  const startY = (STORY_HEIGHT - (lines.length * lineHeight)) / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line, STORY_WIDTH / 2, startY + (i * lineHeight));
  });

  // Author/source
  ctx.fillStyle = '#a0a0a0';
  ctx.font = '32px Arial, sans-serif';
  ctx.fillText(`— ${quote.author}`, STORY_WIDTH / 2, startY + (lines.length * lineHeight) + 100);

  // Blog name at bottom
  ctx.fillStyle = '#666';
  ctx.font = '28px Arial, sans-serif';
  ctx.fillText('entropy-blog.vercel.app', STORY_WIDTH / 2, STORY_HEIGHT - 100);

  // Save the canvas
  const buffer = canvas.toBuffer('image/png');
  const filename = `jackpot-age-story-${index + 1}.png`;
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'social-cards', filename), buffer);
  console.log(`Created Instagram story card: ${filename}`);
}

function createPostCard() {
  const canvas = createCanvas(POST_WIDTH, POST_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Dark gradient background
  const gradient = ctx.createLinearGradient(0, 0, POST_WIDTH, POST_HEIGHT);
  gradient.addColorStop(0, '#0a0a0a');
  gradient.addColorStop(1, '#171717');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, POST_WIDTH, POST_HEIGHT);

  // Title
  ctx.fillStyle = '#ededed';
  ctx.font = 'bold 72px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('The Jackpot Age', POST_WIDTH / 2, 200);

  // Subtitle
  ctx.fillStyle = '#a0a0a0';
  ctx.font = '36px Arial, sans-serif';
  const subtitle = 'Exploring how our obsession with jackpot-like wins shapes risk-taking and society';
  const subtitleLines = wrapText(ctx, subtitle, POST_WIDTH - 120);
  subtitleLines.forEach((line, i) => {
    ctx.fillText(line, POST_WIDTH / 2, 280 + (i * 50));
  });

  // Key visual element - coin flip representation
  ctx.fillStyle = '#0070f3';
  ctx.beginPath();
  ctx.arc(POST_WIDTH / 2, 550, 100, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ededed';
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.fillText('?', POST_WIDTH / 2, 565);

  // Blog name
  ctx.fillStyle = '#666';
  ctx.font = '28px Arial, sans-serif';
  ctx.fillText('entropy-blog.vercel.app', POST_WIDTH / 2, 900);

  // Call to action
  ctx.fillStyle = '#a0a0a0';
  ctx.font = '24px Arial, sans-serif';
  ctx.fillText('Link in bio', POST_WIDTH / 2, 950);

  // Save the canvas
  const buffer = canvas.toBuffer('image/png');
  const filename = 'jackpot-age-post.png';
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'social-cards', filename), buffer);
  console.log(`Created Instagram post card: ${filename}`);
}

// Create output directory
const outputDir = path.join(__dirname, '..', 'public', 'social-cards');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate all cards
console.log('Generating Instagram cards for "The Jackpot Age"...');
quotes.forEach((quote, index) => createStoryCard(quote, index));
createPostCard();
console.log('Done! Cards saved to public/social-cards/'); 