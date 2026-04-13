package com.studentapp.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * DBConnection.java
 * Reusable utility class for PostgreSQL database connections.
 * 
 * Usage:
 *   Connection conn = DBConnection.getConnection();
 *   // ... use connection ...
 *   DBConnection.close(conn);
 */
public class DBConnection {

    // ========== DATABASE CONFIGURATION ==========
    // Update these values to match your PostgreSQL setup
    private static final String DB_URL      = "jdbc:postgresql://localhost:5432/studentdb";
    private static final String DB_USER     = "postgres";
    private static final String DB_PASSWORD = "postgres";   // <-- Change this to your password
    private static final String DB_DRIVER   = "org.postgresql.Driver";

    /**
     * Returns a new Connection to the PostgreSQL database.
     * Loads the JDBC driver and establishes the connection.
     *
     * @return Connection object
     * @throws SQLException if a database access error occurs
     * @throws ClassNotFoundException if the JDBC driver class is not found
     */
    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        // Load the PostgreSQL JDBC driver
        Class.forName(DB_DRIVER);

        // Establish and return the connection
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    }

    /**
     * Safely closes a database connection.
     *
     * @param conn the Connection to close (can be null)
     */
    public static void close(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                System.err.println("Error closing connection: " + e.getMessage());
            }
        }
    }
}
