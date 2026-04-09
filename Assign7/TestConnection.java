import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestConnection {

    // Database connection parameters
    static final String DB_URL  = "jdbc:postgresql://localhost:5432/ebookshopdb";
    static final String USER    = "postgres";
    static final String PASS    = "postgres";

    public static void main(String[] args) {

        // Step 1: Load the PostgreSQL JDBC driver
        try {
            Class.forName("org.postgresql.Driver");
            System.out.println("PostgreSQL JDBC Driver loaded successfully.");
        } catch (ClassNotFoundException e) {
            System.out.println("PostgreSQL JDBC Driver not found!");
            e.printStackTrace();
            return;
        }

        // Step 2: Establish the connection
        System.out.println("Connecting to database...");
        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS)) {

            if (conn != null && !conn.isClosed()) {
                System.out.println("Connected to ebookshopdb successfully!");
                System.out.println("Database : " + conn.getCatalog());
                System.out.println("Schema   : " + conn.getSchema());
            } else {
                System.out.println("Failed to establish connection.");
            }

        } catch (SQLException e) {
            System.out.println("Connection failed!");
            e.printStackTrace();
        }
    }
}
