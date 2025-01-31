
package com.backend.Wcontent.MailTest;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Properties;
import java.util.Random;
import java.time.LocalDateTime;

@Service
public class OTPService {

    private final JavaMailSender mailSender;
    private final Map<String, OTP> otpStorage = new ConcurrentHashMap<>();

    public OTPService() {
        this.mailSender = createJavaMailSender();
    }

    public static class OTP {

        private String email;
        private String otp;
        private LocalDateTime expiryTime;

        public OTP(String email, String otp, LocalDateTime expiryTime) {
            this.email = email;
            this.otp = otp;
            this.expiryTime = expiryTime;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getOtp() {
            return otp;
        }

        public void setOtp(String otp) {
            this.otp = otp;
        }

        public LocalDateTime getExpiryTime() {
            return expiryTime;
        }

        public void setExpiryTime(LocalDateTime expiryTime) {
            this.expiryTime = expiryTime;
        }

        public boolean isExpired() {
            return LocalDateTime.now().isAfter(expiryTime);
        }
    }

    public String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public void storeOTP(String email, String otp) {
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(10);
        OTP otpObject = new OTP(email, otp, expiryTime);
        otpStorage.put(email, otpObject);
    }

    public boolean validateOTP(String email, String otp) {
        OTP storedOTP = otpStorage.get(email);

        if (storedOTP != null && !storedOTP.isExpired() && storedOTP.getOtp().equals(otp)) {
            otpStorage.remove(email);
            return true;
        }
        return false;
    }

    public void sendOTPEmail(String recipientEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    "UTF-8");

            helper.setTo(recipientEmail);
            helper.setSubject("Your OTP Code");
            helper.setText("<h3>Your OTP code is: " + otp + "</h3><p>This code will expire in 10 minutes.</p>", true);

            mailSender.send(message);
        } catch (Exception e) {
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
