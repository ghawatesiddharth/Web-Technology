import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class BookServlet extends HttpServlet {

    private static final String DB_URL  = "jdbc:postgresql://localhost:5432/ebookshopdb";
    private static final String DB_USER = "postgres";
    private static final String DB_PASS = "1234";

    // ==================== GET ====================
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String action = request.getParameter("action");

        if ("add".equals(action)) {
            showAddForm(out);
        } else if ("edit".equals(action)) {
            showEditForm(out, request.getParameter("id"));
        } else if ("delete".equals(action)) {
            deleteBook(request.getParameter("id"));
            response.sendRedirect("books");
            return;
        } else {
            listBooks(out, request.getParameter("msg"));
        }
    }

    // ==================== POST ====================
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");

        if ("insert".equals(action)) {
            String err = insertBook(request);
            if (err != null) {
                response.sendRedirect("books?msg=" + java.net.URLEncoder.encode("Error: " + err, "UTF-8"));
            } else {
                response.sendRedirect("books?msg=" + java.net.URLEncoder.encode("Book added successfully!", "UTF-8"));
            }
        } else if ("update".equals(action)) {
            updateBook(request);
            response.sendRedirect("books?msg=" + java.net.URLEncoder.encode("Book updated successfully!", "UTF-8"));
        } else {
            response.sendRedirect("books");
        }
    }

    // ==================== DB Connection ====================
    private Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
    }

    // ==================== Common Styles ====================
    private String getStyles() {
        return "<style>"
            + "* { margin: 0; padding: 0; box-sizing: border-box; }"
            + "body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #1a1a2e; color: #eee; min-height: 100vh; padding: 40px 20px; }"
            + "h1 { text-align: center; color: #e94560; font-size: 28px; margin-bottom: 8px; }"
            + "h2 { text-align: center; color: #0f3460; font-size: 22px; margin-bottom: 20px; }"
            + ".subtitle { text-align: center; color: #aaa; margin-bottom: 30px; font-size: 14px; }"
            + ".container { max-width: 1000px; margin: 0 auto; }"

            // Top bar
            + ".topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }"

            // Message banner
            + ".msg { text-align: center; padding: 10px 20px; margin-bottom: 20px; border-radius: 6px; background: #16213e; border-left: 4px solid #e94560; color: #eee; font-size: 14px; }"

            // Table
            + "table { width: 100%; border-collapse: collapse; background: #16213e; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }"
            + "th { padding: 14px 16px; text-align: left; background: #0f3460; color: #e94560; font-weight: 600; text-transform: uppercase; font-size: 13px; letter-spacing: 0.5px; }"
            + "td { padding: 12px 16px; border-bottom: 1px solid #1a1a2e; font-size: 14px; }"
            + "tr:hover td { background: #1a1a3e; }"

            // Buttons
            + ".btn { display: inline-block; padding: 8px 18px; text-decoration: none; color: #fff; border-radius: 6px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; transition: opacity 0.2s, transform 0.2s; }"
            + ".btn:hover { opacity: 0.88; transform: translateY(-1px); }"
            + ".btn-add { background: #e94560; padding: 10px 24px; font-size: 14px; }"
            + ".btn-edit { background: #0f3460; }"
            + ".btn-delete { background: #533483; }"
            + ".btn-submit { background: #e94560; width: 100%; padding: 12px; font-size: 16px; margin-top: 20px; }"
            + ".btn-back { background: transparent; border: 1px solid #e94560; color: #e94560; padding: 10px 24px; font-size: 14px; }"
            + ".actions { white-space: nowrap; }"
            + ".actions .btn { margin-right: 6px; }"

            // Form
            + ".form-card { max-width: 500px; margin: 0 auto; background: #16213e; padding: 30px 35px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }"
            + ".form-card label { display: block; margin-top: 16px; color: #e94560; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }"
            + ".form-card input { width: 100%; padding: 10px 12px; margin-top: 6px; border: 1px solid #0f3460; border-radius: 6px; background: #1a1a2e; color: #eee; font-size: 14px; outline: none; transition: border-color 0.2s; }"
            + ".form-card input:focus { border-color: #e94560; }"

            // Links
            + ".back-link { display: block; text-align: center; margin-top: 24px; color: #e94560; text-decoration: none; font-size: 14px; }"
            + ".back-link:hover { text-decoration: underline; }"
            + "</style>";
    }

    // ==================== LIST BOOKS ====================
    private void listBooks(PrintWriter out, String msg) {
        out.println("<!DOCTYPE html><html><head><title>E-Bookshop</title>");
        out.println(getStyles());
        out.println("</head><body>");
        out.println("<div class='container'>");
        out.println("<h1>E-Bookshop</h1>");
        out.println("<p class='subtitle'>Manage your book collection</p>");

        if (msg != null && !msg.isEmpty()) {
            out.println("<div class='msg'>" + msg + "</div>");
        }

        out.println("<div class='topbar'>");
        out.println("  <span></span>");
        out.println("  <a class='btn btn-add' href='books?action=add'>+ Add New Book</a>");
        out.println("</div>");

        Connection conn = null; Statement stmt = null; ResultSet rs = null;
        try {
            conn = getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery("SELECT * FROM ebookshop ORDER BY book_id");

            out.println("<table>");
            out.println("<tr><th>ID</th><th>Title</th><th>Author</th><th>Price (Rs.)</th><th>Qty</th><th>Actions</th></tr>");

            while (rs.next()) {
                int id = rs.getInt("book_id");
                out.println("<tr>");
                out.println("<td>" + id + "</td>");
                out.println("<td>" + rs.getString("book_title") + "</td>");
                out.println("<td>" + rs.getString("book_author") + "</td>");
                out.println("<td>" + rs.getDouble("book_price") + "</td>");
                out.println("<td>" + rs.getInt("quantity") + "</td>");
                out.println("<td class='actions'>");
                out.println("  <a class='btn btn-edit' href='books?action=edit&id=" + id + "'>Edit</a>");
                out.println("  <a class='btn btn-delete' href='books?action=delete&id=" + id + "' onclick=\"return confirm('Delete this book?');\">Delete</a>");
                out.println("</td></tr>");
            }
            out.println("</table>");
        } catch (Exception e) {
            out.println("<div class='msg'>Error: " + e.getMessage() + "</div>");
        } finally {
            try { if (rs != null) rs.close(); } catch (SQLException e) {}
            try { if (stmt != null) stmt.close(); } catch (SQLException e) {}
            try { if (conn != null) conn.close(); } catch (SQLException e) {}
        }

        out.println("<a class='back-link' href='index.html'>&larr; Back to Home</a>");
        out.println("</div></body></html>");
    }

    // ==================== ADD FORM (separate page) ====================
    private void showAddForm(PrintWriter out) {
        out.println("<!DOCTYPE html><html><head><title>Add Book</title>");
        out.println(getStyles());
        out.println("</head><body>");
        out.println("<div class='container'>");
        out.println("<h1>Add New Book</h1>");
        out.println("<p class='subtitle'>Fill in the details below</p>");

        out.println("<div class='form-card'>");
        out.println("<form method='POST' action='books'>");
        out.println("<input type='hidden' name='action' value='insert'>");
        out.println("<label>Book ID</label>");
        out.println("<input type='number' name='book_id' required placeholder='e.g. 6'>");
        out.println("<label>Title</label>");
        out.println("<input type='text' name='book_title' required placeholder='e.g. The Alchemist'>");
        out.println("<label>Author</label>");
        out.println("<input type='text' name='book_author' required placeholder='e.g. Paulo Coelho'>");
        out.println("<label>Price (Rs.)</label>");
        out.println("<input type='number' step='0.01' name='book_price' required placeholder='e.g. 299.00'>");
        out.println("<label>Quantity</label>");
        out.println("<input type='number' name='quantity' required placeholder='e.g. 10'>");
        out.println("<button type='submit' class='btn btn-submit'>Add Book</button>");
        out.println("</form>");
        out.println("</div>");

        out.println("<a class='back-link' href='books'>&larr; Back to Book List</a>");
        out.println("</div></body></html>");
    }

    // ==================== EDIT FORM (separate page) ====================
    private void showEditForm(PrintWriter out, String bookId) {
        out.println("<!DOCTYPE html><html><head><title>Edit Book</title>");
        out.println(getStyles());
        out.println("</head><body>");
        out.println("<div class='container'>");
        out.println("<h1>Edit Book</h1>");
        out.println("<p class='subtitle'>Update the book details</p>");

        Connection conn = null; PreparedStatement pstmt = null; ResultSet rs = null;
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement("SELECT * FROM ebookshop WHERE book_id = ?");
            pstmt.setInt(1, Integer.parseInt(bookId));
            rs = pstmt.executeQuery();

            if (rs.next()) {
                out.println("<div class='form-card'>");
                out.println("<form method='POST' action='books'>");
                out.println("<input type='hidden' name='action' value='update'>");
                out.println("<input type='hidden' name='book_id' value='" + rs.getInt("book_id") + "'>");
                out.println("<label>Book ID</label>");
                out.println("<input type='number' value='" + rs.getInt("book_id") + "' disabled>");
                out.println("<label>Title</label>");
                out.println("<input type='text' name='book_title' value='" + rs.getString("book_title") + "' required>");
                out.println("<label>Author</label>");
                out.println("<input type='text' name='book_author' value='" + rs.getString("book_author") + "' required>");
                out.println("<label>Price (Rs.)</label>");
                out.println("<input type='number' step='0.01' name='book_price' value='" + rs.getDouble("book_price") + "' required>");
                out.println("<label>Quantity</label>");
                out.println("<input type='number' name='quantity' value='" + rs.getInt("quantity") + "' required>");
                out.println("<button type='submit' class='btn btn-submit'>Update Book</button>");
                out.println("</form>");
                out.println("</div>");
            } else {
                out.println("<div class='msg'>Book not found!</div>");
            }
        } catch (Exception e) {
            out.println("<div class='msg'>Error: " + e.getMessage() + "</div>");
        } finally {
            try { if (rs != null) rs.close(); } catch (SQLException e) {}
            try { if (pstmt != null) pstmt.close(); } catch (SQLException e) {}
            try { if (conn != null) conn.close(); } catch (SQLException e) {}
        }

        out.println("<a class='back-link' href='books'>&larr; Back to Book List</a>");
        out.println("</div></body></html>");
    }

    // ==================== INSERT ====================
    private String insertBook(HttpServletRequest request) {
        Connection conn = null; PreparedStatement pstmt = null;
        try {
            conn = getConnection();
            conn.setAutoCommit(true);
            pstmt = conn.prepareStatement("INSERT INTO ebookshop (book_id, book_title, book_author, book_price, quantity) VALUES (?, ?, ?, ?, ?)");
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

    // ==================== UPDATE ====================
    private void updateBook(HttpServletRequest request) {
        Connection conn = null; PreparedStatement pstmt = null;
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement("UPDATE ebookshop SET book_title=?, book_author=?, book_price=?, quantity=? WHERE book_id=?");
            pstmt.setString(1, request.getParameter("book_title"));
            pstmt.setString(2, request.getParameter("book_author"));
            pstmt.setDouble(3, Double.parseDouble(request.getParameter("book_price")));
            pstmt.setInt(4, Integer.parseInt(request.getParameter("quantity")));
            pstmt.setInt(5, Integer.parseInt(request.getParameter("book_id")));
            pstmt.executeUpdate();
        } catch (Exception e) { e.printStackTrace(); }
        finally {
            try { if (pstmt != null) pstmt.close(); } catch (SQLException e) {}
            try { if (conn != null) conn.close(); } catch (SQLException e) {}
        }
    }

    // ==================== DELETE ====================
    private void deleteBook(String bookId) {
        Connection conn = null; PreparedStatement pstmt = null;
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement("DELETE FROM ebookshop WHERE book_id = ?");
            pstmt.setInt(1, Integer.parseInt(bookId));
            pstmt.executeUpdate();
        } catch (Exception e) { e.printStackTrace(); }
        finally {
            try { if (pstmt != null) pstmt.close(); } catch (SQLException e) {}
            try { if (conn != null) conn.close(); } catch (SQLException e) {}
        }
    }
}
