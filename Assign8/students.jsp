<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Records | Student Information System</title>
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
            --bg-table-row: rgba(30, 30, 60, 0.3);
            --bg-table-hover: rgba(108, 99, 255, 0.1);
            --accent-primary: #6c63ff;
            --accent-secondary: #ff6584;
            --accent-glow: rgba(108, 99, 255, 0.4);
            --text-primary: #e8e8f0;
            --text-secondary: #a0a0c0;
            --border-color: rgba(108, 99, 255, 0.2);
            --success: #10b981;
            --danger: #ef4444;
            --font-family: 'Inter', sans-serif;
        }

        /* ===== Body ===== */
        body {
            font-family: var(--font-family);
            background: var(--bg-primary);
            color: var(--text-primary);
            min-height: 100vh;
            position: relative;
        }

        /* ===== Animated Background ===== */
        .bg-orb {
            position: fixed;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.25;
            animation: float 8s ease-in-out infinite;
            pointer-events: none;
            z-index: 0;
        }

        .bg-orb:nth-child(1) {
            width: 350px; height: 350px;
            background: var(--accent-primary);
            top: -80px; right: -80px;
            animation-delay: 0s;
        }

        .bg-orb:nth-child(2) {
            width: 300px; height: 300px;
            background: var(--accent-secondary);
            bottom: -80px; left: -80px;
            animation-delay: 3s;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-25px) scale(1.05); }
        }

        /* ===== Navigation ===== */
        .navbar {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 2.5rem;
            background: rgba(15, 15, 26, 0.8);
            border-bottom: 1px solid var(--border-color);
            backdrop-filter: blur(20px);
        }

        .navbar .logo {
            font-size: 1.2rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .navbar .back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .navbar .back-link:hover {
            color: var(--accent-primary);
        }

        /* ===== Page Container ===== */
        .page-container {
            position: relative;
            z-index: 1;
            max-width: 1000px;
            margin: 0 auto;
            padding: 2.5rem 2rem;
        }

        /* ===== Page Header ===== */
        .page-header {
            margin-bottom: 2rem;
        }

        .page-header h1 {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #e8e8f0, #6c63ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .page-header p {
            color: var(--text-secondary);
            font-size: 0.95rem;
        }

        /* ===== Stats Bar ===== */
        .stats-bar {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .stat-chip {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 0.6rem 1.2rem;
            font-size: 0.85rem;
            backdrop-filter: blur(20px);
        }

        .stat-chip .dot {
            width: 8px; height: 8px;
            border-radius: 50%;
            background: var(--success);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
        }

        /* ===== Table Card ===== */
        .table-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            overflow: hidden;
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
        }

        .table-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.2rem 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }

        .table-card-header h2 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--text-primary);
        }

        .table-card-header .record-count {
            font-size: 0.8rem;
            color: var(--text-secondary);
            background: rgba(108, 99, 255, 0.1);
            padding: 0.3rem 0.8rem;
            border-radius: 50px;
            border: 1px solid var(--border-color);
        }

        /* ===== Table ===== */
        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead th {
            text-align: left;
            padding: 1rem 1.5rem;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: var(--text-secondary);
            background: rgba(15, 15, 26, 0.5);
            border-bottom: 1px solid var(--border-color);
        }

        tbody tr {
            transition: background 0.3s ease;
            border-bottom: 1px solid rgba(108, 99, 255, 0.08);
        }

        tbody tr:last-child {
            border-bottom: none;
        }

        tbody tr:hover {
            background: var(--bg-table-hover);
        }

        tbody td {
            padding: 1rem 1.5rem;
            font-size: 0.92rem;
            color: var(--text-primary);
        }

        /* ID Column Badge */
        .id-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px; height: 32px;
            background: linear-gradient(135deg, var(--accent-primary), #8b5cf6);
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 700;
            color: #fff;
        }

        /* City Tag */
        .city-tag {
            display: inline-block;
            padding: 0.25rem 0.7rem;
            background: rgba(16, 185, 129, 0.12);
            color: var(--success);
            border: 1px solid rgba(16, 185, 129, 0.25);
            border-radius: 6px;
            font-size: 0.82rem;
            font-weight: 500;
        }

        /* ===== Empty State ===== */
        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
        }

        .empty-state .icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            opacity: 0.5;
        }

        .empty-state h3 {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }

        .empty-state p {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        /* ===== Error State ===== */
        .error-state {
            text-align: center;
            padding: 3rem 2rem;
            background: rgba(239, 68, 68, 0.08);
            border: 1px solid rgba(239, 68, 68, 0.2);
            border-radius: 16px;
            margin-top: 1rem;
        }

        .error-state .icon {
            font-size: 2.5rem;
            margin-bottom: 0.8rem;
        }

        .error-state h3 {
            color: var(--danger);
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
        }

        .error-state p {
            color: var(--text-secondary);
            font-size: 0.85rem;
            max-width: 500px;
            margin: 0 auto;
            line-height: 1.6;
        }

        .error-state code {
            display: block;
            margin-top: 1rem;
            padding: 0.8rem 1rem;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 8px;
            font-size: 0.8rem;
            color: var(--accent-secondary);
            text-align: left;
            overflow-x: auto;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        /* ===== Animations ===== */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-in {
            animation: fadeInUp 0.5s ease forwards;
        }

        .animate-delay-1 { animation-delay: 0.1s; opacity: 0; }
        .animate-delay-2 { animation-delay: 0.2s; opacity: 0; }
        .animate-delay-3 { animation-delay: 0.3s; opacity: 0; }

        /* ===== Responsive ===== */
        @media (max-width: 768px) {
            .navbar { padding: 1rem 1.2rem; }
            .page-container { padding: 1.5rem 1rem; }
            .page-header h1 { font-size: 1.5rem; }
            thead th, tbody td { padding: 0.8rem 1rem; font-size: 0.82rem; }
            .table-card { border-radius: 14px; }
            .stats-bar { flex-direction: column; }
        }
    </style>
</head>
<body>

    <!-- Animated Background Orbs -->
    <div class="bg-orb"></div>
    <div class="bg-orb"></div>

    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="logo">&#128218; StudentDB</div>
        <a href="index.jsp" class="back-link">&#8592; Back to Home</a>
    </nav>

    <!-- Page Container -->
    <div class="page-container">

        <!-- Page Header -->
        <div class="page-header animate-in animate-delay-1">
            <h1>Student Records</h1>
            <p>Live data fetched from PostgreSQL database via JDBC connection</p>
        </div>

        <%
            // ===== DATABASE CONNECTION & QUERY =====
            Connection conn = null;
            Statement stmt = null;
            ResultSet rs = null;

            // Database configuration
            String dbURL      = "jdbc:postgresql://localhost:5432/studentdb";
            String dbUser     = "postgres";
            String dbPassword = "1234";  // <-- Change to your PostgreSQL password

            int recordCount = 0;
            boolean hasError = false;
            String errorMessage = "";

            try {
                // Step 1: Load PostgreSQL JDBC Driver
                Class.forName("org.postgresql.Driver");

                // Step 2: Establish database connection
                conn = DriverManager.getConnection(dbURL, dbUser, dbPassword);

                // Step 3: Create statement and execute query
                stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
                rs = stmt.executeQuery("SELECT * FROM students_info ORDER BY stud_id");

                // Count total records
                rs.last();
                recordCount = rs.getRow();
                rs.beforeFirst();
        %>

        <!-- Stats Bar -->
        <div class="stats-bar animate-in animate-delay-2">
            <div class="stat-chip">
                <div class="dot"></div>
                <span>Connected to <strong>studentdb</strong></span>
            </div>
            <div class="stat-chip">
                &#128203; <strong><%= recordCount %></strong>&nbsp;records found
            </div>
            <div class="stat-chip">
                &#9889; Table: <strong>students_info</strong>
            </div>
        </div>

        <!-- Table Card -->
        <div class="table-card animate-in animate-delay-3">
            <div class="table-card-header">
                <h2>&#128196; All Students</h2>
                <span class="record-count"><%= recordCount %> entries</span>
            </div>

            <% if (recordCount > 0) { %>
            <table id="students-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Class</th>
                        <th>Division</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    <% while (rs.next()) { %>
                    <tr>
                        <td>
                            <span class="id-badge"><%= rs.getInt("stud_id") %></span>
                        </td>
                        <td><%= rs.getString("stud_name") %></td>
                        <td><%= rs.getString("class") %></td>
                        <td><%= rs.getString("division") %></td>
                        <td>
                            <span class="city-tag"><%= rs.getString("city") %></span>
                        </td>
                    </tr>
                    <% } %>
                </tbody>
            </table>
            <% } else { %>
            <!-- No Records Found -->
            <div class="empty-state">
                <div class="icon">&#128194;</div>
                <h3>No Records Found</h3>
                <p>The students_info table is empty. Insert some records and refresh.</p>
            </div>
            <% } %>
        </div>

        <%
            } catch (ClassNotFoundException e) {
                hasError = true;
                errorMessage = "JDBC Driver not found: " + e.getMessage()
                    + "\n\nMake sure postgresql-xx.x.x.jar is in WEB-INF/lib/";
            } catch (SQLException e) {
                hasError = true;
                errorMessage = "Database error: " + e.getMessage()
                    + "\n\nCheck that PostgreSQL is running and 'studentdb' exists.";
            } finally {
                // Step 4: Close database resources
                try { if (rs   != null) rs.close();   } catch (SQLException e) { /* ignore */ }
                try { if (stmt != null) stmt.close(); } catch (SQLException e) { /* ignore */ }
                try { if (conn != null) conn.close(); } catch (SQLException e) { /* ignore */ }
            }

            // Display error if connection failed
            if (hasError) {
        %>
        <div class="error-state animate-in animate-delay-2">
            <div class="icon">&#9888;&#65039;</div>
            <h3>Database Connection Failed</h3>
            <p>Could not connect to the PostgreSQL database. See details below:</p>
            <code><%= errorMessage %></code>
        </div>
        <% } %>

    </div> <!-- end page-container -->

</body>
</html>
