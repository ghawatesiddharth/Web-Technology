import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class BookServlet extends HttpServlet {

    // Database connection parameters
    private static final String DB_URL  = "jdbc:postgresql://localhost:5432/ebookshopdb";
    private static final String DB_USER = "postgres";
    private static final String DB_PASS = "1234";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Set response content type
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        // Start HTML page
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>E-Bookshop - All Books</title>");
        out.println("<style>");
        out.println("  body { font-family: Arial, sans-serif; backround: #f4f4f4; padding: 30px; }");
        out.println("  h1 { color: #333; text-align: center; }");
        out.println("  table { width: 80%; margin: 20px auto; border-collapse: collapse; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }");
        out.println("  th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #ddd; }");
        out.println("  th { background-color: #2196F3; color: white; }");
        out.println("  tr:hover { background-color: #f1f1f1; }");
        out.println("  .back-link { display: block; text-align: center; margin-top: 20px; font-size: 16px; }");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<h1>E-Bookshop - Book List</h1>");

        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            // Step 1: Load PostgreSQL JDBC Driver
            Class.forName("org.postgresql.Driver");

            // Step 2: Establish connection
            conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);

            // Step 3: Create statement and execute query
            stmt = conn.createStatement();
            String sql = "SELECT * FROM ebookshop";
            rs = stmt.executeQuery(sql);

            // Step 4: Build HTML table with results
            out.println("<table>");
            out.println("<tr>");
            out.println("  <th>Book ID</th>");
            out.println("  <th>Title</th>");
            out.println("  <th>Author</th>");
            out.println("  <th>Price (Rs.)</th>");
            out.println("  <th>Quantity</th>");
            out.println("</tr>");

            while (rs.next()) {
                out.println("<tr>");
                out.println("  <td>" + rs.getInt("book_id") + "</td>");
                out.println("  <td>" + rs.getString("book_title") + "</td>");
                out.println("  <td>" + rs.getString("book_author") + "</td>");
                out.println("  <td>" + rs.getDouble("book_price") + "</td>");
                out.println("  <td>" + rs.getInt("quantity") + "</td>");
                out.println("</tr>");
            }

            out.println("</table>");

        } catch (ClassNotFoundException e) {
            out.println("<p style='color:red;'>Error: PostgreSQL JDBC Driver not found!</p>");
            out.println("<pre>" + e.getMessage() + "</pre>");
        } catch (SQLException e) {
            out.println("<p style='color:red;'>Error: Database connection failed!</p>");
            out.println("<pre>" + e.getMessage() + "</pre>");
        } finally {
            // Step 5: Close resources
            try { if (rs != null)   rs.close();   } catch (SQLException e) { /* ignore */ }
            try { if (stmt != null) stmt.close(); } catch (SQLException e) { /* ignore */ }
            try { if (conn != null) conn.close(); } catch (SQLException e) { /* ignore */ }
        }

        out.println("<a class='back-link' href='index.html'>&larr; Back to Home</a>");
        out.println("</body>");
        out.println("</html>");
    }
}
