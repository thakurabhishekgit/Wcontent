package com.backend.Wcontent.MailTest;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Properties;
import org.springframework.stereotype.Service;

import com.backend.*;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService() {
        this.mailSender = createJavaMailSender();
    }

    public void sendWelcomeEmail(String recipientEmail) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    "UTF-8");

            helper.setTo(recipientEmail);
            helper.setSubject("Welcome to the Website!");
            helper.setText("<h3>Welcome to the Wcontent! You have successfully registered.</h3>", true); // true = HTML
                                                                                                         // // content

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();

        }
    }

    public void sendLoginEmail(String recipientEmail) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    "UTF-8");

            helper.setTo(recipientEmail);
            helper.setSubject("Welcome to the Website!");
            helper.setText(
                    "<html>" +
                            "<head>" +
                            "<style>" +
                            "body {" +
                            "  font-family: Arial, sans-serif;" +
                            "  background-color: #f4f4f9;" +
                            "  margin: 0;" +
                            "  padding: 0;" +
                            "}" +
                            ".container {" +
                            "  width: 100%;" +
                            "  max-width: 600px;" +
                            "  margin: 0 auto;" +
                            "  background-color: #ffffff;" +
                            "  padding: 20px;" +
                            "  border-radius: 8px;" +
                            "  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);" +
                            "}" +
                            ".header {" +
                            "  text-align: center;" +
                            "  padding-bottom: 20px;" +
                            "}" +
                            ".header h1 {" +
                            "  color: #333333;" +
                            "}" +
                            ".content {" +
                            "  font-size: 16px;" +
                            "  color: #555555;" +
                            "  line-height: 1.6;" +
                            "}" +
                            ".cta {" +
                            "  display: block;" +
                            "  text-align: center;" +
                            "  background-color: #007bff;" +
                            "  color: #ffffff;" +
                            "  padding: 12px 20px;" +
                            "  text-decoration: none;" +
                            "  border-radius: 4px;" +
                            "  margin-top: 20px;" +
                            "}" +
                            ".footer {" +
                            "  font-size: 12px;" +
                            "  text-align: center;" +
                            "  margin-top: 20px;" +
                            "  color: #888888;" +
                            "}" +
                            "</style>" +
                            "</head>" +
                            "<body>" +
                            "<div class='container'>" +
                            "<div class='header'>" +
                            "<h1>Welcome to Wcontent!</h1>" +
                            "</div>" +
                            "<div class='content'>" +
                            "<p>Dear User,</p>" +
                            "<p>We are excited to welcome you to <strong>Wcontent</strong>, your new hub for creating and sharing content!</p>"
                            +
                            "<p>Congratulations, you have successfully logged into your account. Here's a quick overview of what you can do:</p>"
                            +
                            "<ul>" +
                            "<li>Explore and discover amazing content created by others.</li>" +
                            "<li>Start creating your own content and share it with the world.</li>" +
                            "<li>Engage with other content creators and participate in discussions.</li>" +
                            "</ul>" +
                            "<p>As a valued member of our community, you will have access to exclusive content, features, and updates. Be sure to keep an eye out for our upcoming events!</p>"
                            +
                            "<p>If you have any questions or need assistance, feel free to <a href='mailto:support@wcontent.com'>contact us</a> anytime.</p>"
                            +
                            "<p>To get started, click the link below:</p>" +
                            "<a class='cta' href='https://www.wcontent.com/get-started'>Get Started</a>" +
                            "</div>" +
                            "<div class='footer'>" +
                            "<p>&copy; 2025 Wcontent. All rights reserved.</p>" +
                            "<p>If you did not sign up for Wcontent, please ignore this email.</p>" +
                            "</div>" +
                            "</div>" +
                            "</body>" +
                            "</html>",
                    true);

            // true = HTML// content

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendAppliactionEmail(String recipientEmail, Applicant application, String description, String title,
            String requirements, String location, String type, String salaryRange) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    "UTF-8");

            helper.setTo(recipientEmail);
            helper.setSubject("Welcome to Wcontent!");

            String emailContent = "<html>" +
                    "<head>" +
                    "<style>" +
                    "body {" +
                    "  font-family: Arial, sans-serif;" +
                    "  background-color: #f4f4f9;" +
                    "  margin: 0;" +
                    "  padding: 0;" +
                    "}" +
                    ".container {" +
                    "  width: 100%;" +
                    "  max-width: 600px;" +
                    "  margin: 0 auto;" +
                    "  background-color: #ffffff;" +
                    "  padding: 20px;" +
                    "  border-radius: 8px;" +
                    "  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);" +
                    "}" +
                    ".header {" +
                    "  text-align: center;" +
                    "  padding-bottom: 20px;" +
                    "}" +
                    ".header h1 {" +
                    "  color: #333333;" +
                    "}" +
                    ".content {" +
                    "  font-size: 16px;" +
                    "  color: #555555;" +
                    "  line-height: 1.6;" +
                    "}" +
                    ".content h3 {" +
                    "  color: #333333;" +
                    "  margin-bottom: 10px;" +
                    "}" +
                    ".footer {" +
                    "  font-size: 12px;" +
                    "  text-align: center;" +
                    "  margin-top: 20px;" +
                    "  color: #888888;" +
                    "}" +
                    ".section {" +
                    "  margin-bottom: 20px;" +
                    "}" +
                    ".section h4 {" +
                    "  margin-bottom: 8px;" +
                    "  color: #007bff;" +
                    "}" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "<div class='header'>" +
                    "<h1>Welcome to Wcontent!</h1>" +
                    "</div>" +
                    "<div class='content'>" +
                    "<p>Dear User,</p>" +
                    "<p>you have a new application for the opportunity at <strong>Wcontent</strong>!</p>"
                    +

                    "<div class='section'>" +
                    "<h3>Application Information:</h3>" +
                    "<p><strong>Application Name:</strong> " + application.getName() + "</p>" +
                    "<p><strong>Application Name:</strong> " + application.getEmail() + "</p>" +
                    "<p><strong>Application Name:</strong> " + application.getApplicationDate() + "</p>" +
                    "<p><strong>Application Name:</strong> " + application.getResumeUrl() + "</p>" +
                    "</div>" +

                    "<div class='section'>" +
                    "<h3>Opportunity Details:</h3>" +
                    "<p><strong>Title:</strong> " + title + "</p>" +
                    "<p><strong>Description:</strong> " + description + "</p>" +
                    "<p><strong>Requirements:</strong> " + requirements + "</p>" +
                    "<p><strong>Location:</strong> " + location + "</p>" +
                    "<p><strong>Type:</strong> " + type + "</p>" +
                    "<p><strong>Salary Range:</strong> " + salaryRange + "</p>" +
                    "</div>" +

                    "<div class='footer'>" +
                    "<p>&copy; 2025 Wcontent. All rights reserved.</p>" +
                    "<p>If you have any questions or concerns, feel free to contact us at <a href='mailto:support@wcontent.com'>support@wcontent.com</a></p>"
                    +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(emailContent, true);
            // true indicates the content is HTML

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendAppliactionEmailtoApplicant(String recipientEmail, Applicant application, String description,
            String title,
            String requirements, String location, String type, String salaryRange) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    "UTF-8");

            helper.setTo(application.getEmail());
            helper.setSubject("Welcome to Wcontent!");

            String emailContent = "<html>" +
                    "<head>" +
                    "<style>" +
                    "body {" +
                    "  font-family: Arial, sans-serif;" +
                    "  background-color: #f4f4f9;" +
                    "  margin: 0;" +
                    "  padding: 0;" +
                    "}" +
                    ".container {" +
                    "  width: 100%;" +
                    "  max-width: 600px;" +
                    "  margin: 0 auto;" +
                    "  background-color: #ffffff;" +
                    "  padding: 20px;" +
                    "  border-radius: 8px;" +
                    "  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);" +
                    "}" +
                    ".header {" +
                    "  text-align: center;" +
                    "  padding-bottom: 20px;" +
                    "}" +
                    ".header h1 {" +
                    "  color: #333333;" +
                    "}" +
                    ".content {" +
                    "  font-size: 16px;" +
                    "  color: #555555;" +
                    "  line-height: 1.6;" +
                    "}" +
                    ".content h3 {" +
                    "  color: #333333;" +
                    "  margin-bottom: 10px;" +
                    "}" +
                    ".footer {" +
                    "  font-size: 12px;" +
                    "  text-align: center;" +
                    "  margin-top: 20px;" +
                    "  color: #888888;" +
                    "}" +
                    ".section {" +
                    "  margin-bottom: 20px;" +
                    "}" +
                    ".section h4 {" +
                    "  margin-bottom: 8px;" +
                    "  color: #007bff;" +
                    "}" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "<div class='header'>" +
                    "<h1>Welcome to Wcontent!</h1>" +
                    "</div>" +
                    "<div class='content'>" +
                    "<p>Dear User,</p>" +
                    "<p>Thank you for applying for the opportunity at <strong>Wcontent</strong>. We are pleased to confirm your application for the following opportunity:</p>"
                    +

                    "<div class='section'>" +
                    "<h3>Opportunity Details:</h3>" +
                    "<p><strong>Title:</strong> " + title + "</p>" +
                    "<p><strong>Description:</strong> " + description + "</p>" +
                    "<p><strong>Requirements:</strong> " + requirements + "</p>" +
                    "<p><strong>Location:</strong> " + location + "</p>" +
                    "<p><strong>Type:</strong> " + type + "</p>" +
                    "<p><strong>Salary Range:</strong> " + salaryRange + "</p>" +
                    "</div>" +

                    "<div class='section'>" +
                    "<h3>Your Application Details:</h3>" +
                    "<p><strong>Name:</strong> " + application.getName() + "</p>" +
                    "<p><strong>Email:</strong> " + application.getEmail() + "</p>" +
                    "<p><strong>Phone:</strong> " + application.getApplicationDate() + "</p>" +
                    "<p><strong>Resume:</strong> <a href='" + application.getResumeUrl() + "'>View Resume</a></p>" +
                    "</div>" +

                    "<div class='footer'>" +
                    "<p>&copy; 2025 Wcontent. All rights reserved.</p>" +
                    "<p>If you have any questions or concerns, feel free to contact us at <a href='mailto:support@wcontent.com'>support@wcontent.com</a></p>"
                    +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(emailContent, true);
            // true indicates the content is HTML

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendCollabRequestEmail(String recipientEmail, CollabRequest collabRequest, String description,
            String title,
            String contentCategory, String collabrationType, String timeline) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    "UTF-8");

            helper.setTo(recipientEmail);
            helper.setSubject("You Have a New Collaboration Request on Wcontent!");

            String emailContent = "<html>" +
                    "<head>" +
                    "<style>" +
                    "body {" +
                    "  font-family: Arial, sans-serif;" +
                    "  background-color: #f4f4f9;" +
                    "  margin: 0;" +
                    "  padding: 0;" +
                    "}" +
                    ".container {" +
                    "  width: 100%;" +
                    "  max-width: 600px;" +
                    "  margin: 0 auto;" +
                    "  background-color: #ffffff;" +
                    "  padding: 20px;" +
                    "  border-radius: 8px;" +
                    "  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);" +
                    "}" +
                    ".header {" +
                    "  text-align: center;" +
                    "  padding-bottom: 20px;" +
                    "}" +
                    ".header h1 {" +
                    "  color: #333333;" +
                    "}" +
                    ".content {" +
                    "  font-size: 16px;" +
                    "  color: #555555;" +
                    "  line-height: 1.6;" +
                    "}" +
                    ".content h3 {" +
                    "  color: #333333;" +
                    "  margin-bottom: 10px;" +
                    "}" +
                    ".content p {" +
                    "  margin-bottom: 20px;" +
                    "}" +
                    ".footer {" +
                    "  font-size: 12px;" +
                    "  text-align: center;" +
                    "  margin-top: 20px;" +
                    "  color: #888888;" +
                    "}" +
                    ".section {" +
                    "  margin-bottom: 20px;" +
                    "}" +
                    ".section h4 {" +
                    "  margin-bottom: 8px;" +
                    "  color: #007bff;" +
                    "}" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "<div class='header'>" +
                    "<h1>New Collaboration Request on Wcontent!</h1>" +
                    "</div>" +
                    "<div class='content'>" +
                    "<p>Dear [Recipient],</p>" +
                    "<p>We are pleased to inform you that someone has sent a collaboration request to your posted opportunity. Please review the details below:</p>"
                    +

                    "<div class='section'>" +
                    "<h3>Collaboration Request Details:</h3>" +
                    "<p><strong>Title:</strong> " + title + "</p>" +
                    "<p><strong>Description:</strong> " + description + "</p>" +
                    "<p><strong>Content Category:</strong> " + contentCategory + "</p>" +
                    "<p><strong>Collaboration Type:</strong> " + collabrationType + "</p>" +
                    "<p><strong>Timeline:</strong> " + timeline + "</p>" +
                    "</div>" +

                    "<div class='section'>" +
                    "<h3>Your Application Details:</h3>" +
                    "<p>" + collabRequest.toString() + "</p>" +
                    "</div>" +

                    "<div class='footer'>" +
                    "<p>&copy; 2025 Wcontent. All rights reserved.</p>" +
                    "<p>If you have any questions or need further assistance, please feel free to contact us at <a href='mailto:support@wcontent.com'>support@wcontent.com</a></p>"
                    +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(emailContent, true);
            // true indicates the content is HTML

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private JavaMailSender createJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("");
        mailSender.setPassword("");
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
