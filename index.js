const express = require("express");
const app = express();
const PORT = process.env.PORT || 80;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Home route with beautiful HTML response
app.get("/", (req, res) => {
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Express.js Server</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .container {
                background: white;
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 600px;
                width: 100%;
            }
            
            .logo {
                font-size: 4rem;
                margin-bottom: 20px;
            }
            
            h1 {
                color: #333;
                margin-bottom: 20px;
                font-size: 2.5rem;
            }
            
            .greeting {
                font-size: 1.4rem;
                color: #666;
                margin-bottom: 30px;
                line-height: 1.6;
            }
            
            .endpoints {
                background: #f8f9fa;
                border-radius: 10px;
                padding: 25px;
                margin: 30px 0;
                text-align: left;
            }
            
            .endpoints h3 {
                color: #333;
                margin-bottom: 15px;
                text-align: center;
            }
            
            .endpoint-item {
                margin: 15px 0;
                padding: 10px;
                background: white;
                border-radius: 8px;
                border-left: 4px solid #667eea;
            }
            
            .method {
                display: inline-block;
                padding: 4px 12px;
                background: #667eea;
                color: white;
                border-radius: 4px;
                font-weight: bold;
                margin-right: 10px;
            }
            
            .path {
                font-family: 'Courier New', monospace;
                color: #333;
            }
            
            .footer {
                margin-top: 30px;
                color: #888;
                font-size: 0.9rem;
            }
            
            .highlight {
                color: #667eea;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">🚀</div>
            <h1>Welcome to Mr-Om warkri Express.js Server</h1>
            <div class="greeting">
                Hello from Express.js! This server is built by <span class="highlight">Om</span> with ❤️
            </div>
            
            <div class="endpoints">
                <h3>📡 Available Endpoints</h3>
                <div class="endpoint-item">
                    <span class="method">GET</span>
                    <span class="path">/</span>
                    <div>Home page (you're here!)</div>
                </div>
                <div class="endpoint-item">
                    <span class="method">GET</span>
                    <span class="path">/api/data</span>
                    <div>Get sample API data</div>
                </div>
                <div class="endpoint-item">
                    <span class="method">POST</span>
                    <span class="path">/api/user</span>
                    <div>Create a new user</div>
                </div>
            </div>
            
            <div class="footer">
                Server running on port ${PORT} | ${new Date().toLocaleString()}
            </div>
        </div>
    </body>
    </html>
  `;
  
  res.send(htmlResponse);
});

// Enhanced API data route with HTML formatting
app.get("/api/data", (req, res) => {
  if (req.accepts('html')) {
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Data</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .container {
                background: white;
                border-radius: 15px;
                padding: 30px;
                box-shadow: 0 15px 30px rgba(0,0,0,0.2);
                max-width: 500px;
                width: 100%;
            }
            
            h1 {
                color: #333;
                text-align: center;
                margin-bottom: 30px;
            }
            
            .data-card {
                background: #f8f9fa;
                border-radius: 10px;
                padding: 20px;
                margin: 15px 0;
            }
            
            .items-container {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                margin-top: 10px;
            }
            
            .item {
                background: #667eea;
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                font-weight: bold;
            }
            
            .back-link {
                display: inline-block;
                margin-top: 20px;
                color: #667eea;
                text-decoration: none;
                font-weight: bold;
            }
            
            .back-link:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📊 API Data</h1>
            
            <div class="data-card">
                <strong>Message:</strong>
                <p>This is sample API data formatted beautifully!</p>
            </div>
            
            <div class="data-card">
                <strong>Items Array:</strong>
                <div class="items-container">
                    ${[1, 2, 3, 4].map(item => `<div class="item">${item}</div>`).join('')}
                </div>
            </div>
            
            <div class="data-card">
                <strong>Metadata:</strong>
                <p>Generated at: ${new Date().toLocaleString()}</p>
            </div>
            
            <a href="/" class="back-link">← Back to Home</a>
        </div>
    </body>
    </html>
    `;
    res.send(htmlResponse);
  } else {
    res.json({
      success: true,
      message: "This is sample API data",
      items: [1, 2, 3, 4],
      timestamp: new Date().toISOString()
    });
  }
});

// Enhanced POST route response
app.post("/api/user", (req, res) => {
  const { name, email } = req.body;
  
  if (req.accepts('html')) {
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Created</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .container {
                background: white;
                border-radius: 15px;
                padding: 30px;
                box-shadow: 0 15px 30px rgba(0,0,0,0.2);
                max-width: 500px;
                width: 100%;
                text-align: center;
            }
            
            .success-icon {
                font-size: 4rem;
                margin-bottom: 20px;
            }
            
            h1 {
                color: #27ae60;
                margin-bottom: 20px;
            }
            
            .user-info {
                background: #f8f9fa;
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
                text-align: left;
            }
            
            .back-link {
                display: inline-block;
                margin-top: 20px;
                color: #4facfe;
                text-decoration: none;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="success-icon">✅</div>
            <h1>User Created Successfully!</h1>
            
            <div class="user-info">
                <p><strong>Name:</strong> ${name || 'Not provided'}</p>
                <p><strong>Email:</strong> ${email || 'Not provided'}</p>
                <p><strong>Created at:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>Thank you for using our service! 🎉</p>
            
            <a href="/" class="back-link">← Back to Home</a>
        </div>
    </body>
    </html>
    `;
    res.send(htmlResponse);
  } else {
    res.json({
      success: true,
      message: `User ${name} with email ${email} added successfully!`,
      timestamp: new Date().toISOString()
    });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running at http://0.0.0.0:${PORT}`);
});