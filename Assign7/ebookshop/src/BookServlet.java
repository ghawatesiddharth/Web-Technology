import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class BookServlet extends HttpServlet {

    // Database connection parameters
    private static final String DB_URL  = "jdbc:postgresql://localhost:5432/ebookshopdb";
    private static final String DB_USER = "postgres";
    private static final String DB_PASS = "1234";

    // ==================== GET: List all books / Show edit form ====================
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String action = request.getParameter("action");

        if ("edit".equals(action)) {
            showEditForm(out, request.getParameter("id"));
        } else if ("delete".equals(action)) {
            deleteBook(request.getParameter("id"));
            response.sendRedirect("books");
            return;
        } else {
            listBooks(out);
        }
    }

    // ==================== POST: Insert or Update a book ====================
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action");

        if ("insert".equals(action)) {
            String error = insertBook(request);
            if (error != null) {
                response.sendRedirect("books?error=" + java.net.URLEncoder.encode(error, "UTF-8"));
            } else {
                response.sendRedirect("books");
            }
        } else if ("update".equals(action)) {
            updateBook(request);
            response.sendRedirect("books");
        } else {
            response.sendRedirect("books");
        }
    }

    // ==================== Helper: Get DB connection ====================
    private Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
    }

    // ==================== Helper: Common CSS styles ====================
    private String getStyles() {
        return "<style>"
            + "body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px; }"
            + "h1, h2 { color: #333; text-align: center; }"
            + "table { width: 85%; margin: 20px auto; border-collapse: collapse; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }"
            + "th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #ddd; }"
            + "th { background-color: #2196F3; color: white; }"
            + "tr:hover { background-color: #f1f1f1; }"
            + ".btn { display: inline-block; padding: 8px 16px; margin: 3px; text-decoration: none; color: #fff; border-radius: 4px; border: none; cursor: pointer; font-size: 14px; }"
            + ".btn-edit { background-color: #FF9800; }"
            + ".btn-delete { background-color: #f44336; }"
            + ".btn-add { background-color: #4CAF50; }"
            + ".btn-primary { background-color: #2196F3; }"
            + ".btn:hover { opacity: 0.85; }"
            + "form.inline { display: inline; }"
            + ".form-container { width: 50%; margin: 20px auto; background: #fff; padding: 25px 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }"
            + ".form-container label { display: block; margin-top: 12px; font-weight: bold; color: #555; }"
            + ".form-container input { width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-size: 14px; }"
            + ".form-container .btn { margin-top: 18px; width: 100%; padding: 12px; font-size: 16px; }"
            + ".center { text-align: center; }"
            + ".back-link { display: block; text-align: center; margin-top: 20px; font-size: 16px; }"
            + "</style>";
    }

    // ==================== LIST all books ====================
    private void listBooks(PrintWriter out) {
        out.println("<!DOCTYPE html><html><head><title>E-Bookshop - All Books</title>");
        out.println(getStyles());
        out.println("</head><body>");
        out.println("<h1>E-Bookshop - Book List</h1>");

        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            conn = getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery("SELECT * FROM ebookshop ORDER BY book_id");

            out.println("<table>");
            out.println("<tr>");
            out.println("  <th>Book ID</th><th>Title</th><th>Author</th><th>Price (Rs.)</th><th>Quantity</th><th>Actions</th>");
            out.println("</tr>");

            while (rs.next()) {
                int id = rs.getInt("book_id");
                out.println("<tr>");
                out.println("  <td>" + id + "</td>");
                out.println("  <td>" + rs.getString("book_title") + "</td>");
                out.println("  <td>" + rs.getString("book_author") + "</td>");
                out.println("  <td>" + rs.getDouble("book_price") + "</td>");
                out.println("  <td>" + rs.getInt("quantity") + "</td>");
                out.println("  <td>");
                out.println("    <a class='btn btn-edit' href='books?action=edit&id=" + id + "'>Edit</a>");
                out.println("    <a class='btn btn-delete' href='books?action=delete&id=" + id + "' onclick=\"return confirm('Are you sure you want to delete this book?');\">Delete</a>");
                out.println("  </td>");
                out.println("</tr>");
            }
            out.println("</table>");

        } catch (Exception e) {
            out.println("<p style='color:red;'>Error: " + e.getMessage() + "</p>");
        } finally {
            try { if (rs != null) rs.close(); } catch (SQLException e) {}
            try { if (stmt != null) stmt.close(); } catch (SQLException e) {}
            try { if (conn != null) conn.close(); } catch (SQLException e) {}
        }

        // --- Add New Book Form ---
        out.println("<h2>Add New Book</h2>");
        out.println("<div class='form-container'>");
        out.println("<form method='POST' action='books'>");
        out.println("<input type='hidden' name='action' value='insert'>");
        out.println("<label>Book ID:</label>");
        out.println("<input type='number' name='book_id' required>");
        out.println("<label>Title:</label>");
        out.println("<input type='text' name='book_title' required>");
        out.println("<label>Author:</label>");
        out.println("<input type='text' name='book_author' required>");
        out.println("<label>Price:</label>");
        out.println("<input type='number' step='0.01' name='book_price' required>");
        out.println("<label>Quantity:</label>");
        out.println("<input type='number' name='quantity' required>");
        out.println("<button type='submit' class='btn btn-add'>Add Book</button>");
        out.println("</form>");
        out.println("</div>");

        out.println("<a class='back-link' href='index.html'>&larr; Back to Home</a>");
        out.println("</body></html>");
    }

    // ==================== SHOW edit form ====================
    private void showEditForm(PrintWriter out, String bookId) {
        out.println("<!DOCTYPE html><html><head><title>Edit Book</title>");
        out.println(getStyles());
        out.println("</head><body>");
        out.println("<h1>Edit Book</h1>");

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement("SELECT * FROM ebookshop WHERE book_id = ?");
            pstmt.setInt(1, Integer.parseInt(bookId));
            rs = pstmt.executeQuery();

            if (rs.next()) {
                out.println("<div class='form-container'>");
                out.println("<form method='POST' action='books'>");
                out.println("<input type='hidden' name='action' value='update'>");
                out.println("<input type='hidden' name='book_id' value='" + rs.getInt("book_id") + "'>");
                out.println("<label>Book ID:</label>");
                out.println("<input type='number' value='" + rs.getInt("book_id") + "' disabled>");
                out.println("<label>Title:</label>");
                out.println("<input type='text' name='book_title' value='" + rs.getString("book_title") + "' required>");
                out.println("<label>Author:</label>");
                out.println("<input type='text' name='book_author' value='" + rs.getString("book_author") + "' required>");
                out.println("<label>Price:</label>");
                out.println("<input type='number' step='0.01' name='book_price' value='" + rs.getDouble("book_price") + "' required>");
                out.println("<label>Quantity:</label>");
                out.println("<input type='number' name='quantity' value='" + rs.getInt("quantity") + "' required>");
                out.println("<button type='submit' class='btn btn-primary'>Update Book</button>");
                out.println("</form>");
                out.println("</div>");
            } else {
                out.println("<p style='color:red;'>Book not found!</p>");
            }

        } catch (Exception e) {
            out.println("<p style='color:red;'>Error: " + e.getMessage() + "</p>");
        } finally {
            try { if (rs != null) rs.close(); } catch (SQLException e) {}
            try { if (pstmt != null) pstmt.close(); } catch (SQLException e) {}
            try { if (conn != null) conn.close(); } catch (SQLException e) {}
        }

        out.println("<a class='back-link' href='books'>&larr; Back to Book List</a>");
        out.println("</body></html>");
    }

    // ==================== INSERT a book ====================
    private String insertBook(HttpServletRequest request) {
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = getConnection();
            conn.setAutoCommit(true);
            String sql = "INSERT INTO ebookshop (book_id, book_title, book_author, book_price, quantity) VALUES (?, ?, ?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, Integer.parseInt(request.getParameter("book_id")));
            pstmt.setString(2, request.getParameter("book_title"));
            pstmt.setString(3, request.getParameter("book_author"));
            pstmt.setDouble(4, Double.parseDouble(request.getParameter("book_price")));
            pstmt.setInt(5, Integer.parseInt(request.getParameter("quantity")));
            int rows = pstmt.executeUpdate();
            return (rows > 0) ? null : "No rows inserted.";
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        } finally {
            try { if (pstmt != null) pstmt.close(); } catch (SQLException e) {}
            try { if (conn != null) conn.close(); } catch (SQLException e) {}
        }
    }

    // ==================== UPDATE a book ====================
    private void updateBook(HttpServletRequest request) {
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = getConnection();
            String sql = "UPDATE ebookshop SET book_title=?, book_author=?, book_price=?, quantity=? WHERE book_id=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, request.getParameter("book_title"));
            pstmt.setString(2, request.getParameter("book_author"));
            pstmt.setDouble(3, Double.parseDouble(request.getParameter("book_price")));
            pstmt.setInt(4, Integer.parseInt(request.getParameter("quantity")));
            pstmt.setInt(5, Integer.parseInt(request.getParameter("book_id")));
            pstmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try { if (pstmt != null) pstmt.close(); } catch (SQLException e) {}
            try { if (conn != null) conn.close(); } catch (SQLException e) {}
        }
    }

    // ==================== DELETE a book ====================
    private void deleteBook(String bookId) {
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = getConnection();
            pstmt = conn.prepareStatement("DELETE FROM ebookshop WHERE book_id = ?");
            pstmt.setInt(1, Integer.parseInt(bookId));
            pstmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try { if (pstmt != null) pstmt.close(); } catch (SQLException e) {}
            try { if (conn != null) conn.close(); } catch (SQLException e) {}
        }
    }
}
