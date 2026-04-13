<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Information System</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* ===== CSS Reset & Variables ===== */
        *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --bg-primary: #0f0f1a;
            --bg-secondary: #1a1a2e;
            --bg-card: rgba(30, 30, 60, 0.6);
            --accent-primary: #6c63ff;
            --accent-secondary: #ff6584;
            --accent-glow: rgba(108, 99, 255, 0.4);
            --text-primary: #e8e8f0;
            --text-secondary: #a0a0c0;
            --border-color: rgba(108, 99, 255, 0.2);
            --font-family: 'Inter', sans-serif;
        }

        /* ===== Body ===== */
        body {
            font-family: var(--font-family);
            background: var(--bg-primary);
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }

        /* ===== Animated Background ===== */
        .bg-orb {
            position: fixed;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.3;
            animation: float 8s ease-in-out infinite;
            pointer-events: none;
            z-index: 0;
        }

        .bg-orb:nth-child(1) {
            width: 400px; height: 400px;
            background: var(--accent-primary);
            top: -100px; left: -100px;
            animation-delay: 0s;
        }

        .bg-orb:nth-child(2) {
            width: 350px; height: 350px;
            background: var(--accent-secondary);
            bottom: -100px; right: -100px;
            animation-delay: 2s;
        }

        .bg-orb:nth-child(3) {
            width: 250px; height: 250px;
            background: #00d2ff;
            top: 50%; left: 60%;
            animation-delay: 4s;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-30px) scale(1.05); }
        }

        /* ===== Main Container ===== */
        .container {
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 3rem;
        }

        /* ===== Badge ===== */
        .badge {
            display: inline-block;
            background: rgba(108, 99, 255, 0.15);
            border: 1px solid var(--border-color);
            color: var(--accent-primary);
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding: 0.4rem 1.2rem;
            border-radius: 50px;
            margin-bottom: 1.5rem;
            backdrop-filter: blur(10px);
        }

        /* ===== Heading ===== */
        h1 {
            font-size: 3.2rem;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #e8e8f0, #6c63ff, #ff6584);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .subtitle {
            font-size: 1.1rem;
            color: var(--text-secondary);
            max-width: 500px;
            margin: 0 auto 2.5rem;
            line-height: 1.7;
        }

        /* ===== Info Cards ===== */
        .info-cards {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            margin-bottom: 2.5rem;
            flex-wrap: wrap;
        }

        .info-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 1.5rem;
            width: 160px;
            backdrop-filter: blur(20px);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .info-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px var(--accent-glow);
        }

        .info-card .icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .info-card .label {
            font-size: 0.75rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.3rem;
        }

        .info-card .value {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--text-primary);
        }

        /* ===== CTA Button ===== */
        .cta-button {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            padding: 1rem 2.5rem;
            font-size: 1.05rem;
            font-weight: 600;
            font-family: var(--font-family);
            color: #fff;
            background: linear-gradient(135deg, var(--accent-primary), #8b5cf6);
            border: none;
            border-radius: 14px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px var(--accent-glow);
            position: relative;
            overflow: hidden;
        }

        .cta-button::before {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
            transition: left 0.5s ease;
        }

        .cta-button:hover::before {
            left: 100%;
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(108, 99, 255, 0.5);
        }

        .cta-button:active {
            transform: translateY(-1px);
        }

        .cta-button .arrow {
            transition: transform 0.3s ease;
        }

        .cta-button:hover .arrow {
            transform: translateX(4px);
        }

        /* ===== Footer ===== */
        .footer {
            position: fixed;
            bottom: 1.5rem;
            color: var(--text-secondary);
            font-size: 0.8rem;
            z-index: 1;
        }

        .footer span {
            color: var(--accent-primary);
            font-weight: 600;
        }

        /* ===== Responsive ===== */
        @media (max-width: 600px) {
            h1 { font-size: 2.2rem; }
            .info-cards { flex-direction: column; align-items: center; }
            .container { padding: 2rem 1rem; }
        }
    </style>
</head>
<body>

    <!-- Animated Background Orbs -->
    <div class="bg-orb"></div>
    <div class="bg-orb"></div>
    <div class="bg-orb"></div>

    <!-- Main Content -->
    <div class="container">
        <div class="badge">&#128218; WTL Assignment 8</div>

        <h1>Student Information<br>System</h1>

        <p class="subtitle">
            A JSP-based web application connected to PostgreSQL,
            displaying student records dynamically using JDBC.
        </p>

        <!-- Info Cards -->
        <div class="info-cards">
            <div class="info-card">
                <div class="icon">&#9889;</div>
                <div class="label">Backend</div>
                <div class="value">JSP</div>
            </div>
            <div class="info-card">
                <div class="icon">&#128451;</div>
                <div class="label">Database</div>
                <div class="value">PostgreSQL</div>
            </div>
            <div class="info-card">
                <div class="icon">&#128268;</div>
                <div class="label">Driver</div>
                <div class="value">JDBC</div>
            </div>
            <div class="info-card">
                <div class="icon">&#127760;</div>
                <div class="label">Server</div>
                <div class="value">Tomcat</div>
            </div>
        </div>

        <!-- Call to Action -->
        <a href="students.jsp" class="cta-button" id="view-students-btn">
            View Student Records
            <span class="arrow">&#10132;</span>
        </a>
    </div>

    <!-- Footer -->
    <div class="footer">
        Built with <span>JSP + PostgreSQL</span> &bull; Deployed on Apache Tomcat
    </div>

</body>
</html>
