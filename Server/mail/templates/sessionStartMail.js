exports.sessionStartMail = (email, name,meetingId) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Your Personalised Session Has Been Started By Your Instructor.</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
                    src="https://res.cloudinary.com/dx9x4hgym/image/upload/v1730703534/sitelogo_p2xuw9.png" alt="EduVerse logo"></a>
            <div class="message">Session Has Been Started</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>Your instructor is waiting for you in the meeting. <span class="highlight">${meetingId}</span>.
                </p>
                <p>Join it fast.</p>
            </div>
            <div class="support">Instructor is ready to solve your Doubts. 
                <a href="mailto:info@eduverse.com">info@eduverse.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};